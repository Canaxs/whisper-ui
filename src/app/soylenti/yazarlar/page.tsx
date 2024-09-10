"use client";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import { GiNorthStarShuriken } from "react-icons/gi";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { TbWriting } from "react-icons/tb";
import { TbPhotoCircle } from "react-icons/tb";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
  import { HiChatAlt } from "react-icons/hi";
  import { MdOutlineKeyboardBackspace } from "react-icons/md";


export default function Writers() {

    const writersExample = [
        {
            username: "meric",
            point: "2545",
            icon: "",
            comment: "",
        },
        {
            username: "kenan",
            point: "126",
            icon: "",
            comment: "",
        },
        {
            username: "princess",
            point: "6575",
            icon: "",
            comment: "",
        },
        {
            username: "sweetie",
            point: "4533",
            icon: "",
            comment: "",
        },
        {
            username: "sweet",
            point: "5556",
            icon: "",
            comment: "",
        },
        {
            username: "sparkly",
            point: "2343",
            icon: "",
            comment: "",
        },
        {
            username: "fairy",
            point: "9675",
            icon: "",
            comment: "",
        },
        {
            username: "little",
            point: "345",
            icon: "",
            comment: "",
        },
        {
            username: "lolly",
            point: "664",
            icon: "",
            comment: "",
        },
        {
            username: "lovely",
            point: "653",
            icon: "",
            comment: "",
        },
        {
            username: "blossom",
            point: "2324",
            icon: "",
            comment: "",
        },
        {
            username: "cherub",
            point: "2321",
            icon: "",
            comment: "",
        },
      ]


    return (
        <div>
            <div className="w-[98%] ml-[1%]">
                <a href="/">
                <MdOutlineKeyboardBackspace className="absolute left-2 top-2 size-10 cursor-pointer hover:scale-125 transition-all" title="Anasayfa'ya Git" />
                </a>
                <div className="w-3/4 ml-[12.5%] mt-6 mb-6 flex justify-between items-center">
                    <span className="drop-shadow text-2xl">Popüler Yazarlar</span>
                    <div>
                        <img src="../../logo-black.png" width={50} height={50} />
                    </div>
                </div>
                <div className="mt-3 flex justify-center flex-col items-center">
                    <div className="w-3/4 h-10 flex border rounded shadow-lg pt-7 pb-7">
                        <div className="w-1/4 flex justify-center items-center">
                            <TbPhotoCircle className="size-7" title="İkon" />
                        </div>
                        <div className="w-1/4 flex justify-center items-center">
                            <TbWriting className="size-7" title="Yazar" />
                        </div>
                        <div className="w-1/4 flex justify-center items-center">
                            <GiNorthStarShuriken className="size-7" title="Puan" />
                        </div>
                        <div className="w-1/4 flex justify-center items-center">
                            <HiChatAlt className="size-7 text-gray-300" title="Yazar Hakkında Yorumlar"/>
                        </div>
                    </div>
                    {writersExample.map((obj, index) => (
                        <div className="w-3/4 h-10 border-b border-r border-l flex justify-around text-left pt-10 pb-10 rounded mt-3 shadow-md" key={"index"+index}>
                            <div className="w-1/4 flex justify-center items-center">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                            </div>
                            <div className="w-1/4 flex justify-center items-center">
                                <span>{obj.username}</span>
                            </div>
                            <div className="w-1/4 flex justify-center items-center">
                                <span>{obj.point}</span>
                            </div>
                            <div className="w-1/4 flex justify-center items-center">
                                <HiMiniChatBubbleLeftRight className="size-7 cursor-pointer text-gray-300 hover:text-gray-400 transition-all hover:scale-90" title="Yazar Hakkında Yorumlar"/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <FooterArea src={"../../logo-white.png"} />
        </div>
    )
}