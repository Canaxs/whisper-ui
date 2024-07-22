"use client";
import { isExpiredToken } from "@/api/apiCalls";
import Cookies from 'js-cookie'

export const isAuth = (request) => {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;

    if(token != null) {
        if(request.url.substring(22) === urlConfig[0]) {
            return true;
        }
        else if (request.url.substring(22) === urlConfig[1] && (role === "mod" || role === "admin")) {
            return true;
        }
    }
    return false;
}

const urlConfig = ['account','panel']