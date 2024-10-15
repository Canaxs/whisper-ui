"use client";
import { getBestUserPoint } from "@/api/apiCalls";
import AbsoluteAdversiting from "@/components/Advertising-Space/AbsoluteAdversiting";
import Adversiting from "@/components/Advertising-Space/Advertising";
import ContentCarousel from "@/components/Content/ContentCarousel";
import FooterArea from "@/components/Footer-Area/FooterArea";
import HeaderTop from "@/components/Header-Top/Header-Top";
import Header from "@/components/Header/Header";
import Navigation from "@/components/Navigation-Menu/Navigation";
import NewsCard from "@/components/News-Card/NewsCard";
import { convertMenusEn } from "@/lib/menuEnum";
import { Head } from "next/document";
import React, { useState, useEffect } from "react";


export type Whisper = {
    authorName: string
    title: string
    description: string
    source: string
    category: string
    urlName: string
    image: string
    date: number
}

export default function Home() { 

    const [width, setWidth] = useState(0);
    const [ whispers, setWhispers] = useState<Whisper[]>([]);
    const [ care , setCare] = useState(true);


    const handleWindowResize = () => {
        setWidth(window.innerWidth);
      }

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [width]);

    useEffect(() => {
        onCare()
        getBestWhispers()
    }, [])

    function advertisingBoolean(indexNum: number) {
        indexNum++;
            if(width <= 1024 && width > 768) {
                if(indexNum % 6 === 0) {
                    return false
                }
            }
            else if (width > 1024) {
                if(indexNum % 8 === 0) {
                    return false
                }
            }
            else if (width <= 768) {
                if(indexNum % 10 === 0) {
                    return false
                }
            }
        return true
    }

    async function getBestWhispers() {
       await getBestUserPoint().then((res) => {
            setWhispers(res.data);
       }).finally(() => {
        console.log("Whispers Completed");
       })
    }

    function convertCategoryName(str) {
        str = str[0].toUpperCase() + str.slice(1);
        return str;
    }

    function onCare() {
        if(!care){
            return (
                <div className="w-full h-full">
                    <div className="flex justify-center items-center h-full flex-col bg-gradient-to-r from-white to-gray-200"> 
                        <a href="/"><img src="../logo-black.png" width={"100px"} height={"100px"} alt="Söylenti" /></a>
                        <p className="font-medium mb-5 mt-2 text-sm text-slate-600 drop-shadow-lg">Söylenti - Bir Haber Sitesinden Çok Daha Fazlası</p>
                        <h4 className="font-medium mb-5 mt-2 text-xl text-slate-600 drop-shadow-lg">Yakında ...</h4>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
        <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
            <Header flag={"siyah-flag.png"} logo={"logo-black.png"} />
            <ContentCarousel />
            <div className="mt-8 flex flex-wrap">
                {whispers.map((obj, index) => advertisingBoolean(index) ?  
                    <div className="w-[24%] ml-[1%] mt-3 max-lg:w-[32%] max-md:w-[49%] max-sm:w-[46%] max-sm:ml-[2%]" key={"index"+index}>
                        <a href={"kategori/"+convertMenusEn(obj.category)+"/"+obj.urlName}>
                            <NewsCard title={obj.title} img="logo-black.png" name={obj.authorName} category={convertCategoryName(convertMenusEn(obj.category))} source={obj.source} />
                        </a>
                    </div>
                : 
                    <React.Fragment key={"reactFragmentKey"}>
                        <div className="w-[24%] ml-[1%] mt-3 max-lg:w-[32%] max-md:w-[49%] max-sm:w-[46%] max-sm:ml-[2%]">
                            <a href={"kategori/"+convertMenusEn(obj.category)+"/"+obj.urlName}>
                                <NewsCard title={obj.title} img="logo-black.png" keyNumber={index} name={obj.authorName} category={convertCategoryName(convertMenusEn(obj.category))} source={obj.source} />
                            </a>
                        </div>
                        <Adversiting oneClass="w-[98%] ml-[1%] h-[100px] mt-5 mb-2 rounded" />
                    </React.Fragment>
                )}
            </div>
            <div className={whispers.length == 0 ? "h-64" : "hidden"}></div>
            <Adversiting oneClass={"w-[98%] ml-[1%] h-[100px] mt-5 mb-2 rounded"}/>
            <AbsoluteAdversiting class="left"/>
            <AbsoluteAdversiting class="right"/>
        </div>
        <FooterArea src={"logo-white.png"}/>
        </div>
    )
}