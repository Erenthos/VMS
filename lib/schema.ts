export type Vendor = {
  id: number;
  supplierType: string;          // Supplier / Contractor
  companyType: string;           // Pvt Ltd / LLP / Proprietorship etc.
  category: string;              // Electrical / Mechanical / Civil etc.
  baseLocation: string;
  agencyName: string;
  yearOfEstablishment: number;
  financialStrength: number;     // In Crores
  vendorClass: "A" | "B" | "C" | "D" | "E";
  contactName: string;
  phone: string;
  email: string;
  gstDetails: string;
  msme: boolean;
  createdAt?: string;
};

