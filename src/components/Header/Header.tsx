import HeaderTop from "../Header-Top/Header-Top";
import Navigation from "../Navigation-Menu/Navigation";
import ToggleMenu from "../ToggleMenu/ToggleMenu";

export default function Header(props) { 
    return ( 
        <div className="mt-3">
            <HeaderTop flag={props.flag} logo={props.logo} />
            <div className="w-full flex justify-between">
                <div className="xl:w-[90%] w-[80%]">
                    <Navigation />
                </div>
                <div className="xl:w-[10%] w-[18%] max-md:mr-[1%] flex items-center justify-end">
                    <ToggleMenu />
                </div>
            </div>
        </div>
    )
}