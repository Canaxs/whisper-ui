import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
import { Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Söylenti - Haber Sitesi",
  description: "Söylenti - Bir Haber Sitesinden Çok Daha Fazlası",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="w-full h-full">
      <Head>
        <meta
          name="description"
          content="Söylenti.com - Türkiye'nin en güncel haber platformu. Futbol, teknoloji, kripto, magazin, siyaset ve daha fazlası!"
        />
        <meta
          name="keywords"
          content="Söylenti, Türkiye haberleri, genç haber platformu, futbol haberleri, teknoloji haberleri, kripto para, magazin, gündem, sosyal medya, kullanıcı paylaşımları, dedikodular, spor, siyaset haberleri, popüler içerikler, para kazanma, paylaşım yaparak kazanma, haber paylaşma platformu, gençler için haber, son dakika, Türkiye gündemi, dijital medya, influencer, popüler haberler, genç kitle, interaktif haber"
        />
        <meta name="author" content="Söylenti" />
        <title>Söylenti - Güncel Haberler ve Söylentiler</title>
      </Head>
      <body className={poppins.className + " w-full h-full"}>
        <StoreProvider>
          <div className="w-full h-full">{children}</div>
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
