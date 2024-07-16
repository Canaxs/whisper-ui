import { isExpiredToken } from "@/api/apiCalls";

export const isAuth = () => {
    if(localStorage.getItem("token") != "" && localStorage.getItem("username") != "") {
        return false;
    }
    return true;
}