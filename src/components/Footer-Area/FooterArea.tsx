import { FaFacebook,FaInstagram,FaTwitter ,FaYoutube  } from "react-icons/fa";

export default function FooterArea(props) {
    const style = { color: "white",fontSize: "1.5em"}
    return (
        <div className="bg-black w-full h-full flex items-center flex-col text-white mt-10">
            <div className="mt-4">
                <img src={props.src} width={"150"} height={"50"} />
            </div>
            <div>
                <ul className="flex text-base font-medium max-sm:text-sm ">
                    <li className="p-3 cursor-pointer">Hakkımızda</li>
                    <li className="p-3 cursor-pointer">Amacımız</li>
                    <li className="p-3 cursor-pointer">Yardım</li>
                </ul>
            </div>
            <div>
                <ul className="flex text-lg max-sm:text-base">
                    <li className="p-3 cursor-pointer"><a href=""><FaFacebook style={style} /></a> </li>
                    <li className="p-3 cursor-pointer"><a href=""><FaInstagram style={style} /> </a></li>
                    <li className="p-3 cursor-pointer"><a href="https://x.com/soylentisite"><FaTwitter style={style} /> </a></li>
                    <li className="p-3 cursor-pointer"><a href=""><FaYoutube style={style} /></a> </li>
                </ul>
            </div>
            <div className="flex flex-col items-center mt-3 max-md:text-sm max-sm:text-xs">
                <p>Copyright © 2024. Söylenti</p>
            </div>
            <div className="flex flex-col items-center mt-4 mb-5 max-md:text-sm max-sm:text-xs">
                <p className="p-1">Gizlilik Politikası ve Aydınlatma Metni</p>
                <p className="p-1">Kullanım Şartları</p>
                <p className="p-1">Çerez Politikası</p>
            </div>
        </div>
    )
}