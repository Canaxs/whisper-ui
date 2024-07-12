import { FaFacebook,FaInstagram,FaTwitter ,FaYoutube  } from "react-icons/fa";

export default function FooterArea() {
    const style = { color: "white",fontSize: "1.5em"}
    return (
        <div className="bg-black w-full h-full flex items-center flex-col text-white">
            <div className="mt-4">
                <img src="logo-white.png" width={"150"} height={"50"} />
            </div>
            <div>
                <ul className="flex text-base font-medium">
                    <li className="p-3 cursor-pointer">Hakkımızda</li>
                    <li className="p-3 cursor-pointer">Amacımız</li>
                    <li className="p-3 cursor-pointer">Yardım</li>
                </ul>
            </div>
            <div>
                <ul className="flex text-lg">
                    <li className="p-3 cursor-pointer"><FaFacebook style={style} /> </li>
                    <li className="p-3 cursor-pointer"><FaInstagram style={style} /> </li>
                    <li className="p-3 cursor-pointer"><FaTwitter style={style} /> </li>
                    <li className="p-3 cursor-pointer"><FaYoutube style={style} /> </li>
                </ul>
            </div>
            <div className="flex flex-col items-center mt-3">
                <p>Copyright © 2024. Söylenti</p>
                <p className="mt-2">Bağlantı yoluyla gidilen dış sitelerin içeriğinden Söylenti Sitesi sorumlu değildir.</p>
            </div>
            <div className="flex flex-col items-center mt-4 mb-5">
                <p>Gizlilik Politikası ve Aydınlatma Metni</p>
                <p>Kullanım Şartları</p>
                <p>Çerez Politikası</p>
            </div>
        </div>
    )
}