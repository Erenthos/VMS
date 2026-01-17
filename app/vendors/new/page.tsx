"use client";

import { useRouter } from "next/navigation";
import VendorForm from "@/components/VendorForm";

export default function NewVendorPage() {
  const router = useRouter();

  async function createVendor(data: any) {
    await fetch("/api/vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/vendors");
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Add New Vendor</h1>
      <VendorForm onSubmit={createVendor} />
    </div>
  );
}

