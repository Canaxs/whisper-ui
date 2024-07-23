"use client";
import HeaderTop from "@/components/Header-Top/Header-Top";
import WriteContent from "@/components/Write-Content/WriteContent";

export default function Write() {
    return (
        <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
            <HeaderTop flag={"../siyah-flag.png"} logo={"../logo-black.png"} />
            <div className="w-4/5 ml-[10%] mt-10">
                <WriteContent />
            </div>
        </div>
    )
}