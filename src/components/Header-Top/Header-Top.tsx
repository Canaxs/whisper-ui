import { Button } from "../ui/button";
import  Image  from "next/image";
import Cookies from 'js-cookie'
import React, { useState, useEffect } from "react";
import { HeaderUser } from "../Header-User/Header-User";
import { Label } from "@radix-ui/react-label";
import { TfiWrite } from "react-icons/tfi";
import { IoIosNotifications } from "react-icons/io";
import { HeaderNotify } from "../Header-Notify/HeaderNotify";
import { Progress } from "@/components/ui/progress"
import { useRouter } from 'next/navigation';
import { isExpiredToken } from "@/api/apiCalls";


export default function HeaderTop(props) { 

    const [userData,setUserData] = useState({
        username: null,
        userPoint: null,
        role: null,
    });
    const [isUser , setIsUser] = useState(false);

    const router = useRouter();

    async function uploadInformation() {
        if(Cookies.get("username") != null) {
            await setUserData({
                username: Cookies.get("username"),
                userPoint: Cookies.get("userPoint"),
                role: Cookies.get("role"),
            })
        }
        setIsUser(true);
    }

    async function controlInformation() {
        if(Cookies.get("token") != null) {
            const expireRequest = {
                authorization: Cookies.get("token")
            }
            await isExpiredToken(expireRequest).then((res) => {
                if(res.data) {
                    Cookies.remove("token");
                    Cookies.remove("username");
                    Cookies.remove("userPoint");
                    Cookies.remove("role");
                }
                else {
                    uploadInformation();
                }
            })
        }
        else {
            setIsUser(true);
        }
    }


    useEffect(() => {
        controlInformation();
    },[])



    return(
        <div className="flex justify-between">
            <div className="flex max-lg:ml-3">
                <a href="/"><img src={props.logo} width="110" height="110" alt="Söylenti" className="cursor-pointer mt-1"/></a>
                <div className="h-1/2 mt-[8%] w-[1px] bg-slate-300 ml-5"></div>
                <img src={props.flag} className="ml-2 mb-1" width="100px" height="50px" alt="Türk Bayrağı" />
            </div>
            <div className="flex items-center max-md:mr-[1%]">
                {isUser === false ? (
                    <div role="status" className="mr-10">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                ) : ( userData.username != null ?
                <React.Fragment>
                    <div className="flex mr-5 cursor-pointer text-gray-700 transition-all hover:scale-110">
                        <a href="/account/write" className="flex">
                        <TfiWrite className="mr-2 size-5 hover:text-black transition-all" />
                        <Label className="cursor-pointer text-sm drop-shadow-xl">Write</Label>
                        </a>
                    </div>
                    <HeaderNotify />
                    <HeaderUser username={userData.username}  userPoint={userData.userPoint} /> 
                </React.Fragment>
                : <a href="/login" className="text-sm text-slate-700 font-medium">Giriş Yap / Kayıt Ol</a>
                )
                }
            </div>
        </div>
    )
}