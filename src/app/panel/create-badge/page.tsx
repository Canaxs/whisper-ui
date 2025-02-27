"use client";

import CreateBadge from "@/components/Create-Badge/CreateBadge";
import DashboardMenu from "@/components/Dashboard-Menu/DashboardMenu";

export default function CreateBadgePage() { 
    return (
        <div className="w-full h-[95%] flex">
            <DashboardMenu />
            <div className="ml-[1%] mr-[1%] w-[98%] mt-5 flex">
                <div className="w-[85%] shadow-2xl pl-5 pr-5 pt-3">
                    <CreateBadge />
                </div>
            </div>
        </div>
    )
}