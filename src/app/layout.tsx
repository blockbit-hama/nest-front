import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import { ReactNode } from "react";
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nest Wallet",
  description: "Secure and easy to use wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <style>{`
          body {
            background: #14151A;
            color: #E0DFE4;
            font-family: var(--font-geist-sans), var(--font-geist-mono), sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            box-sizing: border-box;
          }
          * {
            box-sizing: inherit;
          }
          button, input, select {
            font-family: inherit;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
