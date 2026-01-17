"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VendorForm from "@/components/VendorForm";

export default function EditVendorPage() {
  const { id } = useParams();
  const router = useRouter();
  const [vendor, setVendor] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/vendors/${id}`)
      .then((res) => res.json())
      .then(setVendor);
  }, [id]);

  async function updateVendor(data: any) {
    await fetch(`/api/vendors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/vendors");
  }

  if (!vendor) return <p className="p-6">Loading vendor...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Edit Vendor</h1>
      <VendorForm onSubmit={updateVendor} />
    </div>
  );
}

