import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from '@/app/StoreProvider';
import { useAppSelector, useAppDispatch, useAppStore } from '../lib/hooks'
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Söylenti - Haber Sitesi",
  description: "Söylenti - Bir Haber Sitesinden Çok Daha Fazlası",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="en" className="w-full h-full">
      <body className={inter.className+" w-full h-full"} style={{fontFamily: 'Poppins,sans-serif'}} >
      <StoreProvider>
        <Suspense fallback={null}>
            <div className="w-full h-full">  
              {children}
            </div>
          </Suspense>
        <Toaster />
      </StoreProvider>
      </body>
    </html>
  );
}
