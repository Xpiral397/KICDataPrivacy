"use client";
import { SingleSidebarBoardLayout } from "@/components/sidebar";
import { ReactNode, useEffect } from "react";
import Navbar from "./navbar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SidebarBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status !== "authenticated") {
      router.push("/auth/login");
    } else {
      router.push("/dashboard/Account");
    }
  }, []);
  return session.status === "authenticated" ? (
    <div className="h-full flex flex-col">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex justify-center w-full h-full items-center place-items-center">
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  ) : (
    ""
  );
}
