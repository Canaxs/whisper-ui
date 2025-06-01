import { Card } from "@/components/ui/card";
import { PenLine, User } from "lucide-react";

export default function Categories() {
    return (
        <div className="p-6 max-xl:border max-xl:bg-white max-xl:rounded-lg max-xl:m-5 max-xl:shadow-md">
            <div className="max-w-md mx-auto">
                <h1 className="text-xl font-semibold text-neutral-800 mb-8">Akış</h1>

                <div className="grid grid-cols-2">
                    <div className="relative hover:shadow-md p-6 flex flex-col items-center justify-center text-center transition-shadow cursor-pointer">
                        <div className="mb-7">
                            <User className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">Yazarlar</h3>
                        <p className="text-xs text-gray-500">+20</p>
                        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-[#F5F5F5] to-gray-300"></div>
                        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#F5F5F5] to-gray-300"></div>
                    </div>
                    <div className="relative p-6 flex hover:shadow-md flex-col items-center justify-center text-center transition-shadow cursor-pointer">
                        <div className="mb-7">
                            <PenLine className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">Söyleşi</h3>
                        <p className="text-xs text-gray-500 mt-2">+12</p>
                        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#F5F5F5] to-gray-300"></div>
                    </div>
                </div>
            </div>
    </div>
    )
}