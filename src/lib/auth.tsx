"use client";
import { isExpiredToken } from "@/api/apiCalls";
import Cookies from 'js-cookie'

export const isAuth = (request) => {
    const username = request.cookies.get("username")?.value;
    const token = request.cookies.get("token")?.value;

    if(urlConfig.find((url) => url === request.url.substring(22)) != null && username != null && token != null) {
        return true;
    }
    return false;
}

const urlConfig = ['account','panel']