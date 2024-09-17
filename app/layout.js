import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { ModalsProvider } from "@/providers/modals-provider";
import { ToasterProvider } from "@/providers/toast-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Admin dashboard",
  description: "Admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ToasterProvider />
          <ModalsProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
