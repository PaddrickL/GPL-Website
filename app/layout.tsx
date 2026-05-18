import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-dancing-script",
});

export const metadata: Metadata = {
  title: "3v3 Basketball Tournament",
  description: "Register your team and compete in the ultimate street basketball showdown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`gradient-bg min-h-screen ${dancingScript.variable}`}>
        <Background />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
