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



export default function NewsCard(props) {
    return(
        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="text-base line-clamp-2">{props.title}</CardTitle>
                <CardDescription>{props.category}</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
                <img src={props.img} height={"50px"} width={"100%"}/>
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