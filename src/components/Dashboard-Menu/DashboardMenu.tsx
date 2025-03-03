import { Label } from "@radix-ui/react-label"
import { BiSolidDashboard } from "react-icons/bi";
import { GiPostStamp } from "react-icons/gi";
import { FaUsers , FaUsersGear } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { TbBadges } from "react-icons/tb";


import Cookies from 'js-cookie'
import { useEffect, useState } from "react";

export default function DashboardMenu(props) {


    const [username , setUsername] = useState("");
    const [role , setRole] = useState("");

    useEffect(() => {
        setUsername(Cookies.get("username"));
        setRole(Cookies.get("role"));
    }, [])

    return (
        <div className="w-[300px] h-full bg-gradient-to-br from-zinc-50 to-zinc-50 rounded p-3">
            <div className="flex flex-col">
            <Label className="pl-3"><span className="font-medium">{username}</span>, Hoşgeldiniz</Label>
            <Label className="text-xs pl-3 mt-1"><span className="">Yetki Seviyesi : </span> {role}</Label>
            </div>
            <ul className="mt-5">
                <li className="p-3 border m-3 opacity-70 hover:opacity-100 transition-all hover:bg-gray-600 hover:text-white hover:rounded-xl"><a href="/panel/dashboard" className="flex items-center font-medium text-sm"><BiSolidDashboard className="size-5 mr-3" />Anasayfa</a></li>
                <li className="p-3 border m-3 opacity-70 hover:opacity-100 transition-all hover:bg-gray-600 hover:text-white hover:rounded-xl"><a href="/panel/whispers" className="flex items-center font-medium text-sm"><GiPostStamp className="size-5 mr-3" />Paylaşımlar</a></li>
                <li className="p-3 border m-3 opacity-70 hover:opacity-100 transition-all hover:bg-gray-600 hover:text-white hover:rounded-xl"><a href="/panel/users" className="flex items-center font-medium text-sm"><FaUsers className="size-5 mr-3" />Kullanıcılar</a></li>
                <li className="p-3 border m-3 opacity-70 hover:opacity-100 transition-all hover:bg-gray-600 hover:text-white hover:rounded-xl"><a href="/panel/mods" className="flex items-center font-medium text-sm"><FaUsersGear className="size-5 mr-3" />Yetkililer</a></li>
                <li className="p-3 border m-3 opacity-70 hover:opacity-100 transition-all hover:bg-gray-600 hover:text-white hover:rounded-xl"><a href="/panel/create-badge" className="flex items-center font-medium text-sm"><TbBadges className="size-5 mr-3" />Rozetler</a></li>
                <li className="p-3 border m-3 opacity-70 hover:opacity-100 transition-all hover:bg-gray-600 hover:text-white hover:rounded-xl"><a href="/panel/badges" className="flex items-center font-medium text-sm"><SlBadge className="size-5 mr-3" />Rozet Atama</a></li>
            </ul>
        </div>
    )
}