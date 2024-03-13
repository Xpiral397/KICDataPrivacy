"use client";
import { Progress, Tab, Tabs } from "@nextui-org/react";
import React from "react";

export default function RenderHomePage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />
    </div>
  );
}
