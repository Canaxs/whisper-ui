import PanelLogin from "@/components/Panel-Login/Panel-Login";

export default function Login() {
    return (
        <div className="flex justify-center items-center h-full flex-col"> 
            <a href="/"><img src="../logo-black.png" width={"100px"} height={"100px"} alt="Söylenti" /></a>
            <p className="font-medium mb-5 mt-2 text-sm text-slate-600">Söylenti - Bir Haber Sitesinden Çok Daha Fazlası</p>
            <PanelLogin />
        </div>
    )
}