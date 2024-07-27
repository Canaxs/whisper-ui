"use client";
import LoginRegist from "@/components/Login-Regist/LoginRegist";

export default function Login() {
    return (
        <div className="flex justify-center items-center h-full w-full flex-col bg-gradient-to-r from-white to-gray-200">
            <a href="/"><img src="logo-black.png" width={"100px"} height={"100px"} alt="Söylenti" /></a>
            <p className="font-medium mb-5 mt-2 text-sm text-slate-600 drop-shadow-lg">Söylenti - Bir Haber Sitesinden Çok Daha Fazlası</p>
            <LoginRegist />
        </div>
    )
}