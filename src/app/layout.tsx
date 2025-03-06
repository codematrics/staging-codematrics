import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { metaData } from "@/data/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = metaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta
          name="google-site-verification"
          content="P0jHynGstXmNhoxIBQTnL-74RdmQrL1bBav43LQRTwA"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="https://codematrics.com/assets/CodeMatrics.webp"
          as="image"
        />
        <link rel="canonical" href="https://codematrics.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CodeMatrics",
            url: "https://codematrics.com",
            logo: "https://codematrics.com/assets/CodeMatrics.webp",
            description:
              "CodeMatrics is a hub for innovative IT solutions designed to transform businesses.",
            sameAs: [
              "https://www.facebook.com/CodeMatrics",
              "https://twitter.com/CodeMatrics",
              "https://www.linkedin.com/company/codematrics",
            ],
          })}
        </script>
      </head>
      <head>
        <meta name="theme-color" content="#000" />
      </head>
      <body
        className={`tagline-righ-path ${geistSans.variable} ${geistMono.variable} antialiased bg-white scrollbar-hidden text-black dark:text-black`}
      >
        <div className="min-h-screen">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
