"use client";
import FooterArea from "@/components/Footer-Area/FooterArea";
import Header from "@/components/Header/Header";
import { FaFacebook,FaInstagram,FaTwitter ,FaYoutube  } from "react-icons/fa";

export default function Communication() {
    const style = { color: "black",fontSize: "1.5em"}
    return (
        <div>
        <div className="lg:w-[98%] 2xl:w-[65%] pt-1 lg:ml-[1%] 2xl:ml-[17%]">
            <Header flag={"../../siyah-flag.png"} logo={"../../logo-black.png"} />
            <div className="mt-16 ml-2">
                <h1 className="drop-shadow text-4xl">İletişim </h1>
                <hr className="mt-3 mb-3"/>
                <div className="mt-10 flex justify-between max-lg:flex-col">
                    <div className="text-lg w-[50%] max-lg:w-full max-lg:text-center">
                        <h2 className="text-3xl drop-shadow-2xl mb-5">İzmir</h2>
                        <p><span className="font-medium text-gray-700 drop-shadow">Adres :</span> İzmir Konak</p>
                        <p><span className="font-medium text-gray-700 drop-shadow">Telefon :</span> +90 000 000 0000</p>
                        <p><span className="font-medium text-gray-700 drop-shadow">Mail :</span> soylenti@gmail.com </p>
                        <ul className="flex text-lg mt-5 justify-center">
                            <li className="p-3 cursor-pointer"><a href=""><FaFacebook style={style} /></a> </li>
                            <li className="p-3 cursor-pointer"><a href=""><FaInstagram style={style} /> </a></li>
                            <li className="p-3 cursor-pointer"><a href="https://x.com/soylentisite"><FaTwitter style={style} /> </a></li>
                            <li className="p-3 cursor-pointer"><a href=""><FaYoutube style={style} /></a> </li>
                        </ul>
                    </div>
                    <div className="h-[500px] w-[50%] max-lg:w-full max-lg:h-[300px]">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d827.9091822049071!2d27.142688881415467!3d38.42370713014896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1722700095502!5m2!1str!2str" 
                         width="98%" height="100%" style={{border: "0"}} loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
        <FooterArea src={"../../logo-white.png"}/>
        </div>
    )
}