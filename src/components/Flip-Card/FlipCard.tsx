import { TbWriting } from "react-icons/tb"
import { GrResources } from "react-icons/gr"
import { BiLike, BiDislike } from "react-icons/bi"
import { TbUserStar } from "react-icons/tb"
import Image from "next/image"

interface FlipCardProps {
  title: string
  category: string
  imageURL?: string
  name: string
  source: string
  description: string
}

export default function FlipCard(props: FlipCardProps) {
  return (
    <div className="flip-card w-full h-auto rounded-xl perspective-1000">
      <div className="flip-card-inner relative w-full max-md:h-[300px] h-[400px] rounded-xl shadow-lg hover:shadow-2xl hover:shadow-black/20 transition-all duration-500 preserve-3d group">
        {/* Front Card */}
        <div className="front-card absolute w-full h-full overflow-hidden rounded-xl backface-hidden">
          {/* Background Image */}
          <div className="absolute w-full h-full z-10 rounded-xl">
            <Image
              src={props.imageURL || "/logo-black.png"}
              alt="Image"
              fill
              className="rounded-xl object-cover"
              priority
              style={{
                backgroundColor: props.imageURL ? "rgba(0,0,0,.8)" : "",
              }}
            />
          </div>

          {/* Gradient Overlays */}
          <div className="absolute w-full h-full z-20 bg-gradient-to-t from-black/70 via-black/20 to-black/40 rounded-xl" />

          {/* Header Section */}
          <div className="absolute top-0 w-full px-4 pt-4 pb-3 z-30 bg-gradient-to-b from-black/60 to-transparent rounded-t-xl">
            <h3 className="text-base line-clamp-2 max-sm:text-sm text-white font-semibold drop-shadow-lg tracking-tight leading-tight">
              {props.title}
            </h3>
            <span className="inline-block mt-2 px-3 py-1 max-sm:text-xs text-sm text-white bg-white/20 backdrop-blur-sm rounded-full font-medium">
              {props.category}
            </span>
          </div>

          {/* Bottom Section */}
          <div className="absolute bottom-0 w-full p-4 z-30 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full mr-3">
                  <TbWriting className="size-4 text-white" />
                </div>
                <span className="font-medium text-white text-sm drop-shadow-lg">{props.name}</span>
              </div>
              <div className="flex items-center">
                <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full mr-3">
                  <GrResources className="size-4 text-white" />
                </div>
                <span className="text-xs text-white/90 drop-shadow-lg">{props.source}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Card */}
        <div className="back-card absolute w-full h-full bg-white rounded-xl shadow-lg backface-hidden rotate-y-180 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-base line-clamp-2 max-sm:text-sm font-semibold text-gray-900 tracking-tight leading-tight mb-2">
              {props.title}
            </h3>
            <span className="inline-block px-3 py-1 max-sm:text-xs text-sm bg-gray-100 text-gray-700 rounded-full font-medium">
              {props.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-4 flex-1">
            <div
              className="line-clamp-6 text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
          </div>

          {/* Bottom Stats */}
          <div className="absolute bottom-0 w-full p-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="p-1.5 bg-green-100 rounded-full">
                    <BiLike className="size-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">0</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="p-1.5 bg-red-100 rounded-full">
                    <BiDislike className="size-4 text-red-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">0</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="p-1.5 bg-yellow-100 rounded-full">
                  <TbUserStar className="size-4 text-yellow-600" />
                </div>
                <span className="text-sm font-semibold text-gray-900">4.2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
