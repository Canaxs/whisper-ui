import { NextRequest, NextResponse } from "next/server";
import { isExpiredToken } from "./api/apiCalls";
import { isAuth } from "./lib/auth";
import { Menus } from "./lib/menuEnum";

export function middleware(request: NextRequest) {
    
    const response = NextResponse.next({
        request: {
            headers: request.headers
        }
    })

    if(request.url.substring(22).includes('kategori')) {
        if(request.url.substring(31).split("/").length > 2) {
            return NextResponse.redirect(new URL('/404', request.url))
        }
        else if(Object.values(Menus).includes(request.url.substring(31).split('/')[0])) {
            return response;
        }
        else {
            return NextResponse.redirect(new URL('/404', request.url))
        }
    }

    if(isAuth(request)) {
        return response;
    } 
    else {
        if(request.url.substring(22) === "account") {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        else if (request.url.substring(22) === "panel") {
            return NextResponse.redirect(new URL('/panel-login', request.url))
        }
    }
}

export const config = {
    matcher: ['/account/:path*','/panel/:path*','/kategori/:path*'],
};