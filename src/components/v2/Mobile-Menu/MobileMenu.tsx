import { Button } from "@/components/ui/button";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";

export function MobileMenu(props) {
    return (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => props.setIsMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full p-6 space-y-6" onClick={(e) => e.stopPropagation()}>
            <a href="/"><img src={props.logo} alt="Söylenti" className="cursor-pointer w-13 h-12 hover:-rotate-6 transition-all" title="Söylenti"/></a>
            <nav className="flex flex-col space-y-4">
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-800">
                <MdHome className="w-5 h-5 mr-3" />
                Ana Sayfa
              </Button>
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-800">
                <MdOutlineSportsVolleyball className="w-5 h-5 mr-3" />
                Spor
              </Button>
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-800">
                <GrTechnology className="w-5 h-5 mr-3" />
                Teknoloji
              </Button>
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-800">
                <GrTechnology className="w-5 h-5 mr-3" />
                Profil
              </Button>
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-800">
                <GrTechnology className="w-5 h-5 mr-3" />
                Ayarlar
              </Button>
            </nav>
          </div>
        </div>
    )
}