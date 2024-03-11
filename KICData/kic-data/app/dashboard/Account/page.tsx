"use client";
import Image from "next/image";
import React, { useEffect } from "react";

export interface LinkWebsite {
  link: string;
  name: string;
  connected: boolean;
}

const websiteLink = (websiteLink: string) => {
  useEffect(() => {
    return;
  }, []);
  return (
    <div className="w-[100px] h-[100px] rounded-md bg-blue-500">
      <h1></h1>
      <Image src={websiteLink} w />
    </div>
  );
};
export default function Accounts() {
  const [Links, setLinks] = useState<LinkWebsite>();
  return <div>{}</div>;
}
