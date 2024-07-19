import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import HovCard from "../Hov-Card/HovCard"


export default function NewsCard(props) {
    return(
        <Card>
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