import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Star, Crown } from "lucide-react";

const authors = [
  { name: "Meriç", point: 6758, img: "https://github.com/shadcn.png", leader: true },
  { name: "Kenan", point: 3558, img: "https://github.com/shadcn.png" },
  { name: "Tunç", point: 438, img: "https://github.com/shadcn.png" },
];

export default function Authors() {
  return (
    <Card className="p-4 lg:p-6 mt-5 bg-[#F5F5F5] max-xl:border max-xl:m-5 gap-0 py-0 border-0 rounded-none shadow-none max-lg:mb-5 max-xl:bg-white max-xl:rounded-lg">
      <h2 className="text-base lg:text-lg font-semibold mb-4 text-neutral-800 mt-4">
        Popüler Yazarlar
      </h2>
      <div className="space-y-3 lg:space-y-4">
        {authors.map((author, i) => (
          <div
            key={author.name}
            className={`flex items-center space-x-4 transition-all p-2 rounded-lg group hover:scale-[1.05] hover:shadow-lg cursor-pointer relative border border-gray-200 bg-white/60 backdrop-blur-md ${author.leader ? 'before:content-[""] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-amber-400' : ''}`}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <div className="relative">
              <Avatar className={`w-8 h-8 lg:w-10 lg:h-10 border-2 ${author.leader ? 'border-amber-400' : 'border-blue-100'} group-hover:shadow-lg group-hover:scale-110 transition-all`}>
                <AvatarImage src={author.img} alt={author.name} />
                <AvatarFallback>{author.name.slice(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {author.leader && (
                <span className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-1 shadow-md">
                  <Crown className="w-3 h-3 text-white" />
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <p className="font-semibold text-xs lg:text-sm truncate text-gray-900">{author.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 inline-block" />
                {author.point} Puan
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
