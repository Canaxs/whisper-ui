import ToggleMenu from "@/components/ToggleMenu/ToggleMenu";

export function MobileHeader(props) {

    const {logo} = props;

    return (
        <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
            <a href="/"><img src={logo} alt="Söylenti" className="cursor-pointer w-13 h-12 hover:-rotate-6 transition-all" title="Söylenti"/></a>
            <ToggleMenu logo={"../"+logo} />
        </div>
    )
}