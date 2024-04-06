"use client";
import { Progress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/Account");
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1>Loading...</h1>
      <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />
    </div>
  );
}
