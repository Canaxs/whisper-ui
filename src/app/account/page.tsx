"use client";
import AccountInfo from "@/components/Account-Info/AccountInfo";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Info() {

    const dispatch = useDispatch();

    const {data} = useAppSelector((store) => store.user);


    console.log(data);

    function deneme() {
        console.log("Data: "+data.username);
    }

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