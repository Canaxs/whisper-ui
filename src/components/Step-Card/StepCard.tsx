import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";


export default function StepCard(props) {
    return (
        <Card className="hover:shadow-lg hover:bg-gray-50 cursor-pointer transition-all w-full h-64">
            <CardHeader>
                <CardTitle>
                    <span className="text-gray-600 font-medium drop-shadow-md">{props.title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col text-sm">
                    <div className="flex gap-1 items-center drop-shadow-md">
                        <span>{props.posts ? <FaCheck className="size-4 text-green-600"/> : <FaTimes className="size-4 text-red-600"/>}</span>
                        <span>{props.posts} Paylaşım Hakkı</span>
                    </div>
                    <div className={props.money ? "flex gap-1 mt-2 items-center" : "flex gap-1 mt-2 items-center opacity-65"}>
                        <span>{props.money ? <FaCheck className="size-4 text-green-600"/> : <FaTimes className="size-4 text-red-600"/>}</span>
                        <span className="drop-shadow-md">Para Kazanma</span>
                    </div>
                    <div className={props.exclusive ? "flex gap-1 mt-2 items-center" : "flex gap-1 mt-2 items-center opacity-65"}>
                        <span>{props.exclusive ? <FaCheck className="size-4 text-green-600"/> : <FaTimes className="size-4 text-red-600"/>}</span>
                        <span className="drop-shadow-md">Seçkin Hesap</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}