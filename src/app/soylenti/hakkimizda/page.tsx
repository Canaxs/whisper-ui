"use client";
import Header from "@/components/Header/Header";

export default function About() {
    return (
        <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
            <Header flag={"../../siyah-flag.png"} logo={"../../logo-black.png"} />
            <div className="mt-16 ml-2">
                <h1 className="drop-shadow text-4xl">Biz Kimiz </h1>
                <h6 className="mt-10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus amet iusto adipisci neque odio quidem, 
                    ipsam consequatur totam ratione repellat maiores laudantium aliquam nostrum facere rem, sequi natus atque impedit. <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus amet iusto adipisci neque odio quidem, 
                    ipsam consequatur totam ratione repellat maiores laudantium aliquam nostrum facere rem, sequi natus atque impedit.<br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus amet iusto adipisci neque odio quidem, 
                    ipsam consequatur totam ratione repellat maiores laudantium aliquam nostrum facere rem, sequi natus atque impedit.<br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus amet iusto adipisci neque odio quidem, 
                    ipsam consequatur totam ratione repellat maiores laudantium aliquam nostrum facere rem, sequi natus atque impedit.<br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus amet iusto adipisci neque odio quidem, 
                    ipsam consequatur totam ratione repellat maiores laudantium aliquam nostrum facere rem, sequi natus atque impedit.</h6>
            </div>
        </div>
    )
}