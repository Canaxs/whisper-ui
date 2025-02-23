import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { useState } from "react";


export default function StepCard(props) {

    return (
        <Card className={props.classProps} onClick={() => props.onClick()}>
            <CardHeader>
                <CardTitle>
                    <span className="text-gray-600 font-medium drop-shadow-md">{props.title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col text-sm">
                    <div className="flex gap-1 items-center drop-shadow-md">
                        <span>{props.posts ? <FaCheck className="size-4 text-green-600"/> : <FaTimes className="size-4 text-red-600"/>}</span>
                        <span>{props.posts} Paylaşım Hakkı</span>
                    </div>
                    <div className={props.money ? "flex gap-1 mt-2 items-center" : "flex gap-1 mt-2 items-center opacity-65"}>
                        <span>{props.money ? <FaCheck className="size-4 text-green-600"/> : <FaTimes className="size-4 text-red-600"/>}</span>
                        <span className="drop-shadow-md">Para Kazanma</span>
                    </div>
                    <div className={props.exclusive ? "flex gap-1 mt-2 items-center" : "flex gap-1 mt-2 items-center opacity-65"}>
                        <span>{props.exclusive ? <FaCheck className="size-4 text-green-600"/> : <FaTimes className="size-4 text-red-600"/>}</span>
                        <span className="drop-shadow-md">Seçkin Hesap</span>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex justify-end items-center">
                        <span className="drop-shadow-md text-3xl font-medium text-gray-600">{props.wage}</span>
                        <FaTurkishLiraSign className="size-7 ml-2 text-gray-600" />
                    </div>
                    <div className="flex justify-end mt-1">
                        <span className="drop-shadow-md text-base">Aylık / TL</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}