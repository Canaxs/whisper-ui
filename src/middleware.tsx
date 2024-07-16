import { NextRequest, NextResponse } from "next/server";
import { isExpiredToken } from "./api/apiCalls";
import { isAuth } from "./lib/auth";


export function middleware(request: NextRequest) {

    const response = NextResponse.next({
        request: {
            headers: request.headers
        }
    })

    if(isAuth()) {
        return response;
    }
}

export const config = {
    matcher: ['/account'],
};