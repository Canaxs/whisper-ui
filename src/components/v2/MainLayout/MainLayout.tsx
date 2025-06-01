import React from "react";
import Categories from "../Categories/Categories";
import RightSidebarTalks from "../RightSidebarTalks/RightSidebarTalks";
import Authors from "../Authors/Authors";
import Sidebar from "../Sidebar/Sidebar";
import HeaderV2 from "../HeaderV2/HeaderV2";
import FooterArea from "@/components/Footer-Area/FooterArea";

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <HeaderV2 />

      <div className="bg-white flex flex-col lg:flex-row">
        <Sidebar />
        {children}
      </div>

      <FooterArea />
    </div>
  );
};

export default MainLayout;
