
"use client";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Label } from "@radix-ui/react-label";
import { PiPencilSimpleLine } from "react-icons/pi";
import ChatCard from "@/components/Chat-Card/Chat-Card";


export default function AllChat() {

    return (
        <div className="w-full relative h-full">
            <div className="w-full">
                <a href="/">
                    <MdOutlineKeyboardBackspace className="absolute left-2 top-2 size-10 cursor-pointer hover:scale-125 transition-all max-md:top-5 max-md:size-7 z-50" title="Anasayfa'ya Git" />
                </a>
                <div className="w-3/4 ml-[12.5%] relative top-5">
                    <div className="flex justify-between w-full">
                        <div className="m-5 flex items-center hover:shadow-gray-200 hover:bg-gray-100 hover:shadow-xl transition-all cursor-pointer border border-gray-200 shadow-md p-2 rounded">
                            <PiPencilSimpleLine className="mr-1 size-7 hover:text-black transition-all" />
                            <Label className="cursor-pointer text-base drop-shadow-xl">Yaz</Label>
                        </div>
                        <h1 className="drop-shadow-md text-black text-3xl m-5">Söyleşi Alanı</h1>
                        <div className="mr-5 mt-5">
                            <a href="/"><img src="../../logo-black.png" width={50} height={50} className="cursor-pointer hover:-rotate-6 transition-all" /></a>
                        </div>
                    </div>
                    <div className="mt-14 ml-[20%] w-3/5">
                        {Array.from({ length: 50 }).map((_ , index) => <ChatCard key={"Deneme"+index} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}