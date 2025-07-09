"use client";

import MultiStep from "@/components/Multi-Step/MultiStep";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useRouter,useSearchParams } from 'next/navigation'

export default function Plan() {

    const [showPlanSelection, setShowPlanSelection] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const isSubscribe = Cookies.get("isSubscribe");
        if (isSubscribe === "true") {
            router.push("/account");
        } else {
            setShowPlanSelection(false);
        }
    } , [])

    return (
        <div>
            <div className={showPlanSelection ? "hidden" : ""}>
                <MultiStep />
            </div>
        </div>
    )
}