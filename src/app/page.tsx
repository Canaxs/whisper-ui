"use client";
import { getBestUserPoint } from "@/api/apiCalls";
import AbsoluteAdversiting from "@/components/Advertising-Space/AbsoluteAdversiting";
import Adversiting from "@/components/Advertising-Space/Advertising";
import CarouselOne from "@/components/Carousel-One/CarouselOne";
import ContentCarousel from "@/components/Content/ContentCarousel";
import FlipCard from "@/components/Flip-Card/FlipCard";
import FooterArea from "@/components/Footer-Area/FooterArea";
import HeaderTop from "@/components/Header-Top/Header-Top";
import Header from "@/components/Header/Header";
import Navigation from "@/components/Navigation-Menu/Navigation";
import NewsCard from "@/components/News-Card/NewsCard";
import ToggleMenu from "@/components/ToggleMenu/ToggleMenu";
import { Button } from "@/components/ui/button";
import Authors from "@/components/v2/Authors/Authors";
import Categories from "@/components/v2/Categories/Categories";
import HeaderV2 from "@/components/v2/HeaderV2/HeaderV2";
import MainLayout from "@/components/v2/MainLayout/MainLayout";
import { MobileHeader } from "@/components/v2/Mobile-Header/MobileHeader";
import { MobileMenu } from "@/components/v2/Mobile-Menu/MobileMenu";
import RightSidebarTalks from "@/components/v2/RightSidebarTalks/RightSidebarTalks";
import Sidebar from "@/components/v2/Sidebar/Sidebar";
import { convertMenusEn } from "@/lib/menuEnum";
import { Menu, X } from "lucide-react";
import { Head } from "next/document";
import React, { useState, useEffect } from "react";

export type Whisper = {
  authorName: string;
  title: string;
  description: string;
  source: string;
  category: string;
  urlName: string;
  imageURL: string;
  date: number;
};

export default function Home() {
  const [width, setWidth] = useState(0);
  const [whispers, setWhispers] = useState<Whisper[]>([]);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  useEffect(() => {
    getBestWhispers();
  }, []);

  async function getBestWhispers() {
    await getBestUserPoint()
      .then((res) => {
        setWhispers(res.data);
      })
      .finally(() => {
        console.log("Whispers Completed");
      });
  }

  function convertCategoryName(str) {
    str = str[0].toUpperCase() + str.slice(1);
    return str;
  }

  /* return (
        <div>
        <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
            <Header flag={"siyah-flag.png"} logo={"logo-black.png"} />
            <ContentCarousel />
            <div className="mt-8 flex flex-wrap">
                {whispers.map((obj, index) => advertisingBoolean(index) ?  
                    <div className="w-[24%] ml-[1%] mt-3 max-lg:w-[32%] max-md:w-[49%] max-sm:w-[46%] max-sm:ml-[2%]" key={"index"+index}>
                        <a href={"kategori/"+convertMenusEn(obj.category)+"/"+obj.urlName}>
                            <FlipCard title={obj.title} imageURL={obj.imageURL} keyNumber={index} name={obj.authorName} category={convertCategoryName(convertMenusEn(obj.category))} source={obj.source} 
                            description={obj.description} />
                        </a>
                    </div>
                : 
                    <React.Fragment key={"reactFragmentKey"}>
                        <div className="w-[24%] ml-[1%] mt-3 max-lg:w-[32%] max-md:w-[49%] max-sm:w-[46%] max-sm:ml-[2%]">
                            <a href={"kategori/"+convertMenusEn(obj.category)+"/"+obj.urlName}>
                            <FlipCard title={obj.title} imageURL={obj.imageURL} keyNumber={index} name={obj.authorName} category={convertCategoryName(convertMenusEn(obj.category))} source={obj.source} 
                            description={obj.description} />
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
<div className="flex-1">
                <div className="grid grid-cols-1 xl:grid-cols-10">
                  Left Content 
                  <div className="xl:col-span-8"> </div>
                  <div className="space-y-2 xl:col-span-2 bg-[#F5F5F5] min-h-screen">
                    <Categories />
                    <RightSidebarTalks />
                    <Authors />
                  </div>
                </div>
              </div>
    
        */

  return (
    <MainLayout>
      <div className="flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-10">
          <div className="xl:col-span-8">
            <CarouselOne bigClass="h-[500px]" smallClass="h-[50px]" />
            <div className="mr-2 mb-2 ml-2 mt-12">
              <h3 className="text-3xl font-bold text-neutral-600 drop-shadow-md backdrop-blur-sm px-4 py-2 w-fit ml-[1%] mb-6 max-sm:ml-[2%]">
                Güncel Haberler
              </h3>
              <div className="flex flex-wrap justify-center">
                {whispers.map((obj, index) => (
                  <div
                    className="w-[24%] min-w-[170px] ml-[1%] mt-3 max-lg:w-[32%] max-md:w-[49%] max-sm:w-full max-sm:min-w-[90vw] max-sm:ml-0"
                    key={"index" + index}
                  >
                    <a
                      href={
                        "kategori/" +
                        convertMenusEn(obj.category) +
                        "/" +
                        obj.urlName
                      }
                    >
                      <FlipCard
                        title={obj.title}
                        imageURL={obj.imageURL}
                        name={obj.authorName}
                        category={convertCategoryName(
                          convertMenusEn(obj.category)
                        )}
                        source={obj.source}
                        description={obj.description}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2 xl:col-span-2 bg-[#F5F5F5] max-xl:bg-white min-h-screen">
            <Categories />
            <RightSidebarTalks />
            <Authors />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
