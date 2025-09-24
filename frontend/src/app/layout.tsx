import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import HeaderClient from "./_components/HeaderClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Recruiter",
  description: "Voice AI recruiter for automated technical interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100 relative overflow-x-hidden`}>
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-[40rem] w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/30 via-fuchsia-500/20 to-cyan-400/20 blur-3xl" />
          <div className="absolute bottom-[-20rem] right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-cyan-500/20 to-indigo-600/20 blur-3xl" />
        </div>
        <header className="border-b border-white/10 bg-gray-900/60 backdrop-blur supports-[backdrop-filter]:bg-gray-900/40">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="group flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white font-semibold shadow-lg shadow-indigo-900/30">AI</span>
              <span className="text-lg font-semibold tracking-tight group-hover:text-white transition-colors">AI Recruiter</span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm" />
            <div className="flex items-center gap-2">
              <HeaderClient />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>
        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-gray-400 flex items-center justify-between">
            <span>© {new Date().getFullYear()} AI Recruiter</span>
            <span className="text-[10px]">Made with Next.js + Tailwind</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
