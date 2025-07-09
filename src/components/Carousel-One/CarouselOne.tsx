"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { getCarouselBig } from "@/api/apiCalls";
import { convertMenusEn } from "@/lib/menuEnum";
import { Whisper } from "../Account-Info/AccountInfo";
import { CiClock2 } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { ThumbsUp } from "lucide-react";

interface CarouselOneProps {
  bigClass?: string;
  smallClass?: string;
}

export default function CarouselOne({
  bigClass = "",
  smallClass = "",
}: CarouselOneProps) {
  const [whispers, setWhispers] = useState<Whisper[]>([]);

  useEffect(() => {
    getCarouselBig()
      .then((res) => setWhispers(res.data))
      .catch(() => {
        setWhispers([]);
      });
  }, []);

  if (whispers.length === 0) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <svg
          aria-hidden="true"
          className="w-20 h-20 text-white animate-spin dark:text-gray-600 fill-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        {/* spinner paths */}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Big Carousel  */}
      <Carousel
        className={`${bigClass} shadow-[0_25px_50px_rgba(0,0,0,0.1)] shadow-gray-400`}
        plugins={[Autoplay({ delay: 1000000 })]}
      >
        <CarouselContent>
          {whispers.map((obj, index) => (
            <CarouselItem className={bigClass} key={index}>
              <Card
                className={`${bigClass} overflow-hidden gap-0 py-0 border-0 rounded-none`}
              >
                <CardContent className="relative p-0 w-full h-full">
                  <Image
                    src={obj.imageURL || "/logo-black.png"}
                    alt="Image"
                    fill
                    style={{ objectFit: "cover" }}
                    priority={index === 0}
                  />
                  <a
                    href={`/kategori/${convertMenusEn(obj.category)}/${
                      obj.urlName
                    }`}
                    className="absolute inset-0 z-20 "
                  >
                    <div className="w-full h-full bg-black/30"></div>
                  </a>
                  <div className="relative z-30 h-full flex flex-col justify-between text-gray-100">
                    <div className="h-full mt-10 ml-14 flex flex-col justify-around max-md:mt-6 max-md:ml-8 max-sm:mt-4 max-sm:ml-4">
                      <h1 className="max-sm:text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold mt-3 line-clamp-2 w-4/6 max-md:w-5/6">
                        {obj.title}
                      </h1>
                      <div className="relative bottom-10 max-md:bottom-3 max-sm:bottom-7">
                        <h2
                          className="max-sm:text-sm text-gray-300 sm:text-lg md:text-xl lg:text-2xl font-medium opacity-90 line-clamp-1 w-4/6 max-md:w-3/6"
                          dangerouslySetInnerHTML={{ __html: obj.description }}
                        ></h2>
                        {/* Okunma ve süre bilgileri üstte */}
                        <div className="flex items-center space-x-4 text-xs sm:text-sm opacity-75 mt-4 gap-8 max-md:gap-6 max-sm:gap-4 text-gray-300 ml-2 max-sm:ml-1">
                          <div className="flex items-center gap-1">
                            <IoEyeOutline className="w-5 h-5 lg:w-6 lg:h-6 max-sm:w-3 max-sm:h-3" />
                            <span className="max-sm:text-xs">Okunma 9.8k</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CiClock2 className="w-5 h-5 lg:w-6 lg:h-6 max-sm:w-4 max-sm:h-4" />
                            <span className="max-sm:text-xs">Süre 6 dk</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Username ve beğeni kutuları eski yerinde */}
                    <div className="flex">
                      <div
                        className="w-1/5 max-lg:w-1/3 h-32 border-gray-500 flex gap-2 justify-center items-center backdrop-blur-md max-sm:w-full max-sm:h-16 max-md:h-24"
                        style={{ boxShadow: "2px -2px 4px rgba(0,0,0,0.05)" }}
                      >
                        <CiUser
                          className="w-7 h-7 text-gray-100 max-sm:w-5 max-sm:h-5 max-md:w-6 max-md:h-6"
                          style={{
                            transform: "scale(1)",
                            opacity: 0.8,
                            filter: "brightness(0.8) contrast(0.8)",
                          }}
                        />
                        <span className="relative top-1 text-gray-300 max-sm:text-sm max-md:text-sm">
                          {obj.authorName}
                        </span>
                      </div>
                      <div
                        className="w-1/5 max-lg:w-1/3 h-32 border-gray-500  flex gap-2 justify-center items-center backdrop-blur-md max-sm:w-full max-sm:h-16 max-md:h-24"
                        style={{ boxShadow: "2px -2px 4px rgba(0,0,0,0.05)" }}
                      >
                        <ThumbsUp
                          className="w-7 h-7 text-gray-100 max-sm:w-5 max-sm:h-5 max-md:w-6 max-md:h-6"
                          style={{
                            transform: "scale(1)",
                            opacity: 0.8,
                            filter: "brightness(0.8) contrast(0.8)",
                          }}
                        />
                        <span className="relative top-1 text-gray-300 max-sm:text-sm max-md:text-sm">
                          120
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 drop-shadow-lg max-sm:left-2 max-sm:w-8 max-sm:h-8" />
        <CarouselNext className="right-3 drop-shadow-lg max-sm:right-2 max-sm:w-8 max-sm:h-8" />
      </Carousel>

      {/* Small Carousel 
      <Carousel className={`mt-2 drop-shadow-lg ${smallClass}`}>
        <CarouselContent className="flex ml-0">
          {whispers.map((obj, index) => (
            <CarouselItem className={`basis-[10%] ml-[1%] cursor-pointer ${smallClass}`} key={index}>
              <Card className={smallClass}>
                <CardContent className="relative p-0 h-full">
                  <Image
                    src={obj.imageURL || "/logo-black.png"}
                    alt="Image"
                    fill
                    className="rounded-md"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <a
                    href={`/kategori/${convertMenusEn(obj.category)}/${obj.urlName}`}
                    className="absolute inset-0 z-20 flex justify-center items-center bg-black/30 rounded-md"
                  >
                    <p className="z-30 text-white text-base">{index + 1}</p>
                  </a>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      */}
    </div>
  );
}
