"use client";
import BadgeTable from "@/components/Badge-Table/BadgeTable";
import DashboardMenu from "@/components/Dashboard-Menu/DashboardMenu";




export default function BadgesPage() { 
    return (
        <div className="w-full h-[95%] flex">
            <DashboardMenu />
            <div className="ml-[1%] mr-[1%] w-[98%] mt-5 flex">
                <div className="w-[85%] shadow-2xl pl-5 pr-5 pt-3">
                    <BadgeTable />
                </div>
            </div>
        </div>
    )
}