"use client";
import { getDisputeTag } from "@/api/apiCalls";
import ChatCard from "@/components/Chat-Card/Chat-Card";
import { convertDateMonth } from "@/lib/dateEnum";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";


export type DisputeDTO = {
    id: string,
    description: string,
    user: {},
    createdDate: string,
    whisperTitle: string,
    whisperUrlName: string,
    whisperCategory: string,
    whisperSource: string,
    whisperAuthorName: string,
    whisperImageURL: string,
    disputeTag: {},
    commentSize: string,
}


export default function TagPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    const router = useRouter();

    const [disputeDTO , setDisputeDTO ] = useState<DisputeDTO[]>([])

    const [pSlug , setPSlug] = useState("");

    useEffect(() => {
        getDisputeTagFunc();
    }, [])


    async function getDisputeTagFunc() {
        const slug = (await params).slug
        getDisputeTag(slug).then((res) => {
            setDisputeDTO(res.data)
            setPSlug(slug);
        },(exception) => {
            return (
                <div className="flex w-full h-full">
                    <a href="/sohbet">
                        <MdOutlineKeyboardBackspace className="absolute left-2 top-2 size-10 cursor-pointer hover:scale-125 transition-all max-md:top-5 max-md:size-7 z-50" title="Anasayfa'ya Git" />
                    </a>
                    <div className="flex justify-center w-full">
                        <span className="drop-shadow text-2xl text-gray-600">Böyle bir etiket bulunmuyor</span>
                    </div>
                </div>
            )
        })
    }

    function giveTheDate(date) {
        let dateLet = date.split("-",3);
        const month = convertDateMonth(dateLet[1]);
        const daySplit = dateLet[2].split("T",2);
        let day = daySplit[0];
        const dayControl = day.split("");
        
        if(dayControl[0] === "0") {
            day = dayControl[1];
        }

        return month +" "+day; 
    }


    return (
        <div className="w-full h-full">
            <a href="/sohbet">
                <MdOutlineKeyboardBackspace className="absolute left-2 top-2 size-10 cursor-pointer hover:scale-125 transition-all max-md:top-5 max-md:size-7 z-50" title="Anasayfa'ya Git" />
            </a>
            {disputeDTO.length > 0 ? 
                <div className="flex justify-center mt-10">
                    <h1 className="font-medium drop-shadow-lg text-2xl">#{pSlug}</h1>
                </div>
            : ""}
            <div className="mt-14 ml-[20%] w-3/5 max-xl:w-full max-xl:ml-0">
                {disputeDTO.length > 0 ?  disputeDTO.map((obj,index) => 
                    <div key={"etiket"+index}>
                        <ChatCard obj={obj} date={giveTheDate(obj['createdDate'])} tags={obj.disputeTag['tags']} />
                    </div>
                ) :
                    <div className="flex justify-center w-full">
                        <span className="drop-shadow text-2xl text-gray-600">Böyle bir etiket bulunmuyor</span> 
                    </div>
                }
            </div>
        </div>
    )
}