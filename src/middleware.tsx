import { NextRequest, NextResponse } from "next/server";
import { isAuth } from "./lib/auth";
import { Menus } from "./lib/menuEnum";
import { Environment } from "./environments/environments";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Abonelik kontrolü
    if (!pathname.startsWith("/plan")) {
        const isSubscribe = request.cookies.get("isSubscribe")?.value;
        if (isSubscribe === "false") {
            return NextResponse.redirect(new URL("/plan", request.url));
        }
    }

    // Korumalı sayfalar
    if (
        pathname.startsWith("/account") ||
        pathname.startsWith("/panel") ||
        pathname.startsWith("/kategori") ||
        pathname.startsWith("/plan")
    ) {
        // Kategori özel kontrolü
        if (pathname.startsWith("/kategori")) {
            const parts = pathname.replace("/kategori/", "").split("/");
            if (parts.length > 2) {
                return NextResponse.redirect(new URL("/404", request.url));
            }
            const [category] = parts;
            const categoryName = category.split("?")[0];
            if (categoryName && !Object.values(Menus).includes(categoryName)) {
                return NextResponse.redirect(new URL("/404", request.url));
            }
        }

        // Auth kontrolü
        try {
            const isAuthenticated = await isAuth(request);
            if (isAuthenticated) {
                return NextResponse.next();
            } else {
                if (pathname.startsWith("/account")) {
                    return NextResponse.redirect(new URL("/login", request.url));
                } else if (pathname.startsWith("/panel")) {
                    return NextResponse.redirect(new URL("/panel-login", request.url));
                }
            }
        } catch (e) {
            return NextResponse.redirect(new URL("/404", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/plan",
        "/account/:path*",
        "/kategori/:path*",
        "/soylenti/:path*",
        "/sohbet/:path*",
        "/search/:path*",
        "/user/:path*",
        "/panel/:path*",
    ],
};