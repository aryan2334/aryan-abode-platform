import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Aryan Abode — Where the Future Lives",
  description:
    "A premium AI-powered real estate experience in Visakhapatnam's most connected growth corridor. Discover 2BHK, 2.5BHK & 3BHK residences built for the future.",
  keywords: [
    "Aryan Abode",
    "luxury apartments Visakhapatnam",
    "Bhogapuram airport real estate",
    "premium residences Vizag",
    "future ready investment",
  ],
  openGraph: {
    title: "Aryan Abode — Where the Future Lives",
    description:
      "Premium AI-powered real estate in Visakhapatnam's future growth corridor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[#050508] text-[#f0f0f4] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
