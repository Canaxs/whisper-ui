import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from '@/app/StoreProvider';
import { useAppSelector, useAppDispatch, useAppStore } from '../lib/hooks'
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react";
import { PiChatCircleThin } from "react-icons/pi";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Söylenti - Haber Sitesi",
  description: "Söylenti - Bir Haber Sitesinden Çok Daha Fazlası",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="en" className="w-full h-full">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2938362237500987" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className+" w-full h-full"} style={{fontFamily: 'Poppins,sans-serif'}} >
      <StoreProvider>
            <div className="w-full h-full">  
              {children}
              <a href="/sohbet">
                <div className="fixed right-3 bottom-3 cursor-pointer flex items-center justify-center opacity-60 hover:opacity-100 transition-all">
                  <PiChatCircleThin className="size-16" />
                  <img src={"https://i.ibb.co/rMszrhv/s-ylesi.png"} width={45} height={45} className="absolute"/>
                </div>
              </a>
            </div>
        <Toaster />
      </StoreProvider>
      </body>
    </html>
  );
}
