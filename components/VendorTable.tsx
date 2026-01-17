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
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [msmeFilter, setMsmeFilter] = useState("");
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

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      v.agency_name.toLowerCase().includes(search.toLowerCase()) ||
      v.category?.toLowerCase().includes(search.toLowerCase());

    const matchesClass =
      classFilter === "" || v.vendor_class === classFilter;

    const matchesMsme =
      msmeFilter === ""
        ? true
        : msmeFilter === "yes"
        ? v.msme
        : !v.msme;

    return matchesSearch && matchesClass && matchesMsme;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search by Agency / Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Classes</option>
          <option value="A">Class A</option>
          <option value="B">Class B</option>
          <option value="C">Class C</option>
          <option value="D">Class D</option>
          <option value="E">Class E</option>
        </select>

        <select
          value={msmeFilter}
          onChange={(e) => setMsmeFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All MSME</option>
          <option value="yes">MSME Only</option>
          <option value="no">Non-MSME</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setClassFilter("");
            setMsmeFilter("");
          }}
          className="text-sm text-blue-600 underline"
        >
          Clear Filters
        </button>

        <button
          onClick={() => router.push("/vendors/new")}
          className="ml-auto bg-black text-white px-4 py-2 rounded"
        >
          + Add Vendor
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 text-left">Agency</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-right">Financial (Cr)</th>
              <th className="p-3 text-center">Class</th>
              <th className="p-3 text-center">MSME</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((v) => (
              <tr key={v.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{v.agency_name}</td>
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
            {filteredVendors.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No vendors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
