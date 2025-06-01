import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default function Authors() {
  return (
    <Card className="p-4 lg:p-6 mt-5 bg-[#F5F5F5] max-xl:border max-xl:m-5 gap-0 py-0 border-0 rounded-none shadow-none max-lg:mb-5 max-xl:bg-white max-xl:rounded-lg">
      <h2 className="text-base lg:text-lg font-semibold mb-4 text-neutral-800 mt-4">
        Popüler Yazarlar
      </h2>
      <div className="space-y-3 lg:space-y-4">
        <div className="flex items-center space-x-4 hover:scale-110 cursor-pointer transition-all p-2">
          <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 space-y-1">
            <p className="font-medium text-xs lg:text-sm truncate">Meriç</p>
            <p className="text-xs text-gray-500">6758 Puan</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 hover:scale-110 cursor-pointer transition-all p-2">
          <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 space-y-1">
            <p className="font-medium text-xs lg:text-sm truncate">Kenan</p>
            <p className="text-xs text-gray-500">3558 Puan</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 hover:scale-110 cursor-pointer transition-all p-2">
          <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 space-y-1">
            <p className="font-medium text-xs lg:text-sm truncate">Tunç</p>
            <p className="text-xs text-gray-500">438 Puan</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
