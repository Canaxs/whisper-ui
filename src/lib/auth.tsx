"use client";
import { isExpiredToken } from "@/api/apiCalls";
import { Environment } from "@/environments/environments";

const urlConfig = ['account', 'panel', 'plan'];

export const isAuth = async (request: any): Promise<boolean> => {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;
    if (!token) return false;

    // Path'i güvenli şekilde al
    const pathname = request.nextUrl?.pathname || request.url?.replace(Environment.domain, "") || "";

    try {
        if (pathname.startsWith("/account") || pathname.startsWith("/plan")) {
            const { data } = await isExpiredToken({ authorization: token });
            return !data;
        }
        if (pathname.startsWith("/panel") && role && role.includes("ROLE_MOD")) {
            const { data } = await isExpiredToken({ authorization: token });
            return !data;
        }
    } catch (e) {
        // API hatası olursa yetkisiz say
        return false;
    }
    return false;
};