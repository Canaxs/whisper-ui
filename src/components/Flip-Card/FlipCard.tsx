import { TbWriting } from "react-icons/tb";
import HovCard from "../Hov-Card/HovCard";
import { GrResources } from "react-icons/gr";
import { BiLike , BiDislike } from "react-icons/bi";
import { TbUserStar } from "react-icons/tb";


export default function FlipCard(props) {
    return (
        <div className="flip-card w-full h-auto rounded-md" style={{perspective: "1000px"}} >
            <div className="flip-card-inner relative w-full max-md:h-[300px] h-[400px] border rounded-md shadow-xl hover:shadow-2xl hover:shadow-black transition-all" style={{transformStyle: "preserve-3d" , transition: "transform 0.6s"}}>
                <div className="front-card absolute w-full h-full shadow-md overflow-hidden rounded-md" style={{backfaceVisibility: "hidden"}}>
                    <div className="absolute w-full h-full z-10 rounded-md">
                        <img src={props.imageURL ? props.imageURL : "logo-black.png"} className="relative z-10 object-cover w-full h-full opacity-80 rounded-md" />
                    </div>
                    <div className="absolute top-0 w-full pl-4 pr-4 pt-3 z-30 rounded-md">
                        <span className="text-base line-clamp-2 max-sm:text-sm text-white font-medium drop-shadow tracking-tight">{props.title}</span>
                        <span className="max-sm:text-xs text-sm text-white drop-shadow">{props.category}</span>
                    </div>
                    <div className="absolute bottom-0 w-full p-3 z-30 rounded-b-md">
                        <div className="flex flex-col relative z-50">
                            <div className="flex relative items-center">
                                <TbWriting className="size-5 mr-2"/>
                                <HovCard name={props.name} />
                            </div>
                            <div className="flex mt-1 items-center z-50">
                                <GrResources className="size-5 mr-2"/>
                                <span className="text-xs text-white drop-shadow-lg">{props.source}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="back-card absolute w-full h-full shadow-md" style={{backfaceVisibility: "hidden"}}>
                    <div className="absolute top-0 w-full pl-4 pr-4 pt-3 z-30 rounded-md">
                        <span className="text-base line-clamp-2 max-sm:text-sm font-medium drop-shadow tracking-tight">{props.title}</span>
                        <span className="max-sm:text-xs text-sm drop-shadow">{props.category}</span>
                    </div>
                    <span className="line-clamp-4 m-3 text-sm">{props.description}</span>
                    <div className="absolute bottom-0 w-full p-3 z-30 rounded-b-md">
                        <div className="flex flex-col relative z-50">
                            <div className="flex relative items-center mb-2">
                                <BiLike  className="size-5 mr-2 text-green-600"/>
                                <span className="text-sm">0</span>
                            </div>
                            <div className="flex relative items-center mb-2">
                                <BiDislike  className="size-5 mr-2 text-red-600"/>
                                <span className="text-sm">0</span>
                            </div>
                            <div className="flex mt-1 items-center z-50">
                                <TbUserStar  className="size-5 mr-2"/>
                                <span className="text-sm drop-shadow-lg">4.2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}