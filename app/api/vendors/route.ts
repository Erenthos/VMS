import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { calculateVendorClass } from "@/lib/actions";

/* CREATE VENDOR */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const vendorClass = calculateVendorClass(
      Number(body.financialStrength)
    );

    const query = `
      INSERT INTO vendors (
        supplier_type, company_type, category, base_location,
        agency_name, year_of_establishment, financial_strength,
        vendor_class, contact_name, phone, email, gst_details, msme
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *
    `;

    const values = [
      body.supplierType,
      body.companyType,
      body.category,
      body.baseLocation,
      body.agencyName,
      body.yearOfEstablishment,
      body.financialStrength,
      vendorClass,
      body.contactName,
      body.phone,
      body.email,
      body.gstDetails,
      body.msme,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create vendor" },
      { status: 500 }
    );
  }
}

/* LIST VENDORS */
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM vendors ORDER BY created_at DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vendors" },
      { status: 500 }
    );
  }
}

