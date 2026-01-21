import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import pool from "@/lib/db";
import { calculateVendorClass } from "@/lib/actions";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<any>(sheet);

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      for (const row of rows) {
        const financialStrength = Number(
          row["Financial Strength (Cr)"] || 0
        );

        const vendorClass =
          calculateVendorClass(financialStrength);

        await client.query(
          `
          INSERT INTO vendors (
            supplier_type,
            company_type,
            category,
            sub_category,
            base_location,
            agency_name,
            year_of_establishment,
            financial_strength,
            vendor_class,
            contact_name,
            phone,
            email,
            gst_details,
            pan,
            pf,
            esic,
            msme,
            active_status
          )
          VALUES (
            $1,$2,$3,$4,$5,
            $6,$7,$8,$9,$10,
            $11,$12,$13,$14,$15,
            $16,$17,$18
          )
          `,
          [
            row["Supplier / Contractor"] || null,
            row["Type of Company"] || null,
            row["Category"] || null,
            row["Sub Category"] || null,
            row["Base Location"] || null,
            row["Agency Name"],
            row["Year of Establishment"] || null,
            financialStrength,
            vendorClass,
            row["Name"] || null,
            row["Phone No"] || null,
            row["Email"] || null,
            row["GST Details"] || null,
            row["PAN"] || null,
            row["PF"] || null,
            row["ESIC"] || null,
            row["MSME"] === "Yes",
            row["Active Status"]
              ? row["Active Status"] === "Yes"
              : true
          ]
        );
      }

      await client.query("COMMIT");

      return NextResponse.json({
        success: true,
        imported: rows.length
      });
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Bulk import failed" },
      { status: 500 }
    );
  }
}
