export function calculateVendorClass(financialStrength: number) {
  if (financialStrength >= 200) return "A";
  if (financialStrength >= 100) return "B";
  if (financialStrength >= 50) return "C";
  if (financialStrength >= 10) return "D";
  return "E";
}

