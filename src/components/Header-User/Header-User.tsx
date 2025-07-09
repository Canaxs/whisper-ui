import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  User, 
  Bell, 
  Edit3, 
  MessageCircle, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Crown,
  Star
} from "lucide-react";

export function HeaderUser(props) {
  const router = useRouter();

  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(Cookies?.get("role"));
  }, []);

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
          <Button variant="ghost" className="relative p-0 h-auto w-auto rounded-full hover:bg-gray-100 transition-all duration-200 group">
            <Avatar className="cursor-pointer border-2 border-gray-200 group-hover:border-gray-300 transition-all duration-200 shadow-sm group-hover:shadow-md">
              <AvatarImage src="/logo-black.png" alt="@shadcn" />
              <AvatarFallback className="bg-gradient-to-br from-gray-500 to-gray-700 text-white font-bold">
                {props.username?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2" align="end">
          {/* User Info Header */}
          <div className="px-3 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 border-2 border-gray-200">
                <AvatarImage src="/logo-black.png" alt="@shadcn" />
                <AvatarFallback className="bg-gradient-to-br from-gray-500 to-gray-700 text-white font-bold">
                  {props.username?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{props.username}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-600">{Number(props.userPoint).toFixed(1)} Puan</span>
                  {role?.includes("ROLE_MOD") && (
                    <Badge variant="secondary" className="ml-1 bg-purple-100 text-purple-700 text-xs">
                      <Crown className="w-2 h-2 mr-1" />
                      Mod
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DropdownMenuGroup className="py-2">
            <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <User className="w-4 h-4 text-gray-600" />
              <Link href="/account" className="flex-1">Profil</Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Bell className="w-4 h-4 text-gray-600" />
              <Link href="/account" className="flex-1">Bildirimler</Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Edit3 className="w-4 h-4 text-gray-600" />
              <Link href="/account/write" className="flex-1">Paylaşım Yap</Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <MessageCircle className="w-4 h-4 text-gray-600" />
              <Link href="/sohbet" className="flex-1">Söyleşi Alanı</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup className="py-2">
            <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <HelpCircle className="w-4 h-4 text-gray-600" />
              <Link href="/" className="flex-1">Yardım</Link>
            </DropdownMenuItem>
            
            {role?.includes("ROLE_MOD") && (
              <DropdownMenuItem className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <Settings className="w-4 h-4 text-gray-600" />
                <Link href="/panel/dashboard" className="flex-1">Panel&apos;e Git</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem 
            onClick={() => logout()} 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış Yap</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
