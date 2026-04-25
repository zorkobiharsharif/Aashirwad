import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { Footer } from "@/components/footer";
import { FloatingActions } from "@/components/floating-actions";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, faqSchema, localBusinessSchema } from "@/lib/seo";

import "./globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata = buildMetadata({
  title: "Aashirwad | Best Saree & Textile Store in Bihar Sharif Since 1999",
  description:
    "Visit Aashirwad, a trusted family cloth store in Bihar Sharif for sarees, bridal collection, ladies suits, shirting and suiting. Call or WhatsApp now."
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-sans">
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={faqSchema()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
