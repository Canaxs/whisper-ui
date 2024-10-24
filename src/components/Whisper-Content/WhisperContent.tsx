import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { SlLike  , SlDislike  } from "react-icons/sl";
import HovCard from "../Hov-Card/HovCard";
import { GrResources } from "react-icons/gr";
import { TbWriting } from "react-icons/tb";
import AbsoluteAdversiting from "../Advertising-Space/AbsoluteAdversiting";
import WhisperComment from "../Whisper-Comment/WhisperComment";
import { useEffect, useState } from "react";
import { controlLike, likeWhisper } from "@/api/apiCalls";
import Cookies from 'js-cookie'
import { useToast } from "@/components/ui/use-toast"
import { TbCategory } from "react-icons/tb";



export default function WhisperContent(props) {
    
    const { toast } = useToast();

    const [likeExists, setLikeExists] = useState(false);

    useEffect(() => {
        if(Cookies.get("username") != null) {
            control();
        }
    }, [])


    async function control() {
        await controlLike(props.whisper.whisperLike.id,Cookies.get("token")).then((res) => {
            setLikeExists(res.data)
        })
    }

    async function like() {
        if(Cookies.get("username") != null) {
            await likeWhisper(props.whisper.whisperLike.id,Cookies.get("token")).then((res) => {
                setLikeExists(true);
                props.whisper.whisperLike.numberLike++;
                toast({
                    variant: "success",
                    title: "Bu Gönderiyi Beğendiniz",
                    description: ":)",
                  })
            }, (exception) => {
                setLikeExists(false);
            })
        }
        else {
            toast({
                variant: "destructive",
                title: "Bu gönderiyi beğenemezsiniz.",
                description: "Gönderiyi beğenmeniz için giriş yapmanız gerekiyor.",
              })
        }
    }

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
                    <span className="text-xs">Oluşturulma Tarihi: {props.whisper.createdDate}</span>
                </div>
            </div>
            <div className="mt-10">
                <div className="h-[0.1px] w-full bg-gray-100"></div>
                <div className="flex">
                    <div className={Cookies.get("username") != null ? "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer" : "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-no-drop opacity-60"} onClick={likeExists ? () => null : () => like()}>
                        <SlLike className={likeExists ? "size-7 text-green-500" : "size-7"}/>
                        <span className={likeExists ? "mt-[5px] font-medium ml-1 text-green-500" : "mt-[5px] font-medium ml-1"}>{props.whisper.whisperLike.numberLike}</span>
                    </div>
                    <div className={Cookies.get("username") ? "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer" : "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-no-drop opacity-60"}>
                        <SlDislike  className="size-7 mt-1"/>
                        <span className="mt-[5px] font-medium ml-1">{props.whisper.whisperLike.numberDislike}</span>
                    </div>
                </div>
                <div className="h-[0.1px] w-full bg-gray-100"></div>
            </div>
            <div className="mt-8">
                <h1 className="text-5xl max-sm:text-xl max-md:text-2xl max-lg:text-3xl max-xl:text-4xl">{props.whisper.title}</h1>
                <div className="flex justify-center">
                    <img src={props.imageURL ? props.imageURL :"../../logo-black.png"} width={"70%"} height={"70%"} />
                </div>
                <div className="mt-5">
                    <span className="leading-7">
                        {props.whisper.description} 
                    </span>
                </div>
            </div>
            <div className="ml-0 mr-0 mt-5 p-0 flex flex-col text-base">
                <div className="flex items-center mt-5">
                    <TbWriting className="size-8 mr-2" title="Yazar"/>
                    <HovCard name={props.whisper.authorName} />
                </div>
                <div className="flex items-center mt-2">
                    <GrResources className="size-8 mr-2" title="Kaynak"/>
                    <span className="text-sm drop-shadow">{props.whisper.source}</span>
                </div>
                <div className="flex items-center mt-2">
                    <TbCategory  className="size-8 mr-2" title="Kategori"/>
                    <span className="text-sm drop-shadow">{props.categoryName} </span>
                </div>
            </div>
            <div className="mt-10">
                <div className="flex">
                    <div className={Cookies.get("username") != null ? "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer" : "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-no-drop opacity-60"} onClick={likeExists ? () => null : () => like()}>
                        <SlLike className={likeExists ? " text-green-500 size-7": "size-7"}/>
                        <span className={likeExists ? "mt-[5px] font-medium ml-1 text-green-500" : "mt-[5px] font-medium ml-1" }>{props.whisper.whisperLike.numberLike}</span>
                    </div>
                    <div className={Cookies.get("username") ? "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer" : "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-no-drop opacity-60"}>
                        <SlDislike  className="size-7 mt-1"/>
                        <span className="mt-[5px] font-medium ml-1">{props.whisper.whisperLike.numberDislike}</span>
                    </div>
                    <div className=" flex justify-center items-center">
                        <WhisperComment comment={props.whisper.whisperComment} whisperId={props.whisper['id']} />
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <span className="text-xs">000.000 Görüntülenme</span>  
            </div>
            <AbsoluteAdversiting class="left"/>
            <AbsoluteAdversiting class="right"/>
            
        </div>
    )
}