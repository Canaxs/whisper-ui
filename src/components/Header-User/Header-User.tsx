import { Label } from "../ui/label";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export function HeaderUser(props) {

    const router = useRouter();

    const [role , setRole] = useState("");

    useEffect(() => {
        setRole(Cookies?.get("role"));
    }, [])


    function logout() {
        Cookies.remove("token");
        Cookies.remove("username");
        Cookies.remove("userPoint");
        Cookies.remove("role");
        router.push("/login");
    }

    return (
        <div className="flex max-sm:mr-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer border">
                            <AvatarImage src="../../logo-black.png" alt="@shadcn" />
                            <AvatarFallback>Logo</AvatarFallback>
                        </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{props.username}</DropdownMenuLabel>
                    <DropdownMenuLabel>Puan: {props.userPoint}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem> <a href="/account">Profil</a></DropdownMenuItem>
                        <DropdownMenuItem> <a href="/account">Bildirimler</a></DropdownMenuItem>
                        <DropdownMenuItem> <a href="/account/write">Paylaşım Yap</a></DropdownMenuItem>
                        <DropdownMenuItem> <a href="/sohbet">Söyleşi Alanı&apos;na git</a></DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><a href="/">Yardım</a></DropdownMenuItem>
                    <DropdownMenuItem disabled={role.includes("ROLE_MOD")}><a href="/panel/dashboard">Panel&apos;e Git</a></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">Çıkış Yap</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}