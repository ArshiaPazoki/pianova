import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Responsive Piano App",
  description: "A piano web app with mobile-friendly layout.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
      className="w-full h-full p-0"
        // className={`${geistSans.variable} ${geistMono.variable} bg-gray-500 text-white w-full h-full min-h-screen overflow-auto`}
      >
        {children}
      </body>
    </html>
  );
}
