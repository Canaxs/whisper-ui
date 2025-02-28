import { NextRequest, NextResponse } from "next/server";
import { isExpiredToken } from "./api/apiCalls";
import { isAuth } from "./lib/auth";
import { Menus } from "./lib/menuEnum";
import { Environment } from "./environments/environments";

export async function middleware(request: NextRequest) {
    
    const response = NextResponse.next({
        request: {
            headers: request.headers
        }
    })

    const domainLength = Environment.domain.length;

    if(!request.url.substring(domainLength).includes("plan")){
        if(request.cookies.get("isSubscribe")){
            const isSubscribe = request.cookies.get("isSubscribe")?.value;
            if(isSubscribe === "false") {
                return NextResponse.redirect(new URL('/plan', request.url))
            }
        }
    }


    if(request.url.substring(domainLength).includes("account") || request.url.substring(domainLength).includes("panel") ||  request.url.substring(domainLength).includes("kategori") || request.url.substring(domainLength).includes("plan")){

        const categoryTurkishName = "kategori/";

        if(request.url.substring(domainLength).includes('kategori')) {
            let requestString = request.url.substring(domainLength+categoryTurkishName.length).split('/')[0];
            
            if(request.url.substring(domainLength+categoryTurkishName.length).split("/").length > 2) {
                return NextResponse.redirect(new URL('/404', request.url))
            }
            else if (requestString.indexOf("?s=") > -1) {
                if(Object.values(Menus).includes(requestString.split("?")[0])) {
                    return response;
                }
                else {
                    return NextResponse.redirect(new URL('/404', request.url))
                }
            }
            else if (Object.values(Menus).includes(requestString)) {
                return response;
            }
            else {
                return NextResponse.redirect(new URL('/404', request.url))
            }
        }
        
        const bool = await isAuth(request);
        if(bool) {
            return response;
        } 
        else {
            if(request.url.substring(domainLength) === "account") {
                return NextResponse.redirect(new URL('/login', request.url))
            }
            else if (request.url.substring(domainLength) === "panel") {
                return NextResponse.redirect(new URL('/panel-login', request.url))
            }
        }

        return NextResponse.redirect(new URL('/404', request.url))
    }
    else {
        return response;
    }
}

export const config = {
    matcher: [
        '/',
        '/plan',
        '/account/:path*',
        '/kategori/:path*',
        '/soylenti/:path*',
        '/sohbet/:path*',
        '/search/:path*',
        '/user/:path*',
        '/panel/:path*',
        ],
};