import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { SlLike  , SlDislike  } from "react-icons/sl";

  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import HovCard from "../Hov-Card/HovCard";

export default function WhisperContent(props) {
    return (
        <div className="mt-10 ml-[2%]">
            <div className="flex">  
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col ml-2">
                    <span className="text-sm">{props.whisper.authorName}</span>
                    <span className="text-xs">{props.whisper.createdDate}</span>
                </div>
            </div>
            <div className="mt-10">
                <div className="h-[0.1px] w-full bg-gray-100"></div>
                <div className="flex">
                    <div className="p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer">
                        <SlLike className="size-7"/>
                        <span className="mt-[5px] font-medium ml-1">0</span>
                    </div>
                    <div className="p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer">
                        <SlDislike  className="size-7 mt-1"/>
                        <span className="mt-[5px] font-medium ml-1">0</span>
                    </div>
                </div>
                <div className="h-[0.1px] w-full bg-gray-100"></div>
            </div>
            <div className="mt-8">
                <h1 className="text-5xl">{props.whisper.title}</h1>
                <div className="flex justify-center">
                    <img src="../../logo-black.png" width={"70%"} height={"70%"} />
                </div>
                <div className="mt-5">
                    <span className="leading-7">
                        {props.whisper.description} 
                    </span>
                </div>
            </div>
            <div className="m-0 p-0">
                <span>Yazar: <HovCard name={props.whisper.authorName} /> </span>
            </div>
            <div className="mt-10">
                <div className="flex">
                    <div className="p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer">
                        <SlLike className="size-7"/>
                        <span className="mt-[5px] font-medium ml-1">0</span>
                    </div>
                    <div className="p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer">
                        <SlDislike  className="size-7 mt-1"/>
                        <span className="mt-[5px] font-medium ml-1">0</span>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <span className="text-xs">000.000 Görüntülenme</span>  
            </div>
        </div>
    )
}