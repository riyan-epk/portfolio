import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--f-display",
  display: "swap",
  style: ["normal", "italic"],
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--f-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--f-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://riyanmursaleen.dev"),
  title: {
    default: "Riyan Mursaleen — Full-Stack Developer | .NET · MERN · Flutter",
    template: "%s — Riyan Mursaleen",
  },
  description:
    "Full-stack developer engineering production-grade web, mobile and business systems — .NET, MERN, Flutter, ERP, POS, and hard third-party integrations (FBR, PRA, Hikvision, Stripe).",
  keywords: [
    "Full-Stack Developer",
    ".NET Developer",
    "MERN Stack",
    "Flutter Developer",
    "ERP Development",
    "POS Systems",
    "API Integration",
    "ASP.NET Core",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Riyan Mursaleen" }],
  creator: "Riyan Mursaleen",
  openGraph: {
    title: "Riyan Mursaleen — Full-Stack Developer",
    description:
      "Engineering production-grade web, mobile and business systems — .NET, MERN, Flutter, ERP/POS and complex integrations.",
    type: "website",
    locale: "en_US",
    siteName: "Riyan Mursaleen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riyan Mursaleen — Full-Stack Developer",
    description:
      "Engineering production-grade web, mobile and business systems — .NET, MERN, Flutter, ERP/POS and complex integrations.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0B0F" },
    { media: "(prefers-color-scheme: light)", color: "#0A0B0F" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
