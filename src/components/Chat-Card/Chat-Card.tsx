import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { GrResources } from "react-icons/gr";
import { TbWriting } from "react-icons/tb";
import { useEffect } from "react"
import { SlLike  , SlDislike  } from "react-icons/sl";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { convertMenusEn } from "@/lib/menuEnum";
import HovCard from "../Hov-Card/HovCard";

export default function ChatCard(props) {

    const router = useRouter();


    function routeLink() {
        router.push("/sohbet/soylesi/"+props.obj['id']);
    }


    return (
        <div key={props.key} className="mt-5 border-gray-200 border rounded p-2 hover:shadow-xl transition-all cursor-pointer">
            <div className="flex justify-start">
                <Avatar className="w-7 h-7">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="relative bottom-[2px] ml-3 mr-3">
                    <div className="flex items-center mb-1">
                        <HovCard name={props.obj['user']['username']} buttonClass={"no-underline text-gray-500 items-start h-5"}/>
                        <span className="text-gray-400 drop-shadow ml-1 text-base">·</span>
                        <span className="text-gray-400 drop-shadow ml-1 text-sm">{props.date}</span>
                    </div>
                    <div className="mr-5 max-sm:mr-1" onClick={() => routeLink()}>
                        <span className="text-base line-clamp-2 max-sm:text-sm">{props.obj['description']}</span>
                    </div>
                    <div className="w-3/5 max-sm:w-full">
                        <a className="page-card w-full" href={"/kategori/"+convertMenusEn(props.obj["whisperCategory"])+"/"+props.obj['whisperUrlName']}>
                            <Card className="mt-3 shadow-xl hover:shadow-2xl hover:shadow-gray-400 transition-all relative w-full">
                                <div className="circle1 absolute bottom-0 m-auto flex justify-center items-center">
                                    <span className="drop-shadow-xl font-medium text-black hidden line-clamp-1 ml-5 mr-5" dangerouslySetInnerHTML={{ __html: props.obj['whisperTitle'] }}>
                                    </span>
                                </div>
                                <CardContent className="p-0">
                                    <div className="flex w-full h-full">
                                        <div className="w-full h-full absolute z-0 rounded-lg">
                                            <img src={props.obj['whisperImageURL']} className="rounded-lg h-full w-full object-cover"/>
                                        </div>
                                        <div className="absolute z-10 w-full h-full rounded-lg" style={{backgroundColor: "rgba(0,0,0,.5)"}}>
                                        </div>
                                        <div className="flex flex-col w-full p-1 z-20">
                                            <span className="text-white drop-shadow-xl text-xs font-medium">{props.obj['whisperCategory']}</span>
                                            <span className="text-xl text-slate-100 drop-shadow mt-2 font-medium line-clamp-1 max-sm:text-sm max-md:text-lg ">
                                                {props.obj['whisperTitle']}
                                            </span>
                                            <div className="p-0 mt-1 mb-1 ml-0">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center text-slate-100">
                                                        <TbWriting className="size-3 mr-2"/>
                                                        <span className="text-xs drop-shadow-lg pt-1 pb-1">{props.obj['whisperAuthorName']}</span>
                                                    </div>
                                                    <div className="flex mt-1 items-center text-slate-100">
                                                        <GrResources className="size-3 mr-2"/>
                                                        <span className="text-xs drop-shadow-lg">{props.obj['whisperSource']}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                    </div>
                    <div className="flex mt-3">
                            <div className="flex">
                                <SlLike  className="size-5 cursor-pointer hover:scale-110 transition-all hover:text-green-400"/>
                                <span className="ml-1 font-medium text-sm text-gray-500">{"5"}</span>
                            </div>
                            <div className="flex">
                                <SlDislike  className="size-5 ml-3 cursor-pointer hover:scale-110 transition-all hover:text-red-400"/>
                                <span className="ml-1 font-medium text-sm text-gray-500">{"5"}</span>
                            </div>
                            <div className="flex">
                                <a href={"/sohbet/soylesi/"+props.obj['id']}>
                                    <HiMiniChatBubbleLeftRight className="size-6 ml-5 relative bottom-[2px] text-gray-400 hover:scale-110 transition-all cursor-pointer" />
                                </a>
                                <span className="ml-1 font-medium text-sm text-gray-500">{props.obj['commentSize']}</span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}