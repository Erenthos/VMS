"use client";

import { useState } from "react";

export default function VendorForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [form, setForm] = useState({
    supplierType: "",
    companyType: "",
    category: "",
    baseLocation: "",
    agencyName: "",
    yearOfEstablishment: "",
    financialStrength: "",
    contactName: "",
    phone: "",
    email: "",
    gstDetails: "",
    msme: false,
  });

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <input name="agencyName" placeholder="Agency Name" onChange={handleChange} required />
      <input name="supplierType" placeholder="Supplier / Contractor" onChange={handleChange} />

      <input name="companyType" placeholder="Type of Company" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />

      <input name="baseLocation" placeholder="Base Location" onChange={handleChange} />
      <input name="yearOfEstablishment" type="number" placeholder="Year of Establishment" onChange={handleChange} />

      <input name="financialStrength" type="number" placeholder="Financial Strength (Cr.)" onChange={handleChange} />
      <input name="contactName" placeholder="Contact Name" onChange={handleChange} />

      <input name="phone" placeholder="Phone No" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />

      <input name="gstDetails" placeholder="GST Details" onChange={handleChange} />

      <label className="flex items-center gap-2">
        <input type="checkbox" name="msme" onChange={handleChange} />
        MSME Registered
      </label>

      <button type="submit" className="col-span-2 bg-black text-white p-2 rounded">
        Save Vendor
      </button>
    </form>
  );
}

