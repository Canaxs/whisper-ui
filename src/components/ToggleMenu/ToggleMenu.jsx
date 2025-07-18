import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CiMenuBurger } from "react-icons/ci";
import { MenusTR, Menus } from "@/lib/menuEnum";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  Dumbbell,
  Cpu,
  Gavel,
  Banknote,
  Newspaper,
  Globe,
  Camera,
  Star,
  ChevronRight,
  Sparkles,
  User,
  PenLine,
} from "lucide-react";

const menuIcons = [Dumbbell, Cpu, Gavel, Banknote, Newspaper, Globe, Camera];

const popularCategories = [1, 3, 4, 6];

export default function ToggleMenu(props) {

  const [filterText, setFilterText] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      const trimmed = filterText.trim();
      if (trimmed.length === 0) {
        toast({
          variant: "destructive",
          title: "Boş arama yapılamaz",
          description: "Lütfen bir kelime giriniz.",
        });
      } else {
        toast({
          variant: "success",
          title: "Arama Sayfasına Yönlendiriliyorsunuz",
          description: `Aranan Kelime: ${trimmed}`,
        });
        router.push(`/search?t=${trimmed}`);
      }
    }
  };

  const handleNavigation = (url) => {
    router.push(url);
  };

  function menusGet(num) {
    const str = MenusTR[num];
    return str?.substring(0, 1).toUpperCase() + str?.substring(1, str.length);
  }

  const style = { color: "black" };

  const Category = ({ bgColor = "bg-gray-50" }) => {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Kategoriler
        </h3>
        {Array.from({ length: MenusTR.__LENGTH }).map((_, index) => {
          const IconComponent = menuIcons[index] || Star;
          const isPopular = popularCategories.includes(index);
          return (
            <SheetClose asChild key={"toggleMenu" + index}>
              <button
                onClick={() => handleNavigation("/kategori/" + Menus[index])}
                className="w-full text-left"
              >
                <div className="group relative flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-300 to-slate-400 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {menusGet(index)}
                    </span>
                    <div className="flex items-center gap-2">
                      {isPopular && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-orange-100 text-orange-700 border-orange-200"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          Popüler
                        </Badge>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </button>
            </SheetClose>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="relative overflow-hidden group hover:shadow-md transition-all duration-200"
          >
            <CiMenuBurger className="transition-transform group-hover:scale-110 duration-200" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="w-80 p-0 bg-white flex flex-col max-h-screen">
          <SheetHeader className="p-6 bg-gradient-to-r from-white-50 via-gray-100 to-slate-100 border-b border-gray-100 flex-shrink-0">
            <SheetTitle className="flex justify-center">
              <Link href="/">
                <Image
                  src="/logo-black.png"
                  alt="Söylenti"
                  width={48}
                  height={48}
                  className="hover:-rotate-6 transition-all duration-300 drop-shadow-sm"
                  title="Söylenti"
                />
              </Link>
            </SheetTitle>
            <SheetDescription className="text-center text-sm text-gray-600">
              Kategorileri keşfedin ve güncel kalın
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            <Category />
            <h3 className="text-lg font-semibold mb-4 mt-4 text-gray-800">
              Diğer
            </h3>
            <SheetClose asChild>
              <button
                onClick={() => handleNavigation("/soylenti/yazarlar")}
                className="w-full text-left"
              >
                <div className="group relative flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-300 to-slate-400 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      Yazarlar
                    </span>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </button>
            </SheetClose>
            <SheetClose asChild>
              <button
                onClick={() => handleNavigation("/sohbet")}
                className="w-full text-left"
              >
                <div className="group relative flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-300 to-slate-400 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                    <PenLine className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      Söyleşi Alanı
                    </span>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </button>
            </SheetClose>
            <div className="mt-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Haber ara..."
                  className="w-full pl-10 bg-gray-50/50 border-gray-200 focus:bg-white rounded-full"
                  onChange={(e) => setFilterText(e.target.value)}
                  onKeyDown={handleEnterKey}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
