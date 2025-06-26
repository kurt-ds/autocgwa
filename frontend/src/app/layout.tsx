import type { Metadata } from "next";
import "./globals.css";
import { ResultProvider } from '../context/ResultContext'

export const metadata: Metadata = {
  title: "AutoCGWA",
  description: "Calculate your Cumulative Grade Weighted Average (CGWA)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ResultProvider>
          {children}
        </ResultProvider>
      </body>
    </html>
  );
}
