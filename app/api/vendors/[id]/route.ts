import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { calculateVendorClass } from "@/lib/actions";

/* GET SINGLE VENDOR */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const result = await pool.query(
    "SELECT * FROM vendors WHERE id = $1",
    [params.id]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

/* UPDATE VENDOR */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const vendorClass = calculateVendorClass(
    Number(body.financialStrength)
  );

  const query = `
    UPDATE vendors SET
      supplier_type = $1,
      company_type = $2,
      category = $3,
      sub_category = $4,
      base_location = $5,
      agency_name = $6,
      year_of_establishment = $7,
      financial_strength = $8,
      vendor_class = $9,
      contact_name = $10,
      phone = $11,
      email = $12,
      gst_details = $13,
      pf = $14,
      esic = $15,
      pan = $16,
      msme = $17,
      active_status = $18
    WHERE id = $19
    RETURNING *
  `;

  const values = [
    body.supplierType,
    body.companyType,
    body.category,
    body.subCategory,
    body.baseLocation,
    body.agencyName,
    body.yearOfEstablishment,
    body.financialStrength,
    vendorClass,
    body.contactName,
    body.phone,
    body.email,
    body.gstDetails,
    body.pf,
    body.esic,
    body.pan,
    body.msme,
    body.activeStatus,
    params.id
  ];

  const result = await pool.query(query, values);
  return NextResponse.json(result.rows[0]);
}

/* DELETE VENDOR */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await pool.query(
    "DELETE FROM vendors WHERE id = $1",
    [params.id]
  );
  return NextResponse.json({ success: true });
}
