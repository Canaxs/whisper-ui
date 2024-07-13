import { Button } from "../ui/button";
import  Image  from "next/image";


export default function HeaderTop(props) { 
    return(
        <div className="flex justify-between">
            <div className="flex max-lg:ml-3">
                <img src={props.logo} width="100" height="100" alt="Söylenti" />
                <div className="h-1/2 mt-[8%] w-[1px] bg-slate-300 ml-5"></div>
                <img src={props.flag} className="ml-2" width="100px" height="50px" alt="Türk Bayrağı" />
            </div>
            <div className="flex items-center max-md:mr-[1%]">
                <a href="/login" className="text-sm text-slate-700 font-medium">Giriş Yap / Kayıt Ol</a>
            </div>
        </div>
    )
}