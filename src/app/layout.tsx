import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VocaVerse",
  description: "VocaVerse: Bridging Worlds, One Word at a Time. 🌍✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link type="image/png" sizes="16x16" rel="icon" href="./icons8-translator-16.png"></link>
      <script src="./node_modules/preline/dist/preline.js"></script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
