"use client";

import MultiStep from "@/components/Multi-Step/MultiStep";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useRouter,useSearchParams } from 'next/navigation'

export default function Plan() {

    const [isSubscribe , setIsSubscribe] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if(!Cookies.get("isSubscribe") || Cookies.get("isSubscribe") === "true") {
            router.push("/")
        }
        else {
            setIsSubscribe(false)
        }
    } , [])

    return (
        <div>
            <div className={isSubscribe ? "hidden" : ""}>
                <MultiStep />
            </div>
        </div>
    )
}