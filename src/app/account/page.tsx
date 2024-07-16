"use client";
import AccountInfo from "@/components/Account-Info/AccountInfo";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import { RootState } from "@/store/store";
import { addUser } from "@/store/user-store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Info() {

    const dispatch = useDispatch();

    const { data } = useSelector((store: RootState) => store.user);

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
            <button onClick={() => deneme()} className="w-10 h-10 bg-black text-white">Gönder</button>
        </div>
    )
}