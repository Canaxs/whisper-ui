"use client";
import { isExpiredToken } from "@/api/apiCalls";
import { Environment } from "@/environments/environments";

export const  isAuth = async (request) => {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;

    let bool: Boolean = false;

    if(token != null) {
        if(request.url.substring(Environment.domain.length).includes(urlConfig[0]) || request.url.substring(Environment.domain.length).includes(urlConfig[2])) {
           
            const authorizationModel = {
                authorization : token
            }
            await isExpiredToken(authorizationModel).then((res) => {
                bool = !res.data;
            })
            return bool; 
        }
        else if (request.url.substring(Environment.domain.length).includes(urlConfig[1]) && role.includes("ROLE_MOD") ) {
            const authorizationModel = {
                authorization : token
            }
            await isExpiredToken(authorizationModel).then((res) => {
                bool = !res.data;
            })
            return bool; 
        }
    }
    return bool;
}

const urlConfig = ['account','panel','plan']