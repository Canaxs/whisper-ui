import Adversiting from "../Advertising-Space/Advertising";
import CarouselOne from "../Carousel-One/CarouselOne";
import CarouselTwo from "../Carousel-Two/CarouselTwo";

export default function ContentCarousel() {
    return(
        <div className="w-full mt-10 flex max-lg:flex-col">
            <div className="w-[60%] max-lg:w-[98%] max-lg:ml-[1%] max-sm:w-[90%] max-sm:ml-[5%]">
                <CarouselOne bigClass="h-[400px]" smallClass="h-[50px]"/>
            </div>
            <div className="w-[38%] ml-[1%] max-lg:mt-10 max-lg:w-[98%] max-sm:w-[90%] max-sm:ml-[5%]">
                    <CarouselTwo bigClass="h-[300px]" smallClass="h-[40px]" />
                    <Adversiting oneClass="h-[90px] mt-[9px] w-full" />
            </div>
        </div>
    )
}