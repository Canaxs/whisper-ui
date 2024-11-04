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
import { getDispute } from '@/api/apiCalls';


export default function SoylesiPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    const [dispute , setDispute] = useState({});

    useEffect(() => {
        getDisputeFunc();
    }, [])

    async function getDisputeFunc() {
        const slug = (await params).slug
        await getDispute(slug).then((res) => {
            setDispute(res.data);
        })
    }


    return (
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
                        <span className="drop-shadow text-black text-sm">{dispute['user']['username']}</span>
                    </div>
                    <div className="mr-5 max-sm:mr-1">
                        <span className="text-base max-sm:text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati laboriosam et at quibusdam accusamus commodi deleniti 
                        temporibus dicta qui omnis totam odio perferendis doloribus, itaque autem nostrum quaerat numquam repudiandae!</span>
                    </div>
                    <div className="w-3/5 max-sm:w-full">
                        <a className="page-card w-full" href={"/kategori/spor/goztepetrabzonspor-maci-oncesi-son-dakika-37"}>
                            <Card className="mt-3 shadow-xl hover:shadow-2xl hover:shadow-gray-400 transition-all relative w-full">
                                <div className="circle1 absolute bottom-0 m-auto flex justify-center items-center">
                                    <span className="drop-shadow-xl font-medium text-black hidden line-clamp-1 ml-5 mr-5" dangerouslySetInnerHTML={{ __html: dispute['description'] }}>
                                    </span>
                                </div>
                                <CardContent className="p-0">
                                    <div className="flex w-full h-full">
                                        <div className="w-full h-full absolute z-0 rounded-lg">
                                            <img src={dispute["whisper"]["imageURL"]} className="rounded-lg h-full w-full object-cover"/>
                                        </div>
                                        <div className="absolute z-10 w-full h-full rounded-lg" style={{backgroundColor: "rgba(0,0,0,.5)"}}>
                                        </div>
                                        <div className="flex flex-col w-full p-1 z-20">
                                            <span className="text-white drop-shadow-xl text-xs font-medium">{dispute["whisper"]["category"]}</span>
                                            <span className="text-xl text-slate-100 drop-shadow mt-2 font-medium line-clamp-1 max-sm:text-sm max-md:text-lg ">
                                                {dispute["whisper"]["title"]}
                                            </span>
                                            <div className="p-0 mt-1 mb-1 ml-0">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center text-slate-100">
                                                        <TbWriting className="size-3 mr-2"/>
                                                        <span className="text-xs drop-shadow-lg pt-1 pb-1">{dispute["whisper"]["authorName"]}</span>
                                                    </div>
                                                    <div className="flex mt-1 items-center text-slate-100">
                                                        <GrResources className="size-3 mr-2"/>
                                                        <span className="text-xs drop-shadow-lg">{dispute["whisper"]["source"]}</span>
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
                            <span className='flex'>
                                <SlLike  className="size-7 cursor-pointer hover:scale-110 transition-all hover:text-green-400"/>
                                <span className='font-medium ml-1'>20</span>
                            </span>
                            <span className='flex'>
                                <SlDislike  className="size-7 cursor-pointer hover:scale-110 transition-all hover:text-red-400"/>
                                <span className='font-medium ml-1'>20</span>
                            </span>
                            <span className='flex'>
                                <VscCommentDiscussion className='size-7'/>
                                <span className='font-medium ml-1'>20</span>
                            </span>
                    </div>
                    <div className='mt-10 flex'>
                        <Avatar className="w-7 h-7">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Textarea className='ml-2 w-4/5'></Textarea>
                        <div className='flex items-center ml-5'>
                            <Button className='bg-gray-400'>Gönder</Button>
                        </div>
                    </div>
                    <div className='mt-10'>
                    {Array.from({ length: 20 }).map((obj , index) => 
                        <div className='flex mt-3' key={"obj"+index}>
                            <div className='flex'>
                                <Avatar className="w-7 h-7">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col ml-2'>
                                    <div>
                                    <span className="drop-shadow text-black text-sm">meric</span>
                                    <span className="text-gray-400 ml-2 text-base">·</span>
                                    <span className="text-gray-400 ml-2 text-sm">Oct 01</span>
                                    </div>
                                    <span className='mt-1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt voluptatibus id laboriosam expedita, 
                                    et suscipit est corporis reprehenderit fuga sequi aliquid officia aperiam sunt sed tempore nulla voluptates. Suscipit, laboriosam?</span>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div>
                            
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}