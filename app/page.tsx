import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            Vendor Management System
          </h1>
          <Link
            href="/vendors"
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            Open Vendor Master
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold leading-tight text-gray-900">
            Centralized Vendor Control for
            <span className="block text-gray-700">
              Modern Procurement Teams
            </span>
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Manage suppliers and contractors with structured classification,
            MSME tracking, financial strength analysis, and clean audit-ready data —
            all in one place.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/vendors"
              className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
            >
              View Vendor Master
            </Link>

            <Link
              href="/vendors/new"
              className="border border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-white transition"
            >
              Add New Vendor
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              title: "Auto Classification",
              desc: "Vendors are automatically classified based on financial strength: Class A (> ₹200 Cr), Class B (₹100–200 Cr), Class C (₹50–100 Cr), Class D (₹10–50 Cr), Class E (< ₹10 Cr)."
            },
            {
              title: "MSME Visibility",
              desc: "Instant filtering for MSME and non-MSME vendors."
            },
            {
              title: "Audit-Ready Data",
              desc: "Clean, structured records built for compliance."
            },
            {
              title: "Enterprise Scale",
              desc: "Built on Vercel + Neon for performance and reliability."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="card hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-6 py-4 text-sm text-gray-500 flex justify-between">
          <span>© {new Date().getFullYear()} Procurement Systems</span>
          <span>Powered by Vercel & Neon</span>
        </div>
      </footer>
    </main>
  );
}
