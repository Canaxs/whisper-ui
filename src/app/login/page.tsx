"use client";
import LoginRegist from "@/components/Login-Regist/LoginRegist";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-full w-full flex-col bg-gradient-to-r from-white to-gray-200 max-sm:to-gray-100">
      <Link href="/">
        <Image
          src="/logo-black.png"
          alt="Söylenti"
          width={100}
          height={100}
          className="hover:scale-105 transition-all"
          title="Söylenti"
          priority
        />
      </Link>
      <p className="font-medium mb-5 mt-2 text-sm text-slate-600 drop-shadow-lg">
        Söylenti - Bir Haber Sitesinden Çok Daha Fazlası
      </p>
      <LoginRegist />
    </div>
  );
}
