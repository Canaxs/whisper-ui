"use client";

import { getWhispersFilter } from '@/api/apiCalls';
import FooterArea from '@/components/Footer-Area/FooterArea';
import Header from '@/components/Header/Header';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import SearchCompo from '@/components/Search-Comp/Search-Compo';


export default function SearchAll() {

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
    }, [searchParams])

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


    return (
        <div>
            <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
                <Header flag={"../../siyah-flag.png"} logo={"../../logo-black.png"} /> 
                <SearchCompo p={searchParams.get("p")}  t={searchParams.get("t")} notData={notData} filterData={filterData} {...filterData} />
            </div>
            <FooterArea src={"../../logo-white.png"}/>
        </div>
    )
}