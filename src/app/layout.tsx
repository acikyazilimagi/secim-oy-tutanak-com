import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Oy Tutanağı Yükle",
  description: "28 Mayı Oy Tutanağı Yükleme Sayfası",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-black"}>{children}</body>
    </html>
  );
}
