import { Button } from "../ui/button";
import  Image  from "next/image";


export default function HeaderTop() { 
    return(
        <div className="flex justify-between">
            <div className="flex">
                <img src="logo2.png" width="100" height="100" alt="Söylenti" />
                <div className="h-1/2 mt-[8%] w-[1px] bg-slate-300 ml-5"></div>
                <img src="siyah-flag.png" className="ml-2" width="100px" height="50px" alt="Türk Bayrağı" />
            </div>
            <div className="flex items-center max-md:mr-[1%]">
                <a href="" className="text-sm text-slate-700 font-medium">Giriş Yap</a>
            </div>
        </div>
    )
}