"use client";

import MultiStep from "@/components/Multi-Step/MultiStep";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useRouter,useSearchParams } from 'next/navigation'

export default function Plan() {

    const [isSubscribe , setIsSubscribe] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const isSubscribe = Cookies.get("isSubscribe");
        if (isSubscribe === "true") {
            router.push("/account");
        } else {
            setIsSubscribe(false);
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