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
  const [whisperCount , setWhisperCount] = useState(12);
  const [currentPage , setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  /*useEffect(() => {
      const width = window.innerWidth;
      
      if (width >= 1024) {
        setWhisperCount(12);
      } else if (width >= 768) {
        setWhisperCount(9);
      } else if (width >= 640) {
        setWhisperCount(8);
      } else {
        setWhisperCount(6);
      }
  },[width]);
  */

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getBestWhispers(currentPage,whisperCount);
  }, [whisperCount]);

  async function getBestWhispers(page,size) {
    await getBestUserPoint(page,size)
      .then((res) => {
        if(page === 0) {
          setWhispers(res.data.content);
          setIsLoading(false);
        }
        else {
          setWhispers(prevWhispers => [...prevWhispers, ...res.data.content]);
          setIsLoadingMore(false);
        }
      })
      .finally(() => {
        console.log("Whispers Completed");
      });
  }

  async function loadMoreWhispers() {
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await getBestWhispers(nextPage,whisperCount);
  }

  function convertCategoryName(str) {
    str = str[0].toUpperCase() + str.slice(1);
    return str;
  }

  return (
    <MainLayout>
      <div className="flex-1">
        <div className="grid grid-cols-1 xl:grid-cols-10">
          <div className="xl:col-span-8">
            <CarouselOne bigClass="h-[500px] max-md:h-[300px] max-sm:h-[250px]" smallClass="h-[50px]" />
            <div className="mr-2 mb-2 ml-2 mt-12">
              <div className="flex items-center gap-4 mb-8 max-sm:mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800 max-sm:text-xl">
                  Öne Çıkan İçerikler
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>
              <div className="flex flex-wrap justify-center">
                {!isLoading && whispers.length > 0 ? whispers.map((obj, index) => (
                  <div
                    className="w-[24%] min-w-[170px] ml-[1%] mt-3 max-lg:w-[32%] max-md:w-[49%] max-sm:w-full max-sm:min-w-[90vw] max-sm:ml-0 animate-fade-in"
                    key={"index" + index}
                    style={{
                      animationDelay: `${(index % 12) * 0.1}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
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
                ))
                :
                <div className="flex flex-col items-center justify-center py-8">
                  <svg className="animate-spin h-12 w-12 text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <span className="text-gray-500 text-sm">Yükleniyor...</span>
                </div>
              }
              </div>
              
              {/* Loading More Indicator */}
              {isLoadingMore && (
                <div className="mt-8 max-sm:mt-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span className="text-gray-500 text-sm">Yeni haberler yükleniyor...</span>
                  </div>
                </div>
              )}
              
              {whispers.length > 0 && whispers.length <= 36 && !isLoadingMore &&
              <div className="mt-8 max-sm:mt-6 text-center">
                <Button 
                  onClick={loadMoreWhispers} 
                  disabled={isLoadingMore}
                  className="relative overflow-hidden bg-gray-900 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg group hover:text-gray-900 border-0 focus:border-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">Daha Fazla Haber</span>
                  <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                </Button>
              </div>
              }
            </div>
          </div>
          <div className="space-y-2 xl:col-span-2 bg-[#F5F5F5] min-h-screen">
            <Categories />
            <RightSidebarTalks />
            <Authors />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          opacity: 0;
        }
      `}</style>
    </MainLayout>
  );
}
