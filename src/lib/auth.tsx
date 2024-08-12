"use client";
import { isExpiredToken } from "@/api/apiCalls";

export const  isAuth = async (request) => {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;

    let bool: Boolean = false;

    if(token != null) {
        if(request.url.substring(22) === urlConfig[0]) {
           
            const authorizationModel = {
                authorization : token
            }
            await isExpiredToken(authorizationModel).then((res) => {
                bool = !res.data;
            })
            return bool; 
        }
        else if (request.url.substring(22) === urlConfig[1] && (role === "mod" || role === "admin")) {
            return true;
        }
    }
    return bool;
}

const urlConfig = ['account','panel']