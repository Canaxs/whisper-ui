"use client";
import AbsoluteAdversiting from "@/components/Advertising-Space/AbsoluteAdversiting";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { usePathname } from 'next/navigation';

import { getUser, getUserWhispersCalls } from "@/api/apiCalls";
import { useEffect, useState } from "react";
import NewsCard from "@/components/News-Card/NewsCard";
import { FiUser } from "react-icons/fi";
import { GiNorthStarShuriken } from "react-icons/gi";
import { LuUserCog } from "react-icons/lu";



export type UserDto = {
    username: string
    userPoint: number,
    authorities: []
}

export type Whisper = {
    authorName: string
    title: string
    description: string
    source: string
    category: string
    urlName: string
    image: string
    createdDate: string
}

export default function UserPage() {  

    const pathname = usePathname();

    const [userDto , setUserDto] = useState<UserDto>();

    const [whispers , setWhispers] = useState<Whisper[]>([]);


    useEffect(() => {
        getUserPage();
        getUserWhispers();
    }, [])

    async function getUserPage() {
        await getUser(pathname.substring(6)).then((res) => {
            setUserDto(res.data);
        },(exception) => {

        })
    }

    async function getUserWhispers() {
        await getUserWhispersCalls(pathname.substring(6)).then((res) => {
            setWhispers(res.data)
        })
    }


    return (
        <div>
            <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
                <Header flag={"../../siyah-flag.png"} logo={"../../logo-black.png"} />
                <div className="mt-10 ml-3">
                    <div className="flex ml-4">
                        <div>
                            <Avatar className="h-40 w-40">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="ml-5 flex flex-col mt-5">
                            <div className="flex items-center">
                                <FiUser className="size-7 mr-4" title="Kullanıcı Adı"/>
                                <span className="text-2xl drop-shadow max-lg:text-base">{userDto?.username}</span>
                            </div>
                            <div className="flex items-center">
                                <GiNorthStarShuriken className="size-7 mt-2 mr-4" title="Puan"/>
                                <span className="text-2xl drop-shadow mt-3 max-lg:text-base">{userDto?.userPoint}</span>
                            </div>
                            <div className="flex items-center">
                                <LuUserCog className="size-7 mt-2 mr-4" title="Puan"/>
                                <span className="text-2xl drop-shadow mt-3 max-lg:text-base">{userDto?.authorities}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <span className="text-xl drop-shadow ml-4 font-medium text-gray-700">Paylaşımları</span>
                        <div>
                        {whispers.length != 0 ? 
                            <div className="flex flex-wrap mt-8">
                                {whispers.map((obj, index) => 
                                    <div key={"right-package"+index} className="w-[24%] ml-[1%] mt-3 max-lg:w-[32%] max-md:w-[49%] max-sm:w-[46%] max-sm:ml-[2%]">
                                        <NewsCard title={obj.title} img="../logo-black.png" name={obj.authorName} source={obj.source} category={obj.category} />
                                    </div>
                                    )
                                }
                            </div>
                        : 
                            <div role="status" className={"mr-10 flex justify-center items-center"}>
                                <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                        </div>
                    </div>
                </div>
                <AbsoluteAdversiting class="left"/>
                <AbsoluteAdversiting class="right"/>
            </div>
            <FooterArea src={"../../logo-white.png"} />
        </div>
    )
}