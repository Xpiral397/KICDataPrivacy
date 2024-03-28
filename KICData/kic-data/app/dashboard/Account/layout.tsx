"use client";
import { Tab, Tabs } from "@nextui-org/react";
import React, { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [push, setPush] = useState<boolean>(false);
  return (
    <div className="w-full h-full items-center justify-center">
      <div className="w-full items-center flex flex-col  h-full">
        {children}
      </div>
    </div>
  );
}

export default Layout;
