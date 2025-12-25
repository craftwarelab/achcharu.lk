import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Navbar from "./components/navBar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Achcharu - Authentic Sri Lankan Spicy Foods",
    template: "%s | Achcharu",
  },
  description:
    "Achcharu brings the taste of Sri Lankan home-made spicy foods to your table. Discover authentic recipes, quality ingredients, and more.",
  keywords: "Achcharu, Sri Lankan, spicy food, recipes, authentic, home-made",
  authors: [{ name: "Achcharu Team", url: "https://achcharu.lk" }],
  creator: "Achcharu Team",
  openGraph: {
    title: "Achcharu - Authentic Sri Lankan Spicy Foods",
    description: "Discover authentic Sri Lankan spicy foods and recipes.",
    type: "website",
    url: "https://achcharu.lk/",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Achcharu - Authentic Sri Lankan Spicy Foods",
      },
    ],
  },
  other: {
    "google-site-verification": "8YTEuT5Pj5_uMqHHRmI3caDNuzh0i-G9R8S9lKYCJjI",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
