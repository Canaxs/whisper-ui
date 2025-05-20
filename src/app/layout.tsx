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
import Head from "next/head";


const inter = Inter({ 
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Söylenti - Haber Sitesi",
  description: "Söylenti - Bir Haber Sitesinden Çok Daha Fazlası",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="en" className="w-full h-full">
      <Head>
        <meta name="description" content="Söylenti.com - Türkiye'nin en güncel haber platformu. Futbol, teknoloji, kripto, magazin, siyaset ve daha fazlası!" />
        <meta name="keywords" content="Söylenti, Türkiye haberleri, genç haber platformu, futbol haberleri, teknoloji haberleri, kripto para, magazin, gündem, sosyal medya, kullanıcı paylaşımları, dedikodular, spor, siyaset haberleri, popüler içerikler, para kazanma, paylaşım yaparak kazanma, haber paylaşma platformu, gençler için haber, son dakika, Türkiye gündemi, dijital medya, influencer, popüler haberler, genç kitle, interaktif haber" />
        <meta name="author" content="Söylenti" />
        <title>Söylenti - Güncel Haberler ve Söylentiler</title>
      </Head>
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
