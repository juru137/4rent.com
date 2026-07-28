import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import WhatsAppChat from "../components/WhatsAppChat";
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
  title: "4Rent - Find Your Next Place",
  description: "The best platform to find rental properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <script
          dangerouslySetInnerHTML={{
            __html: `try { const theme = window.localStorage.getItem('theme'); document.documentElement.classList.toggle('dark', theme === 'dark'); } catch (e) {}`,
          }}
        />
        {children}
        <WhatsAppChat />
      </body>
    </html>
  );
}
