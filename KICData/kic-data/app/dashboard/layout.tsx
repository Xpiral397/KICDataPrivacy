import { SingleSidebarBoardLayout } from "@/components/sidebar";
import { ReactNode } from "react";
import Navbar from "./navbar";

export default function SidebarBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col ">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="w-[300px]">
        <SingleSidebarBoardLayout />
      </div>
      <main>{children}</main>
    </div>
  );
}
