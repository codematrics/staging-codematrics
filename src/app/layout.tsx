import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from "../public/logo/CodeMatrix.webp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codematrics - web development and mobile app development company",
  description: "Codematrics is a leading web development and mobile app development company, specializing in creating high-performance websites and innovative mobile applications. We offer custom software solutions, UI/UX design, e-commerce development, and enterprise-level applications to help businesses grow digitally. Our expert developers leverage the latest technologies to build scalable, secure, and user-friendly applications. Partner with us to transform your ideas into reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <div className="min-h-screen">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
