import { CalendarDays } from "lucide-react"
 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
 

export default function HovCard(props) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <a href={"/user/"+props.name}>
                    <Button variant="link" className={"p-0 "+props.buttonClass}>@{props.name}
                    </Button>
                </a>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex space-x-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@{props.name}</h4>
                    <p className="text-sm">
                    </p>
                    <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                        2024 Yılında Katıldı
                    </span>
                    </div>
                </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}