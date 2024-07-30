"use client";
import DashboardMenu from "@/components/Dashboard-Menu/DashboardMenu";
import { ModPendingTable2 } from "@/components/Whisper-Pending-Table/ModPendingTable2";

export default function ModsPage() {

    return (
        <div className="w-full h-[95%] flex"> 
            <DashboardMenu />
            <div className="ml-[1%] mr-[1%] w-[98%] mt-5 flex">
                <div className="w-[85%] shadow-2xl pl-5 pr-5 pt-3">
                    <ModPendingTable2 />
                </div>
            </div>
        </div>
    )
}