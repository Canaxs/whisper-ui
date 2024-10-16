"use client";

import { getWhispersFilter } from '@/api/apiCalls';
import FooterArea from '@/components/Footer-Area/FooterArea';
import Header from '@/components/Header/Header';
import HovCard from '@/components/Hov-Card/HovCard';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useRouter,useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { GrResources } from 'react-icons/gr';
import { TbWriting } from 'react-icons/tb';
import { LiaTimesCircleSolid } from "react-icons/lia";
import { convertMenusEn } from '@/lib/menuEnum';


export default function SearchPage() {

    const [filterData , setFilterData] = useState({
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

    const [notData , setNotData] = useState(false);


    const searchParams = useSearchParams();

    useEffect(() => {
        getFilterData();
    }, [])

    async function getFilterData() {
        let page = 0;
        const whisperFilter = {
            title: searchParams.get("t")
        }
        await getWhispersFilter(whisperFilter,page).then((res) => {
            setFilterData(res.data)
            if(res.data['content'].length === 0) {
                setNotData(true);
            }
        }, (exception) => {
            setNotData(true);
        })
    }

    function numberNext() {
        let num = searchParams.get("p");
        if(isNumber(num)) {
            return JSON.parse(num!) + 1;
        }
    }
    function numberBack() {
        let num = searchParams.get("p");
        if(isNumber(num)) {
            return JSON.parse(num!) - 1;
        }
    }
    function numberRet() {
        let num = searchParams.get("p");
        if(isNumber(num)) {
            return JSON.parse(num!);
        }
    }
    function isNumber(value) {
        return !isNaN(value);
    }

    return (
        <div>
            <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
                <Header flag={"../../siyah-flag.png"} logo={"../../logo-black.png"} />
                <div className="mt-10 ml-[10%] mr-[10%] mb-4">
                    { filterData.content.length != 0 ? filterData.content.map((obj, index) => 
                            <a href={"/kategori/"+convertMenusEn(obj['category'])+"/"+obj["urlName"]} key={index}>
                                <Card className="mt-3 shadow-xl">
                                    <CardContent className="p-3">
                                        <div className="flex">
                                            <div className="flex items-center">
                                                <img src="../../logo-black.png" width={"200"} height={"200"} />
                                            </div>
                                            <div className="flex flex-col pt-7 pl-7">
                                                <span className="text-gray-400 text-xs font-medium">{obj['category']}</span>
                                                <span className="text-3xl mt-2 font-medium line-clamp-1 max-md:line-clamp-2 max-sm:text-sm max-md:text-lg max-lg:text-xl max-xl:text-2xl">{obj["title"]}</span>
                                                <div className="p-0 mt-3 mb-3 ml-0">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center">
                                                            <TbWriting className="size-5 mr-2"/>
                                                            <HovCard name={obj["authorName"]} />
                                                        </div>
                                                        <div className="flex mt-1 items-center">
                                                            <GrResources className="size-5 mr-2"/>
                                                            <span className="text-xs drop-shadow-lg">{obj["source"]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </a>
                        )
                    : !notData ? 
                        <div role="status" className="mr-10 flex justify-center h-[500px] items-center">
                            <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    :
                        <div className="h-[500px] flex justify-center items-center z-30 w-full">
                            <LiaTimesCircleSolid className='size-20 text-red-700'/>
                            <span className="text-center p-5 text-gray-700 text-3xl font-medium drop-shadow-md">Haber bulunamadı</span>
                        </div>
                    }
                    <div className={notData ? "hidden":"mt-10"}>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {  <PaginationPrevious href={searchParams.get("p") == null || numberRet() <= 0 ? "" :"/search?t="+searchParams.get("t")+"&p="+ numberBack() } className={searchParams.get("p") == null || numberRet() <= 0 ? "opacity-20 cursor-default" : ""} />}
                            </PaginationItem>
                            <PaginationItem>
                                    <PaginationLink>{searchParams.get("p") == null ? 1 : numberNext()}</PaginationLink>
                                </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href={numberRet() >= filterData.totalPages-1 ? "" : "/search?t="+searchParams.get("t")+"&p="+numberNext()} className={numberRet() >= filterData.totalPages-1 ? "opacity-20 cursor-default" : ""} />
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