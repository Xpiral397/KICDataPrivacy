import { SingleSidebarBoardLayout } from "@/components/sidebar";
import { ReactNode } from "react";

export default function SidebarBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex w-[300px]">
      <SingleSidebarBoardLayout />
      <main>{children}</main>
    </div>
  );
}
