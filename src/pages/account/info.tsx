import AccountInfo from "@/components/Account-Info/AccountInfo";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";

export default function Info() {

    const [user,setUser] = useState({
        id:1,
        name:"meric"
    });
    return (
        <div>
            <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
                <Header flag={"../siyah-flag.png"} logo={"../logo-black.png"} />
                <AccountInfo />
            </div>
            <FooterArea src={"../logo-white.png"} />
        </div>
    )
}