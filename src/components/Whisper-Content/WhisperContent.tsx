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
import { controlDisLike, controlLike, dislikeWhisper, likeWhisper, unDislikeWhisper, unLikeWhisper } from "@/api/apiCalls";
import Cookies from 'js-cookie'
import { useToast } from "@/components/ui/use-toast"
import { TbCategory } from "react-icons/tb";
import { convertDateMonth } from "@/lib/dateEnum";



export default function WhisperContent(props) {
    
    const { toast } = useToast();

    const [likeExists, setLikeExists] = useState(false);

    const [dislikeExists, setDisLikeExists] = useState(false);

    useEffect(() => {
        if(Cookies.get("username") != null) {
            controlLiked();
            controlDisliked();
        }
    }, [])

    async function controlLiked() {
        await controlLike(props.whisper.whisperLike.id,Cookies.get("token")).then((res) => {
            setLikeExists(res.data)
        })
    }

    async function controlDisliked() {
        await controlDisLike(props.whisper.whisperLike.id,Cookies.get("token")).then((res) => {
            setDisLikeExists(res.data)
        })
    }

    async function like() {
        if(!dislikeExists) {
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
        else {
            toast({
                variant: "destructive",
                title: "Bu gönderiyi beğenemezsiniz",
                description: "Gönderiyi beğenmeniz için dislike işleminizi geri almanız gerekiyor.",
            })
        }
    }

    async function dislike() {
        if(!likeExists) {
            if(Cookies.get("username") != null) {
                await dislikeWhisper(props.whisper.whisperLike.id,Cookies.get("token")).then((res) => {
                    setDisLikeExists(true);
                    props.whisper.whisperLike.numberDislike++;
                    toast({
                        variant: "destructive",
                        title: "Bu Gönderiyi Beğenmediniz",
                        description: ":(",
                    })
                }, (exception) => {
                    setDisLikeExists(false);
                })
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Bu gönderiyi beğenemezsiniz.",
                    description: "Gönderiyi beğenmemeniz için giriş yapmanız gerekiyor.",
                })
            }
        }
        else {
            toast({
                variant: "destructive",
                title: "Bu gönderiyi beğenemezsiniz",
                description: "Gönderiyi beğenmeniz için beğeni işleminizi geri almanız gerekiyor.",
            })
        }
    }

    async function unlike() {
        if(Cookies.get("username") != null) {
            await unLikeWhisper(props.whisper.whisperLike.id,Cookies.get("token")).then((res) => {
                setLikeExists(false);
                props.whisper.whisperLike.numberLike--;
                toast({
                    variant: "success",
                    title: "Beğeni geri alındı.",
                    description: ":(",
                  })
            }, (exception) => {
                setLikeExists(true);
            })
        }
        else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Beğeni geri alınırken Sorun Oluştu",
              })
        }
    }

    async function unDislike() {
        if(Cookies.get("username") != null) {
            await unDislikeWhisper(props.whisper.whisperLike.id,Cookies.get("token")).then((res) => {
                setDisLikeExists(false);
                props.whisper.whisperLike.numberDislike--;
                toast({
                    variant: "success",
                    title: "Dislike geri alındı",
                    description: ":)",
                  })
            }, (exception) => {
                setDisLikeExists(true);
            })
        }
        else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Dislike geri alınırken sorun oluştu.",
              })
        }
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

    function giveTheClock(date) {
        let dateLet = date.split("T",2);
        let clockLet = dateLet[1].split(".",2);
        let clockSecondSp = clockLet[0].split(":",3);
        return clockSecondSp[0]+":"+clockSecondSp[1];
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
                    <span className="text-xs flex">Oluşturulma Tarihi : <span className="ml-1">{giveTheClock(props.whisper.createdDate)} · </span> <span className="ml-1">{giveTheDate(props.whisper.createdDate)}</span></span>
                </div>
            </div>
            <div className="mt-10">
                <div className="h-[0.1px] w-full bg-gray-100"></div>
                <div className="flex">
                    <div className={Cookies.get("username") != null ? "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer" : "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-no-drop opacity-60"} onClick={likeExists ? () => unlike() : () => like()}>
                        <SlLike className={likeExists ? "size-7 text-green-500" : "size-7"}/>
                        <span className={likeExists ? "mt-[5px] font-medium ml-1 text-green-500" : "mt-[5px] font-medium ml-1"}>{props.whisper.whisperLike.numberLike}</span>
                    </div>
                    <div className={Cookies.get("username") ? "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer" : "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-no-drop opacity-60"} onClick={dislikeExists ? () => unDislike() : () => dislike()}>
                        <SlDislike  className={dislikeExists ? "text-red-500 size-7 mt-1" : "size-7 mt-1"}/>
                        <span className={dislikeExists ? "text-red-500 mt-[5px] font-medium ml-1" : "mt-[5px] font-medium ml-1"}>{props.whisper.whisperLike.numberDislike}</span>
                    </div>
                </div>
                <div className="h-[0.1px] w-full bg-gray-100"></div>
            </div>
            <div className="mt-8">
                <h1 className="text-5xl max-sm:text-xl max-md:text-2xl max-lg:text-3xl max-xl:text-4xl drop-shadow-lg font-sans">{props.whisper.title}</h1>
                <div className="flex justify-center mt-7 mb-2">
                    <img src={props.whisper.imageURL ? props.whisper.imageURL :"../../logo-black.png"} width={"70%"} height={"70%"} className="rounded-lg"/>
                </div>
                <div className="mt-5">
                    <span dangerouslySetInnerHTML={{ __html: props.whisper.description }} className="leading-7 whitespace-pre-wrap">
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
                    <div className={Cookies.get("username") != null ? "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer" : "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-no-drop opacity-60"} onClick={likeExists ? () => unlike() : () => like()}>
                        <SlLike className={likeExists ? " text-green-500 size-7": "size-7"}/>
                        <span className={likeExists ? "mt-[5px] font-medium ml-1 text-green-500" : "mt-[5px] font-medium ml-1" }>{props.whisper.whisperLike.numberLike}</span>
                    </div>
                    <div className={Cookies.get("username") ? "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-pointer" : "p-2 flex items-center hover:text-black text-gray-400 transition-all cursor-no-drop opacity-60"} onClick={dislikeExists ? () => unDislike() : () => dislike()}>
                        <SlDislike  className={dislikeExists ? "text-red-500 size-7 mt-1" : "size-7 mt-1"}/>
                        <span className={dislikeExists ? "text-red-500 mt-[5px] font-medium ml-1" : "mt-[5px] font-medium ml-1"}>{props.whisper.whisperLike.numberDislike}</span>
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