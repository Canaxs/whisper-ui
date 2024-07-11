import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function CarouselOne(props) {
    return(
        <div>
            <Carousel className={props.bigClass}>
                <CarouselContent className={props.bigClass}>
                {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem className={props.bigClass} >
                            <div className={props.bigClass}>
                                <Card className={props.bigClass}>
                                    <CardContent className={"flex items-center justify-center "+props.bigClass}>
                                        <img />
                                    </CardContent>
                                    </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-3"/>
                    <CarouselNext  className="right-3"/>
            </Carousel>
            <Carousel className={"mt-2 "+props.smallClass}>
                <CarouselContent className={"flex ml-0 "+props.smallClass}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem className={"pl-0 basis-[10%] ml-[1%] cursor-pointer"+props.smallClass}>
                        <div className={props.smallClass}>
                            <Card className={props.smallClass}>
                            <CardContent className={"flex items-center justify-center "+props.smallClass}>
                                <img />
                            </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}