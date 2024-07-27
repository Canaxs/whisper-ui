"use client";

import ChartComp from "@/components/Chart-Comp/ChartComp";
import DashboardMenu from "@/components/Dashboard-Menu/DashboardMenu";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts"

export default function Dashboard() {
    return (
        <div className="w-full h-full flex">
            <DashboardMenu />
            <div className="ml-[1%] mr-[1%] mt-10 w-[98%]">
                <div  className="flex max-2xl:flex-wrap">
                    <div className="2xl:w-1/2 m-3 max-2xl:w-full">
                        <ChartComp title={"Görüntülenme Çizelgesi"} desc={"Son 3 aya ait toplam ziyaretçi gösteriliyor"}/>
                    </div>
                    <div className="2xl:w-1/2 m-3 max-2xl:w-full">
                        <ChartComp title={"Paylaşım Çizelgesi"} desc={"Son 3 aya ait toplam paylaşımlar gösteriliyor"}/>
                    </div>
                </div>
                <div  className="flex max-2xl:flex-wrap">
                    <div className="2xl:w-1/2 m-3 max-2xl:w-full ">
                        <ChartComp title={"Kazanç Çizelgesi"} desc={"Son 3 aya ait toplam kazançlar gösteriliyor"}/>
                    </div>
                    <div className="2xl:w-1/2 m-3 max-2xl:w-full">
                        <ChartComp title={"Kullanıcı Çizelgesi"} desc={"Son 3 aya ait toplam oluşturulan kullanıcılar gösteriliyor"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}