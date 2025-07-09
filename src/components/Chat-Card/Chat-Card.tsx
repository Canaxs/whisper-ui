import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { GrResources } from "react-icons/gr";
import { TbWriting } from "react-icons/tb";
import { useEffect } from "react"
import { SlLike  , SlDislike  } from "react-icons/sl";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { convertMenusEn } from "@/lib/menuEnum";
import HovCard from "../Hov-Card/HovCard";

export default function ChatCard(props) {
    const router = useRouter();
    function routeLink() {
        router.push("/sohbet/soylesi/"+props.obj['id']);
    }
    return (
        <div
          className="mt-5 rounded-xl bg-white shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer group overflow-hidden border border-gray-100 max-w-xl mx-auto"
          onClick={routeLink}
        >
          {/* Üst Bilgi */}
          <div className="flex items-center gap-2 px-4 pt-4">
            <Avatar className="w-7 h-7">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 text-xs">{props.obj['user']}</span>
              <span className="text-[11px] text-gray-400">{props.date}</span>
            </div>
          </div>
          {/* Haber Görseli ve Overlay */}
          <div className="w-full aspect-[16/7] relative mt-3">
            <img src={props.obj['whisperImageURL']} className="w-full h-full object-cover"/>
            <a
              href={`/kategori/${convertMenusEn(props.obj["whisperCategory"])}${props.obj['whisperUrlName'] ? "/"+props.obj['whisperUrlName'] : ''}`}
              className="absolute left-0 bottom-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent px-6 py-4 transition-all duration-200 cursor-pointer group-hover:from-black/90 group-hover:via-black/50"
              style={{textDecoration: 'none'}}
              onClick={e => e.stopPropagation()}
            >
              <span className="block text-[11px] font-semibold text-gray-200 uppercase tracking-wide mb-1">{props.obj['whisperCategory']}</span>
              <span className="block text-base sm:text-lg font-semibold text-white drop-shadow-lg line-clamp-2 group-hover:underline">{props.obj['whisperTitle']}</span>
              <div className="flex flex-wrap gap-3 mt-2 text-gray-200 text-[11px]">
                <span className="flex items-center gap-1"><TbWriting className="w-3 h-3"/><span>{props.obj['whisperAuthorName']}</span></span>
                <span className="flex items-center gap-1"><GrResources className="w-3 h-3"/><span>{props.obj['whisperSource']}</span></span>
              </div>
            </a>
          </div>
          {/* Açıklama */}
          <div className="px-4 mt-2">
            <span className="text-sm line-clamp-2 text-gray-800 max-sm:text-xs">{props.obj['description']}</span>
          </div>
          {/* Beğeni, Dislike, Yorum Barı */}
          <div className="flex items-center justify-between gap-2 border-y border-gray-100 py-2 px-4 text-gray-600 mt-3">
            <span className='flex items-center gap-1 select-none'>
              <SlLike className="size-4" />
              <span className='font-medium text-xs'>{props.obj['disputeLikeSize']}</span>
            </span>
            <span className='flex items-center gap-1 select-none'>
              <SlDislike className="size-4" />
              <span className='font-medium text-xs'>{props.obj['disputeDisLikeSize']}</span>
            </span>
            <span className='flex items-center gap-1'>
              <HiMiniChatBubbleLeftRight className="size-5 text-gray-400" />
              <span className='font-medium text-xs'>{props.obj['commentSize']}</span>
            </span>
          </div>
          {/* Etiketler */}
          {props.tags && props.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 py-2">
              {props.tags.map((tag,index) => 
                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-lg text-[11px]" key={"chatTag"+index}>{tag}</span>
              )}
            </div>
          )}
        </div>
    )
}