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
import { createDisputeComment, getDispute } from '@/api/apiCalls';
import Cookies from 'js-cookie'
import { description } from "@/components/Chart-Comp/ChartComp";
import { useToast } from "@/components/ui/use-toast"


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
    });

    const { toast } = useToast();

    const [isLogin , setLogin] = useState(false);

    const [comment , setComment] = useState("");

    useEffect(() => {
        getDisputeFunc();
        if(Cookies.get("token")) {
            setLogin(true)
        }
    }, [])

    async function getDisputeFunc() {
        const slug = (await params).slug
        await getDispute(slug).then((res) => {
            setDispute(res.data);
        })
    }

    async function submitComment() {
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
        },(exception) => {
            toast({
                variant: "destructive",
                title: "Yorum Oluşturulamadı",
                description: "Tekrar deneyiniz",
              })
        })
    }


    return (
        <div className="w-full h-full">
        {dispute.id != "" ?  
        <div className='w-full h-full'>
            <a href="/sohbet">
                <MdOutlineKeyboardBackspace className="absolute left-2 top-2 size-10 cursor-pointer hover:scale-125 transition-all max-md:top-5 max-md:size-7 z-50" title="Anasayfa'ya Git" />
            </a>
        <div className='w-4/5 ml-[10%]'>
        <div className="mt-5 border-gray-200 border rounded p-2">
            <div className="flex justify-start">
                <Avatar className="w-7 h-7">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="relative bottom-[2px] ml-3 mr-3">
                    <div>
                        <span className="drop-shadow text-black text-sm">{dispute.user['username']}</span>
                    </div>
                    <div className="mr-5 max-sm:mr-1">
                        <span className="text-base max-sm:text-sm">{dispute.description}</span>
                    </div>
                    <div className="w-3/5 max-sm:w-full">
                        <a className="page-card w-full" href={"/kategori/spor/goztepetrabzonspor-maci-oncesi-son-dakika-37"}>
                            <Card className="mt-3 shadow-xl hover:shadow-2xl hover:shadow-gray-400 transition-all relative w-full">
                                <div className="circle1 absolute bottom-0 m-auto flex justify-center items-center">
                                    <span className="drop-shadow-xl font-medium text-black hidden line-clamp-1 ml-5 mr-5" dangerouslySetInnerHTML={{ __html: dispute.whisper['title'] }}>
                                    </span>
                                </div>
                                <CardContent className="p-0">
                                    <div className="flex w-full h-full">
                                        <div className="w-full h-full absolute z-0 rounded-lg">
                                            <img src={dispute.whisper["imageURL"]} className="rounded-lg h-full w-full object-cover"/>
                                        </div>
                                        <div className="absolute z-10 w-full h-full rounded-lg" style={{backgroundColor: "rgba(0,0,0,.5)"}}>
                                        </div>
                                        <div className="flex flex-col w-full p-1 z-20">
                                            <span className="text-white drop-shadow-xl text-xs font-medium">{dispute.whisper["category"]}</span>
                                            <span className="text-xl text-slate-100 drop-shadow mt-2 font-medium line-clamp-1 max-sm:text-sm max-md:text-lg ">
                                                {dispute.whisper['title']}
                                            </span>
                                            <div className="p-0 mt-1 mb-1 ml-0">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center text-slate-100">
                                                        <TbWriting className="size-3 mr-2"/>
                                                        <span className="text-xs drop-shadow-lg pt-1 pb-1">{dispute.whisper["authorName"]}</span>
                                                    </div>
                                                    <div className="flex mt-1 items-center text-slate-100">
                                                        <GrResources className="size-3 mr-2"/>
                                                        <span className="text-xs drop-shadow-lg">{dispute.whisper["source"]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                    </div>
                    <div className='mt-3'>
                        <span className="text-gray-400 ml-1 text-sm">11.36 PM</span>
                        <span className="text-gray-400 ml-2 text-base">·</span>
                        <span className="text-gray-400 ml-2 text-sm">Oct 01</span>
                        <span className="text-gray-400 ml-2 text-base">·</span>
                        <span className="text-gray-400 ml-2 text-sm"><span className='font-medium text-gray-600'>2.8M</span> Views</span>
                    </div>
                    <div className="flex mt-3 justify-around">
                            <span className='flex items-center'>
                                <SlLike  className="size-7 cursor-pointer hover:scale-110 transition-all hover:text-green-400"/>
                                <span className='font-medium ml-1 mt-2'>20</span>
                            </span>
                            <span className='flex items-center'>
                                <SlDislike  className="size-7 cursor-pointer hover:scale-110 transition-all hover:text-red-400"/>
                                <span className='font-medium ml-1 mt-2'>20</span>
                            </span>
                            <span className='flex items-center'>
                                <VscCommentDiscussion className='size-7'/>
                                <span className='font-medium ml-1'>20</span>
                            </span>
                    </div>
                    <div className={isLogin ? 'mt-10 flex' : 'hidden'}>
                        <Avatar className="w-7 h-7">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Textarea className='ml-2 w-4/5' onChange={(e) => setComment(e.target.value.toString())}></Textarea>
                        <div className='flex items-center ml-5'>
                            <Button className='bg-gray-400' onClick={() => submitComment()}>Gönder</Button>
                        </div>
                    </div>
                    <div className='mt-10'>
                    {dispute.disputeComments.map((obj , index) => (
                        <div className='flex mt-3' key={"obj"+index}>
                            <div className='flex'>
                                <Avatar className="w-7 h-7">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col ml-2'>
                                    <div>
                                    <span className="drop-shadow text-black text-sm">user</span>
                                    <span className="text-gray-400 ml-2 text-base">·</span>
                                    <span className="text-gray-400 ml-2 text-sm">Oct 01</span>
                                    </div>
                                    <span className='mt-1'>{obj['comment']}</span>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div>
                            
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        : 
        <div role="status" className="mr-10 flex justify-center h-[500px] items-center">
            <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
        }
        </div>
    )
}