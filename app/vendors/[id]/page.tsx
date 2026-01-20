"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VendorForm from "@/components/VendorForm";

export default function EditVendorPage() {
  const { id } = useParams();
  const router = useRouter();
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/vendors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVendor(data);
        setLoading(false);
      });
  }, [id]);

  async function updateVendor(data: any) {
    await fetch(`/api/vendors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push(`/vendors/${id}/view`);
  }

  if (loading) {
    return <div className="p-6">Loading vendor details...</div>;
  }

  if (!vendor) {
    return <div className="p-6">Vendor not found</div>;
  }

  return (
    <div className="p-6 space-y-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold">Edit Vendor</h1>

      <VendorForm
        onSubmit={updateVendor}
        initialData={vendor}   {/* ✅ THIS WAS MISSING */}
      />
    </div>
  );
}
