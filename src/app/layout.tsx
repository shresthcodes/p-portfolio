import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Priya Singh — Embedded Systems & IoT Engineer",
  description: "Final-year B.Tech ECE student at Buddha Institute of Technology. Built 2 hardware prototypes using Arduino & ESP32. Seeking roles in embedded systems and industrial automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className={`${inter.className} bg-[#121212] text-white antialiased`}>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
