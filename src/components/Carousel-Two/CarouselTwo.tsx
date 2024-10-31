import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import React, { useState, useEffect } from "react";
import { Whisper } from "../Account-Info/AccountInfo";
import { getCarouselSmall } from "@/api/apiCalls";
import { convertMenusEn } from "@/lib/menuEnum";
import Autoplay from "embla-carousel-autoplay"

export default function CarouselTwo(props) {

    const [ whispers, setWhispers] = useState<Whisper[]>([]);

    useEffect(() => {
        getCarousel();
    }, [])

    async function getCarousel() {
        await getCarouselSmall().then((res) => {
            setWhispers(res.data)
        })
    }


    return(
        <div>
            {whispers.length != 0 ? 
            <React.Fragment>
                <Carousel className={props.bigClass+" drop-shadow-xl"}  plugins={[Autoplay({delay: 4000, }),]}>
                    <CarouselContent className={props.bigClass}>
                    {whispers.map((obj, index) => (
                            <CarouselItem className={props.bigClass} key={index} >
                                <div className={props.bigClass}>
                                    <Card className={props.bigClass}>
                                        <CardContent className={"flex items-center justify-center w-full p-0 "+props.bigClass}>
                                            <div className="w-full h-full rounded-md z-10">
                                                <img src={obj.imageURL ? obj.imageURL : "../logo-black.png"} className="w-full h-full rounded-md object-cover" />
                                            </div>
                                            <div className="absolute bottom-10 w-5/6 text-center line-clamp-2 p-2 rounded z-30" style={{backgroundColor : "rgba(0,0,0,.5)"}}>
                                                <span className="drop-shadow text-base font-medium text-white">{obj.title}</span>
                                            </div>
                                            <a href={"/kategori/"+convertMenusEn(obj.category)+"/"+obj.urlName} className="absolute w-full h-full rounded-md z-20">
                                                <div className="w-full h-full rounded-md" style={{backgroundColor : "rgba(0,0,0,.3)"}}>
                                                </div>
                                            </a>
                                        </CardContent>
                                        </Card>
                                </div>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-3 drop-shadow-lg"/>
                        <CarouselNext  className="right-3 drop-shadow-lg"/>
                </Carousel>
                <Carousel className={"mt-2 drop-shadow-lg "+props.smallClass}>
                    <CarouselContent className={"flex ml-0 "+props.smallClass}>
                    {whispers.map((obj, index) => (
                        <CarouselItem className={"pl-0 basis-[10%] ml-[1%] cursor-pointer h-full"} key={index}>
                            <div className={props.smallClass}>
                                <Card className={props.smallClass}>
                                <CardContent className={"flex items-center justify-center h-full p-0 relative"}>
                                    <div className="absolute w-full h-full rounded-md z-10">
                                        <img src={obj.imageURL ? obj.imageURL :"../logo-black.png"} className="w-full h-full rounded-md object-cover"/>
                                    </div>
                                    <a href={"/kategori/"+convertMenusEn(obj.category)+"/"+obj.urlName} className="absolute w-full h-full rounded-md z-20 flex justify-center items-center" style={{backgroundColor : "rgba(0,0,0,.3)"}}>
                                        <p className="z-30 text-white text-base">{index+1}</p>
                                    </a>
                                </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </React.Fragment>
            :
                <div role="status" className={"mr-10 flex justify-center items-center h-[300px]"}>
                    <svg aria-hidden="true" className="w-20 h-20 text-white animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </div>
    )
}