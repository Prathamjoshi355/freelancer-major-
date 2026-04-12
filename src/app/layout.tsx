import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";

import { AppHeader } from "@/components/app-header";
import { AuthProvider } from "@/context/AuthContext";


const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "ForgeMarket",
  description: "AI-governed freelance marketplace with enforced verification and fraud controls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} min-h-screen bg-[radial-gradient(circle_at_top,#e0f2fe,transparent_32%),linear-gradient(180deg,#fffdf8,#f8fafc)] text-slate-900`}>
        <AuthProvider>
          <AppHeader />
          <main className="mx-auto min-h-[calc(100vh-81px)] w-full max-w-7xl px-4 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
