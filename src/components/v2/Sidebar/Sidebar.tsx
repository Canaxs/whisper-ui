"use client";

import { Button } from "@/components/ui/button";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { TfiHome } from "react-icons/tfi";
import { Dumbbell } from "lucide-react";
import { FiMonitor } from "react-icons/fi";
import {
  LuCamera,
  LuGlobe,
  LuLandmark,
  LuNewspaper,
  LuWallet,
} from "react-icons/lu";
import Link from "next/link";
import { Menus, MenusTR } from "@/lib/menuEnum";

const menuIcons = [
  Dumbbell,
  FiMonitor,
  LuLandmark,
  LuWallet,
  LuNewspaper,
  LuGlobe,
  LuCamera,
];

export default function Sidebar() {
  return (
    <div className="hidden lg:flex w-32 shadow-sm flex-col items-center py-8 space-y-8">
      <nav className="flex flex-col space-y-14">
        <Button
          variant="ghost"
          size="icon"
          className="text-neutral-700 hover:text-neutral-900 hover:opacity-80 opacity-40"
        >
          <Link href="/">
            <TfiHome
              className="w-8 h-8"
              style={{
                transform: "scale(1)",
                opacity: 0.8,
                filter: "brightness(0.8) contrast(0.8)",
              }}
            />
          </Link>
        </Button>
        {Array.from({ length: MenusTR.__LENGTH }).map((_, index) => {
          const IconComponent = menuIcons[index] || LuLandmark;
          return (
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-700 hover:text-neutral-900 hover:opacity-80 opacity-40"
              key={"Sidebar" + index}
            >
              <Link href={"/kategori/" + Menus[index]}>
                <IconComponent
                  className="w-8 h-8"
                  style={{
                    transform: "scale(1)",
                    opacity: 0.8,
                    filter: "brightness(0.8) contrast(0.8)",
                  }}
                />
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
