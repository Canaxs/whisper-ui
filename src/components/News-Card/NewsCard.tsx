import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import HovCard from "../Hov-Card/HovCard"
import { GrResources } from "react-icons/gr";
import { TbWriting } from "react-icons/tb";
import Image from 'next/image';



export default function NewsCard(props) {
    return(
        <Card className="shadow-xl hover:shadow-2xl hover:shadow-black hover:scale-[1.01] transition-all">
            <CardHeader className="h-auto max-sm:p-3">
                <CardTitle className="text-base line-clamp-2 max-sm:text-sm">{props.title}</CardTitle>
                <CardDescription className="max-sm:text-xs drop-shadow-sm">{props.category}</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
                <div className="h-[200px] w-full max-md:h-[140px] max-sm:h-[110px]">
                    <div className="h-full w-full relative">
                        <Image src={props.img || "/logo-black.png"} 
                            alt="Image" fill className="rounded-md" 
                            style={{ objectFit: 'cover' }} 
                            priority 
                            placeholder="empty" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pl-3 mt-1 mb-0">
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <TbWriting className="size-5 mr-2"/>
                        <HovCard name={props.name} />
                    </div>
                    <div className="flex mt-1 items-center">
                        <GrResources className="size-5 mr-2"/>
                        <span className="text-xs drop-shadow-lg">{props.source}</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}