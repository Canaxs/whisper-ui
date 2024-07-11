import ContentCarousel from "@/components/Content/ContentCarousel";
import HeaderTop from "@/components/Header-Top/Header-Top";
import Header from "@/components/Header/Header";
import Navigation from "@/components/Navigation-Menu/Navigation";
import NewsCard from "@/components/News-Card/NewsCard";


export default function Home() { 
    return (
        <div style={{fontFamily: "'Poppins', sans-serif;"}} className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
            <Header />
            <ContentCarousel />
            <div className="mt-8 flex flex-wrap">
            {Array.from({ length: 12 }).map((_, index) => ( 
                <NewsCard title={"Söylenti"} img="logo2.png" />
            ))}
            </div>
        </div>
    )
}