"use client";

import { useState, useEffect } from "react";

export default function VendorForm({
  onSubmit,
  initialData
}: {
  onSubmit: (data: any) => void;
  initialData?: any;
}) {
  const [form, setForm] = useState({
    supplierType: "",
    companyType: "",
    category: "",
    subCategory: "",
    baseLocation: "",
    agencyName: "",
    yearOfEstablishment: "",
    financialStrength: "",
    contactName: "",
    phone: "",
    email: "",
    gstDetails: "",
    pf: "",
    esic: "",
    pan: "",
    msme: false,
    activeStatus: true
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        supplierType: initialData.supplier_type || "",
        companyType: initialData.company_type || "",
        category: initialData.category || "",
        subCategory: initialData.sub_category || "",
        baseLocation: initialData.base_location || "",
        agencyName: initialData.agency_name || "",
        yearOfEstablishment: initialData.year_of_establishment || "",
        financialStrength: initialData.financial_strength || "",
        contactName: initialData.contact_name || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        gstDetails: initialData.gst_details || "",
        pf: initialData.pf || "",
        esic: initialData.esic || "",
        pan: initialData.pan || "",
        msme: initialData.msme || false,
        activeStatus:
          initialData.active_status !== undefined
            ? initialData.active_status
            : true
      });
    }
  }, [initialData]);

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 bg-white p-6 rounded shadow"
    >
      {/* Company Info */}
      <input
        name="agencyName"
        placeholder="Agency Name"
        value={form.agencyName}
        onChange={handleChange}
        required
      />

      <input
        name="supplierType"
        placeholder="Supplier / Contractor"
        value={form.supplierType}
        onChange={handleChange}
      />

      <input
        name="companyType"
        placeholder="Type of Company"
        value={form.companyType}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />

      {/* Sub Category directly after Category */}
      <input
        name="subCategory"
        placeholder="Sub Category"
        value={form.subCategory}
        onChange={handleChange}
      />

      <input
        name="baseLocation"
        placeholder="Base Location"
        value={form.baseLocation}
        onChange={handleChange}
      />

      <input
        type="number"
        name="yearOfEstablishment"
        placeholder="Year of Establishment"
        value={form.yearOfEstablishment}
        onChange={handleChange}
      />

      <input
        type="number"
        name="financialStrength"
        placeholder="Financial Strength (Cr)"
        value={form.financialStrength}
        onChange={handleChange}
        required
      />

      {/* Contact Info */}
      <input
        name="contactName"
        placeholder="Contact Name"
        value={form.contactName}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone No"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="gstDetails"
        placeholder="GST Details"
        value={form.gstDetails}
        onChange={handleChange}
      />

      {/* Statutory Info */}
      <input
        name="pan"
        placeholder="PAN"
        value={form.pan}
        onChange={handleChange}
      />

      <input
        name="pf"
        placeholder="PF"
        value={form.pf}
        onChange={handleChange}
      />

      <input
        name="esic"
        placeholder="ESIC"
        value={form.esic}
        onChange={handleChange}
      />

      {/* Flags */}
      <label className="flex items-center gap-2 col-span-2">
        <input
          type="checkbox"
          name="msme"
          checked={form.msme}
          onChange={handleChange}
        />
        MSME Registered
      </label>

      <label className="flex items-center gap-2 col-span-2">
        <input
          type="checkbox"
          name="activeStatus"
          checked={form.activeStatus}
          onChange={handleChange}
        />
        Active Vendor
      </label>

      <button
        type="submit"
        className="col-span-2 bg-black text-white py-2 rounded"
      >
        Save Vendor
      </button>
    </form>
  );
}
