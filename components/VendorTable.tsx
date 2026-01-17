"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Vendor = {
  id: number;
  agency_name: string;
  supplier_type: string;
  category: string;
  base_location: string;
  financial_strength: number;
  vendor_class: string;
  phone: string;
  email: string;
  msme: boolean;
};

export default function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const router = useRouter();

  function loadVendors() {
    fetch("/api/vendors")
      .then((res) => res.json())
      .then(setVendors);
  }

  useEffect(() => {
    loadVendors();
  }, []);

  async function deleteVendor(id: number) {
    if (!confirm("Are you sure you want to delete this vendor?")) return;

    await fetch(`/api/vendors/${id}`, { method: "DELETE" });
    loadVendors();
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-3 text-left">Agency</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-right">Financial</th>
            <th className="p-3 text-center">Class</th>
            <th className="p-3 text-center">MSME</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v.id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">{v.agency_name}</td>
              <td className="p-3">{v.supplier_type}</td>
              <td className="p-3">{v.category}</td>
              <td className="p-3 text-right">{v.financial_strength}</td>
              <td className="p-3 text-center font-bold">{v.vendor_class}</td>
              <td className="p-3 text-center">{v.msme ? "✅" : "—"}</td>
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => router.push(`/vendors/${v.id}`)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteVendor(v.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
