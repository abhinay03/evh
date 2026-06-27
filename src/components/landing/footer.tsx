"use client";

import Link from "next/link";
import { useLocale } from "@/context/locale-context";
import { useTheme } from "@/context/theme-context";

const columns = [
  {
    titleKey: "footer.products",
    links: [
      { labelKey: "nav.district.heating", href: "#district-heating" },
      { labelKey: "nav.electricity", href: "#electricity" },
      { labelKey: "footer.smart.meters", href: "#" },
      { labelKey: "footer.solar", href: "#" },
      { labelKey: "footer.ev.charging", href: "#" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { labelKey: "footer.about", href: "#" },
      { labelKey: "nav.sustainability", href: "#sustainability" },
      { labelKey: "nav.community", href: "#community" },
      { labelKey: "footer.careers", href: "#" },
      { labelKey: "footer.press", href: "#" },
    ],
  },
  {
    titleKey: "footer.connect",
    links: [
      { labelKey: "nav.customer.portal", href: "/portal/login" },
      { labelKey: "footer.contact", href: "#" },
      { labelKey: "footer.emergency", href: "#" },
      { labelKey: "footer.faq", href: "#" },
      { labelKey: "footer.feedback", href: "#" },
    ],
  },
];

export function Footer() {
  const { t, locale } = useLocale();
  const { theme } = useTheme();

  return (
    <footer className="bg-evh-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-1.5 mb-4">
              <span className="text-2xl font-display font-bold text-white">EVH</span>
              <span className="w-2 h-2 rounded-full bg-evh-primary" />
            </Link>
            <p className="text-evh-gray-400 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3 mt-6">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-evh-gray-800 hover:bg-evh-gray-700 flex items-center justify-center text-xs text-evh-gray-400 dark:text-slate-400 hover:text-white transition-all duration-300"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.titleKey}>
              <h4 className="text-sm font-semibold text-evh-gray-300 mb-4 uppercase tracking-wider">
                {t(col.titleKey)}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-evh-gray-500 dark:text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-evh-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-evh-gray-500 dark:text-slate-400">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6">
            {["Privacy", "Imprint", "Terms"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-evh-gray-500 dark:text-slate-400 hover:text-white transition-colors"
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
