const dns = require("dns");
import { NuqsAdapter } from "nuqs/adapters/next/app";

// Force Node.js to use Google and Cloudflare DNS servers for all lookups
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

import { Geist, Geist_Mono } from "next/font/google";
import { Outfit } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Paw Heaven || Home",
  description:
    "Adopt today, love forever — find your perfect furry companion at Paw Heaven.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-center" richColors />
        <Navbar />
        <div className="paw-navbar-spacer" />
        <NuqsAdapter>{children}</NuqsAdapter>
        <Footer />
      </body>
    </html>
  );
}
