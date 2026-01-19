import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import pool from "@/lib/db";
import { calculateVendorClass } from "@/lib/actions";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<any>(sheet);

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      for (const row of rows) {
        const financial = Number(row["Financial Strength (Cr)"] || 0);
        const vendorClass = calculateVendorClass(financial);

        await client.query(
          `
          INSERT INTO vendors (
            supplier_type, company_type, category, base_location,
            agency_name, year_of_establishment, financial_strength,
            vendor_class, contact_name, phone, email, gst_details, msme
          )
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
        `,
          [
            row["Supplier / Contractor"],
            row["Type of Company"],
            row["Category"],
            row["Base Location"],
            row["Agency Name"],
            row["Year of Establishment"],
            financial,
            vendorClass,
            row["Name"],
            row["Phone No"],
            row["Email"],
            row["GST Details"],
            row["MSME"] === "Yes"
          ]
        );
      }

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    return NextResponse.json({
      success: true,
      imported: rows.length
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Import failed" },
      { status: 500 }
    );
  }
}
