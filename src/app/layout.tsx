// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header/Header"; // Add this import
// import Footer from "@/components/sections/Footer/Footer"; // You'll need to create this

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Phoenix Tour - Take Memories, Leave Footprints",
  description: "Experience unforgettable adventures with Phoenix Tour. Expert guides, breathtaking destinations, and memories that last forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable}`}>
      <body className="antialiased min-h-screen w-full">
        <Header /> {/* Add Header here */}
        <main className="flex-1">
          {children}
        </main>
        {/* <Footer /> Add Footer later */}
      </body>
    </html>
  );
}