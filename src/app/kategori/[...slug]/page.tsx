"use client";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import HovCard from "@/components/Hov-Card/HovCard";
import WhisperContent from "@/components/Whisper-Content/WhisperContent";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { describe } from "node:test";
import { useEffect, useState } from "react";
import { getWhisper , getPageableWhispers } from "@/api/apiCalls";
import { useRouter,useSearchParams } from 'next/navigation'
import { convertMenus, convertMenusTR } from "@/lib/menuEnum";
import { GrResources } from "react-icons/gr";
import { TbWriting } from "react-icons/tb";
import { BiLike , BiDislike } from "react-icons/bi";
import { TbUserStar } from "react-icons/tb";


export default function Docs({
    params,
}: {
    params: {
        slug: string[];
    };
}) {

    const [whisper,setWhisper] = useState({
        authorName: null,
        title: null,
        description: null,
        source: null,
        category: null,
        urlName: null,
        imageURL: null,
        createdDate: null,
        whisperLike: {
            id: null,
            numberLike: null,
            numberDislike: null
        },
        whisperComment : []
     });

     const [whispers,setWhispers] = useState({
        content: [],
        last: false,
        empty: false,
        first: false,
        number: 0,
        numberOfElements: 0,
        pageable: {},
        size: 0,
        sort: {},
        totalElements: 0,
        totalPages: 0
    });

     const router = useRouter();
     const searchParams = useSearchParams()


    useEffect(() => {
        if(params.slug.length === 1) { 
            pageSearch();
        }
        else {
            getWhisper(params.slug[1]).then((res) => {
                if(res.data.category === convertMenusTR(params.slug[0])) {
                    setWhisper(res.data);
                }
                else {
                    router.push("/404");
                }
            },(exception) => {
                router.push("/404");
            })
        }
    },[])

    function numberNext() {
        let num = searchParams.get("s");
        if(isNumber(num)) {
            return JSON.parse(num!) + 1;
        }
    }

    function numberBack() {
        let num = searchParams.get("s");
        if(isNumber(num)) {
            return JSON.parse(num!) - 1;
        }
    }

    function numberRet() {
        let num = searchParams.get("s");
        if(isNumber(num)) {
            return JSON.parse(num!);
        }
    }

    function isNumber(value) {
        return !isNaN(value);
    }


    async function pageSearch() {
        if(searchParams.get("s") != null) {
            const searchParamsPage = searchParams.get("s");
            const categoryName = params.slug[0];
            const response = await getPageableWhispers(convertMenus(categoryName),searchParamsPage);
            setWhispers(response.data);
        }
        else {
            const categoryName = params.slug[0];
            const response = await getPageableWhispers(convertMenus(categoryName),0);
            setWhispers(response.data);
        }

    }

    if(params.slug.length === 1) {
       return( 
        <div>
            <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
                <Header flag={"../../siyah-flag.png"} logo={"../../logo-black.png"} />
                <div className="mt-10 ml-[10%] mr-[10%] mb-4">
                { whispers.content.length != 0 ? whispers.content?.map((content,index) =>
                <a className="page-card" href={"/kategori/"+params.slug[0]+"/"+content["urlName"]} key={index}>
                    <Card className="mt-3 shadow-xl hover:shadow-2xl hover:shadow-black transition-all relative">
                        <div className="circle1 absolute bottom-0 m-auto flex justify-center items-center">
                            <span className="drop-shadow-xl font-medium text-black hidden line-clamp-2 ml-5 mr-5" dangerouslySetInnerHTML={{ __html: content['description'] }}>
                            </span>
                        </div>
                        <CardContent className="p-0">
                            <div className="flex w-full h-full">
                                <div className="w-full h-full absolute z-0 rounded-lg">
                                    <img src={content['imageURL'] ? content['imageURL'] :"../../logo-black.png"} className="rounded-lg h-full w-full object-cover"/>
                                </div>
                                <div className="absolute z-10 w-full h-full rounded-lg" style={{backgroundColor: "rgba(0,0,0,.3)"}}>

                                </div>
                                <div className="flex flex-col pt-7 pl-7 w-full p-6 z-20">
                                    <span className="text-white drop-shadow-xl text-xs font-medium">{params.slug[0].toUpperCase()}</span>
                                    <span className="text-3xl text-slate-100 drop-shadow mt-2 font-medium line-clamp-1 max-md:line-clamp-2 max-sm:text-sm max-md:text-lg max-lg:text-xl max-xl:text-2xl">
                                        {content["title"]}
                                    </span>
                                    <div className="p-0 mt-3 mb-3 ml-0">
                                        <div className="flex flex-col">
                                            <div className="flex items-center text-slate-100">
                                                <TbWriting className="size-5 mr-2"/>
                                                <span className="text-xs drop-shadow-lg pt-2 pb-1">{content["authorName"]}</span>
                                            </div>
                                            <div className="flex mt-1 items-center text-slate-100">
                                                <GrResources className="size-5 mr-2"/>
                                                <span className="text-xs drop-shadow-lg">{content["source"]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    </a>
                ): 
                <div role="status" className="mr-10 flex justify-center h-[500px] items-center">
                        <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                </div>
                }
                    <div className="mt-10">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    {searchParams.get("s") == null || numberRet() <= 0 ? <PaginationPrevious className="opacity-20 cursor-no-drop"/>
                                    : <PaginationPrevious href={"/kategori/"+params.slug[0]+"?s="+ numberBack() } />
                                    }
                                </PaginationItem>
                                <PaginationItem>
                                        {searchParams.get("s") == null || numberRet() == 0 ? ""  
                                        : <PaginationLink className='cursor-pointer m-1'  href={"/kategori/"+params.slug[0]+"?s="+ numberBack()} >{numberRet()}</PaginationLink> }
                                        <PaginationLink isActive>{searchParams.get("s") == null ? 1 : numberNext()}</PaginationLink>
                                        {numberRet() < whispers.totalPages-1 ? <PaginationLink className='cursor-pointer m-1'  href={"/kategori/"+params.slug[0]+"?s="+numberNext()} >{numberNext()+1}</PaginationLink> 
                                        : "" }
                                    </PaginationItem>
                                <PaginationItem>
                                    {numberRet() < whispers.totalPages-1 ? <PaginationNext href={"/kategori/"+params.slug[0]+"?s="+numberNext()} /> 
                                    : <PaginationNext className="opacity-20 cursor-no-drop" /> 
                                    }
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
                
            </div>
            <FooterArea src={"../../logo-white.png"}/>
        </div>
       )
    }

    return (
        <div>
            <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
                <Header flag={"../../siyah-flag.png"} logo={"../../logo-black.png"} />
                {whisper.authorName != null ? <WhisperContent whisper={whisper} categoryName={convertMenusTR(params.slug[0])} /> 
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
            <FooterArea src={"../../logo-white.png"}/>
        </div>
    )
}