import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";
import { LocaleProvider } from "@/context/locale-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "EVH — Made in Halle",
  description: "Your Energy. Your City. Your Future. Stadtwerke Halle — powered by Halle, for Halle.",
  icons: {
    icon: "/images/evh-logo.png.webp",
  },
  openGraph: {
    title: "EVH — Made in Halle",
    description: "Your Energy. Your City. Your Future.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <LocaleProvider>
            <AuthProvider>
              <LoadingScreen />
              {children}
            </AuthProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
