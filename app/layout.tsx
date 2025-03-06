import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen flex flex-col`}>
        {/* Hide Header on mobile (sm:hidden) */}
        <div className="hidden md:block">
          <Header />
        </div>

        <main className="flex flex-1">
          <Sidebar />
          <div className="flex-1 mt-20">{children}</div>
        </main>
      </body>
    </html>
  );
}
