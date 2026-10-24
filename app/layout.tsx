import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sarvin M. — Product Designer",
    template: "%s — Sarvin M.",
  },
  description:
    "Product designer with a Computer Engineering background, designing clarity into complex systems. Focused on technologies for learning.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <SiteHeader />
        <main className="overflow-x-clip pb-28 md:pb-0">{children}</main>
      </body>
    </html>
  );
}
