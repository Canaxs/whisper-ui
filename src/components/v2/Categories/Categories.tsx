import { Card } from "@/components/ui/card";
import { PenLine, User } from "lucide-react";

export default function Categories() {
    return (
        <div className="p-6">
            <div className="max-w-md mx-auto">
                <h1 className="text-xl font-bold text-neutral-900 mb-8 tracking-tight drop-shadow-sm">Akış</h1>

                <div className="grid grid-cols-2 gap-3">
                    <a href="/soylenti/yazarlar" role="button" tabIndex={0} className="outline-none focus:ring-2 focus:ring-blue-200 rounded-xl">
                        <div className="relative group p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer rounded-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-md hover:shadow-xl hover:scale-105 border border-gray-200">
                            <div className="mb-7 flex items-center justify-center">
                                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                                    <User className="w-7 h-7 text-blue-700" strokeWidth={1.5} />
                                </span>
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-1 tracking-tight">Yazarlar</h3>
                            <p className="text-xs text-gray-600 font-bold">+20</p>
                            <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-gray-100 to-gray-300"></div>
                            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-gray-100 to-gray-300"></div>
                        </div>
                    </a>
                    <a href="/sohbet" role="button" tabIndex={0} className="outline-none focus:ring-2 focus:ring-blue-200 rounded-xl">
                        <div className="relative group p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer rounded-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-md hover:shadow-xl hover:scale-105 border border-gray-200">
                            <div className="mb-7 flex items-center justify-center">
                                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100">
                                    <PenLine className="w-7 h-7 text-amber-700" strokeWidth={1.5} />
                                </span>
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 tracking-tight">Söyleşi</h3>
                            <p className="text-xs text-gray-700 font-bold mt-2">+12</p>
                            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-gray-100 to-gray-300"></div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}