"use client";

import Link from "next/link";

const columns = [
  {
    title: "Products",
    links: [
      { label: "District Heating", href: "#district-heating" },
      { label: "Electricity", href: "#electricity" },
      { label: "Smart Meters", href: "#" },
      { label: "Solar Solutions", href: "#" },
      { label: "EV Charging", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About EVH", href: "#" },
      { label: "Sustainability", href: "#sustainability" },
      { label: "Community", href: "#community" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Customer Portal", href: "/portal/login" },
      { label: "Contact", href: "#" },
      { label: "Emergency", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Feedback", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-evh-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-1.5 mb-4">
              <span className="text-2xl font-display font-bold text-white">EVH</span>
              <span className="w-2 h-2 rounded-full bg-evh-yellow" />
            </Link>
            <p className="text-evh-gray-400 text-sm leading-relaxed max-w-xs">
              Your Energy. Your City. Your Future. Stadtwerke Halle — powered by Halle, for Halle.
            </p>
            <div className="flex gap-3 mt-6">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-evh-gray-800 hover:bg-evh-gray-700 flex items-center justify-center text-xs text-evh-gray-400 hover:text-white transition-all duration-300"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-evh-gray-300 mb-4 uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-evh-gray-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-evh-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-evh-gray-500">
            &copy; {new Date().getFullYear()} Stadtwerke Halle GmbH. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Imprint", "Terms"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-evh-gray-500 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
