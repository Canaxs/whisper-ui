"use client";
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
import { useEffect, useState } from "react"
import { SlLike  , SlDislike  } from "react-icons/sl";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { VscCommentDiscussion } from "react-icons/vsc";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { controlDisLikeDispute, controlLikeDispute, createDisputeComment, dislikeDispute, getDispute, isExpiredToken, likeDispute, unDislikeDispute, unLikeDispute } from '@/api/apiCalls';
import Cookies from 'js-cookie'
import { description } from "@/components/Chart-Comp/ChartComp";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { convertMenusEn } from "@/lib/menuEnum";
import { convertDateMonth } from "@/lib/dateEnum";
import HovCard from "@/components/Hov-Card/HovCard";


export default function SoylesiPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    const [dispute , setDispute] = useState({
        id: "",
        createdBy: "",
        createdDate: "",
        updatedBy: "",
        updatedDate: "",
        description: "",
        user: {},
        whisper: {},
        disputeComments: [],
        disputeTag: {},
        disputeLike: {}
    });

    const router = useRouter();

    const { toast } = useToast();

    const [likeExists, setLikeExists] = useState(false);

    const [dislikeExists, setDislikeExists] = useState(false);

    const [isLogin , setLogin] = useState(false);

    const [comment , setComment] = useState("");

    useEffect(() => {
        getDisputeFunc();
        if(Cookies.get("token")) {
            setLogin(true)
            controlLike();
            controlDisLike();
        }
    }, [])

    async function controlLike() {
        const slug = (await params).slug
        await controlLikeDispute(slug , Cookies.get("token")).then((res) => {
            setLikeExists(res.data);
        })
    }

    async function controlDisLike() {
        const slug = (await params).slug
        await controlDisLikeDispute(slug , Cookies.get("token")).then((res) => {
            setDislikeExists(res.data);
        })
    }

    async function like() {
        if(!dislikeExists) {
            if(Cookies.get("username") != null) {
                await likeDispute(dispute.id,Cookies.get("token")).then((res) => {
                    setLikeExists(true);
                    dispute.disputeLike['numberLike']++;
                    toast({
                        variant: "success",
                        title: "Bu Söyleşiyi Beğendiniz",
                        description: ":)",
                    })
                }, (exception) => {
                    setLikeExists(false);
                })
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Bu Söyleşiyi beğenemezsiniz.",
                    description: "Söyleşiyi beğenmeniz için giriş yapmanız gerekiyor.",
                })
            }
        }
        else {
            toast({
                variant: "destructive",
                title: "Bu Söyleşiyi beğenemezsiniz",
                description: "Söyleşiyi beğenmeniz için dislike işleminizi geri almanız gerekiyor.",
            })
        }
    }

    async function dislike() {
        if(!likeExists) {
            if(Cookies.get("username") != null) {
                await dislikeDispute(dispute.id,Cookies.get("token")).then((res) => {
                    setDislikeExists(true);
                    dispute.disputeLike['numberDislike']++;
                    toast({
                        variant: "destructive",
                        title: "Bu Söyleşiyi Beğenmediniz",
                        description: ":(",
                    })
                }, (exception) => {
                    setDislikeExists(false);
                })
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Bu Söyleşiyi beğenemezsiniz.",
                    description: "Söyleşiyi beğenmemeniz için giriş yapmanız gerekiyor.",
                })
            }
        }
        else {
            toast({
                variant: "destructive",
                title: "Bu Söyleşiyi beğenemezsiniz",
                description: "Söyleşiyi beğenmeniz için beğeni işleminizi geri almanız gerekiyor.",
            })
        }
    }

    async function unlike() {
        if(Cookies.get("username") != null) {
            await unLikeDispute(dispute.id,Cookies.get("token")).then((res) => {
                setLikeExists(false);
                dispute.disputeLike['numberLike']--;
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
            await unDislikeDispute(dispute.id,Cookies.get("token")).then((res) => {
                setDislikeExists(false);
                dispute.disputeLike['numberDislike']--;
                toast({
                    variant: "success",
                    title: "Dislike geri alındı",
                    description: ":)",
                  })
            }, (exception) => {
                setDislikeExists(true);
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


    async function getDisputeFunc() {
        const slug = (await params).slug
        await getDispute(slug).then((res) => {
            setDispute(res.data);
        }, (exception) => {
            router.push("/404");
        })
    }

    async function submitComment() {
        if(comment.length >= 3){
            toast({
                variant: "waiting",
                title: "Yorum Oluşturuluyor",
                description: "Bekleyiniz.",
            })
            let OK = false;
            const disputeCommentDTO = {
                description : comment,
                disputeId: (await params).slug
            }
            await createDisputeComment(disputeCommentDTO,Cookies.get("token")).then(() => {
                toast({
                    variant: "success",
                    title: "Yorum oluşturuldu",
                    description: "Başarıyla Yorum eklendi"
                })
                OK = true;
            },(exception) => {
                toast({
                    variant: "destructive",
                    title: "Yorum Oluşturulamadı",
                    description: "Tekrar deneyiniz",
                })
            }).finally(() => {
                if(OK) {
                    getDisputeFunc();
                }
            })
        }
        else {
            toast({
                variant: "destructive",
                title: "Yorum Alanına En Az 3 karakter girmelisiniz.",
                description: "Tekrar deneyiniz",
            })
        }
    }

    function getUserComment(user) {
        return user['username'];
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
        <div className="w-full min-h-screen flex justify-center bg-[#F5F5F5] py-8 px-2 relative">
        {/* Geri Dön tuşu: sayfanın en solunda, sticky */}
        <a href="/sohbet" className="fixed left-4 top-6 z-30 sm:left-6 sm:top-8">
            <MdOutlineKeyboardBackspace className="size-9 sm:size-10 cursor-pointer hover:scale-125 transition-all text-gray-400 hover:text-gray-700 bg-white/80 rounded-full shadow p-1" title="Geri Dön" />
        </a>
        {dispute.id != "" ?  
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-0 sm:p-6 flex flex-col gap-4">
            {/* Üst Bilgi */}
            <div className="flex items-center gap-3 pt-8 sm:pt-0 pl-12 sm:pl-0">
                <Avatar className="w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-base">{dispute.user['username']}</span>
                    <span className="text-xs text-gray-400">{giveTheDate(dispute.createdDate)} · {giveTheClock(dispute.createdDate)}</span>
                </div>
            </div>
            {/* İçerik */}
            <div className="flex flex-col gap-2">
                <span className="text-2xl font-medium my-2 text-gray-900 leading-tight">{dispute.description}</span>
                {dispute.whisper["imageURL"] && (
                  <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 relative transition-transform duration-300 ease-in-out group hover:scale-105 max-sm:hover:scale-100">
                    <img src={dispute.whisper["imageURL"]} className="w-full h-full object-cover"/>
                    {/* Overlay: Kategori ve Başlık */}
                    <a
                      href={`/kategori/${convertMenusEn(dispute.whisper["category"])}${dispute.whisper['urlName'] ? "/"+dispute.whisper['urlName'] : ''}`}
                      className="absolute left-0 bottom-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent px-6 py-4 transition-all duration-200 cursor-pointer group-hover:from-black/90 group-hover:via-black/50"
                      style={{textDecoration: 'none'}}
                    >
                      <span className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1">{dispute.whisper["category"]}</span>
                      <span className="block text-xl sm:text-2xl font-semibold text-white drop-shadow-lg line-clamp-2 group-hover:underline">{dispute.whisper['title']}</span>
                      <div className="flex flex-wrap gap-4 mt-2 text-gray-200 text-xs">
                        <span className="flex items-center gap-1"><TbWriting className="w-4 h-4"/><span>{dispute.whisper["authorName"]}</span></span>
                        <span className="flex items-center gap-1"><GrResources className="w-4 h-4"/><span>{dispute.whisper["source"]}</span></span>
                      </div>
                    </a>
                  </div>
                )}
            </div>
            {/* Beğeni, Dislike, Yorum Barı */}
            <div className="flex items-center justify-between gap-4 border-y border-gray-100 py-3 px-1 text-gray-600">
                <span className='flex items-center gap-1 cursor-pointer select-none' onClick={likeExists ? () => unlike() : () => like()}>
                    <SlLike className={likeExists ? "size-6 text-green-500" : "size-6 hover:text-green-500 transition-all"} />
                    <span className='font-medium text-sm'>{dispute.disputeLike['numberLike']}</span>
                </span>
                <span className='flex items-center gap-1 cursor-pointer select-none' onClick={dislikeExists ? () => unDislike() : () => dislike()}>
                    <SlDislike className={dislikeExists ? "size-6 text-red-500" : "size-6 hover:text-red-500 transition-all"} />
                    <span className='font-medium text-sm'>{dispute.disputeLike['numberDislike']}</span>
                </span>
                <span className='flex items-center gap-1'>
                    <VscCommentDiscussion className='size-6'/>
                    <span className='font-medium text-sm'>{dispute.disputeComments.length}</span>
                </span>
                <span className="text-xs text-gray-400 ml-auto">{giveTheDate(dispute.createdDate)} · {giveTheClock(dispute.createdDate)}</span>
            </div>
            {/* Etiketler */}
            {dispute.disputeTag && dispute.disputeTag['tags'] && dispute.disputeTag['tags'].length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {dispute.disputeTag['tags'].map((tag,index) => 
                  <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-lg text-xs" key={"tag"+index}>{tag}</span>
                )}
              </div>
            )}
            {/* Yorum Ekleme Alanı */}
            {isLogin && (
              <div className='flex items-start gap-2 mt-6 bg-gray-50 rounded-xl p-3 border border-gray-100'>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Textarea className='flex-1 min-h-[40px] max-h-32 resize-y rounded-lg' onChange={(e) => setComment(e.target.value.toString())} placeholder="Yorumunuzu yazın..."/>
                <Button className='bg-gray-700 text-white rounded-lg px-4 py-2' onClick={() => submitComment()}>Gönder</Button>
              </div>
            )}
            {/* Yorumlar */}
            <div className='mt-6 flex flex-col gap-4'>
              {dispute.disputeComments.map((obj , index) => (
                <div className='flex items-start gap-3' key={"obj"+index}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col bg-gray-50 rounded-xl px-3 py-2 border border-gray-100 w-full'>
                    <div className="flex items-center gap-2 mb-1">
                      <HovCard name={getUserComment(obj['user'])} buttonClass={"no-underline text-gray-700 h-5 font-semibold"} />
                      <span className="text-gray-400 text-xs">{giveTheDate(dispute.createdDate)}</span>
                    </div>
                    <span className='text-sm text-gray-800'>{obj['comment']}</span>
                  </div>
                </div>
              ))}
            </div>
        </div>
        : 
        <div role="status" className="flex justify-center items-center w-full h-[400px]">
            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
        }
        </div>
    )
}