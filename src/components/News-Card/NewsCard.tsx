import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
import HovCard from "../Hov-Card/HovCard"
import { useEffect } from "react"


export default function NewsCard(props) {
    return(
        <Card className="w-[24%] ml-[1%] mt-3 max-lg:w-[32%] max-md:w-[49%]" key={props.keyNumber}>
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>Lorem ipsum sit amet.</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
                <img src={props.img} height={"50px"} width={"100%"}/>
            </CardContent>
            <CardFooter className="p-0 mt-3 mb-3">
                <HovCard name={props.name} />
            </CardFooter>
        </Card>
    )
}