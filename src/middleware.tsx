import { NextRequest, NextResponse } from "next/server";
import { isExpiredToken } from "./api/apiCalls";
import { isAuth } from "./lib/auth";

export function middleware(request: NextRequest) {

    
    const response = NextResponse.next({
        request: {
            headers: request.headers
        }
    })

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
    matcher: ['/account'],
};