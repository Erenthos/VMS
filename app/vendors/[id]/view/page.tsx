"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VendorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [vendor, setVendor] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/vendors/${id}`)
      .then((res) => res.json())
      .then(setVendor);
  }, [id]);

  if (!vendor) {
    return <div className="p-6">Loading vendor details...</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {vendor.agency_name}
        </h1>
        <div className="space-x-3">
          <button
            onClick={() => router.push(`/vendors/${id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => router.back()}
            className="border px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>

      {/* Details Card */}
      <div className="card grid grid-cols-2 gap-6 text-sm">
        <Detail label="Supplier / Contractor" value={vendor.supplier_type} />
        <Detail label="Type of Company" value={vendor.company_type} />
        <Detail label="Category" value={vendor.category} />
        <Detail label="Base Location" value={vendor.base_location} />
        <Detail label="Year of Establishment" value={vendor.year_of_establishment} />
        <Detail label="Financial Strength (Cr)" value={vendor.financial_strength} />
        <Detail label="Vendor Class" value={vendor.vendor_class} />
        <Detail label="MSME" value={vendor.msme ? "Yes" : "No"} />
        <Detail label="Contact Name" value={vendor.contact_name} />
        <Detail label="Phone" value={vendor.phone} />
        <Detail label="Email" value={vendor.email} />
        <Detail label="GST Details" value={vendor.gst_details} />
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <div className="text-gray-500">{label}</div>
      <div className="font-medium text-gray-900 mt-1">
        {value || "—"}
      </div>
    </div>
  );
}
