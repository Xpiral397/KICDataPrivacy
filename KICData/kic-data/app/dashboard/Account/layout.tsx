"use client";
import { Tab, Tabs } from "@nextui-org/react";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full items-center justify-center">
      <div className="w-full items-center flex flex-col  h-full">
        {children}
      </div>
    </div>
  );
}

export default Layout;
