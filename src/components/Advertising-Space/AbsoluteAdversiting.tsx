export default function AbsoluteAdversiting(props) {
    return (
        <div className={props.class === "left" ? "absolute top-[20%] w-[8%] left-[8%] max-2xl:hidden" : "absolute top-[20%] w-[8%] right-[8%] max-2xl:hidden"}>
            <div className="border text-slate-500 rounded h-[700px] w-full">
                <div className="flex justify-center items-center h-full">
                    <span className="text-gray-500 font-medium text-sm">Reklam Alanı</span>
                </div>
            </div>
        </div>
    )
}