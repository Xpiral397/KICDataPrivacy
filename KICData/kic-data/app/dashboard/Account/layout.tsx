"use client";
import { Tab, Tabs } from "@nextui-org/react";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <div className="w-full bg-500">
        <div className="mt-1 rounded-md w-full flex flex-wrap gap-4">
          <Tabs
            className="bg-white"
            color={"secondary"}
            aria-label="Tabs colors"
            radius="full"
          >
            <Tab key="Linked Account" title="Linked Account" />
            <Tab key="music" title="Connected" />
            <Tab key="Disconnect" title="Disconected" />
          </Tabs>
          <Tabs />
        </div>
      </div>
    </div>
  );
}

export default Layout;
