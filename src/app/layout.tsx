import type { Metadata } from "next";
import { Inter } from "next/font/google";
import sun from "../../public/sun.svg";
import Image from "next/image";
import styles from "./layout.module.scss";
import "./globals.css";
import { Header } from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"], weight: "600" });

export const metadata: Metadata = {
  title: "City Weather",
  description:
    "A simple way to search for the weather in cities across the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
