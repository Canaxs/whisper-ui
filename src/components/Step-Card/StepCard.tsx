import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { useState } from "react";


export default function StepCard(props) {

    return (
        <Card className={props.classProps} onClick={() => props.onClick()}>
            <CardHeader className="pb-3">
                <CardTitle>
                    <span className="text-gray-600 font-medium drop-shadow-md">{props.title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
                <div className="flex flex-col text-sm flex-grow">
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
                <div className="mt-auto pt-4">
                    <div className="flex justify-end items-center">
                        <span className="drop-shadow-md text-2xl font-medium text-gray-600">{props.wage}</span>
                        <FaTurkishLiraSign className="size-6 ml-1 text-gray-600" />
                    </div>
                    <div className="flex justify-end mt-1">
                        <span className="drop-shadow-md text-sm">Aylık / TL</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}