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
      supplier_type=$1,
      company_type=$2,
      category=$3,
      base_location=$4,
      agency_name=$5,
      year_of_establishment=$6,
      financial_strength=$7,
      vendor_class=$8,
      contact_name=$9,
      phone=$10,
      email=$11,
      gst_details=$12,
      msme=$13
    WHERE id=$14
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
    params.id,
  ];

  const result = await pool.query(query, values);
  return NextResponse.json(result.rows[0]);
}

/* DELETE VENDOR */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await pool.query("DELETE FROM vendors WHERE id=$1", [params.id]);
  return NextResponse.json({ success: true });
}

