"use client";

import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vendors")
      .then((res) => res.json())
      .then((data) => {
        setVendors(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-4">Loading vendors...</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-3 text-left">Agency</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-right">Financial (Cr)</th>
            <th className="p-3 text-center">Class</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-center">MSME</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v.id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">{v.agency_name}</td>
              <td className="p-3">{v.supplier_type}</td>
              <td className="p-3">{v.category}</td>
              <td className="p-3">{v.base_location}</td>
              <td className="p-3 text-right">{v.financial_strength}</td>
              <td className="p-3 text-center font-bold">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    v.vendor_class === "A"
                      ? "bg-green-600"
                      : v.vendor_class === "B"
                      ? "bg-blue-600"
                      : v.vendor_class === "C"
                      ? "bg-yellow-500"
                      : v.vendor_class === "D"
                      ? "bg-orange-500"
                      : "bg-red-600"
                  }`}
                >
                  {v.vendor_class}
                </span>
              </td>
              <td className="p-3">
                <div className="text-sm">{v.phone}</div>
                <div className="text-xs text-gray-500">{v.email}</div>
              </td>
              <td className="p-3 text-center">
                {v.msme ? "✅" : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

