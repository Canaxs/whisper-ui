"use client";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";

export default function Help() {
    return (
        <div>
        <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
            <Header flag={"../../siyah-flag.png"} logo={"../../logo-black.png"} />
        </div>
            <FooterArea src={"../../logo-white.png"} />
        </div>
    )
}