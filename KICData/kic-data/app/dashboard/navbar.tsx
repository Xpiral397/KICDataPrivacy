"use client";
import { Link, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";

export default function Navbar() {
  const { data } = useSession();
  return (
    <nav className="h-20 px-10 flex items-center justify-between bg-slate-700 w-full">
      <div>
        <h1 className="text-white font-[600]  text-xl">KICData</h1>
      </div>
      <ul className="flex text-white font-[500] space-x-10 ">
        <li>Security</li>
        <li>Alert</li>
        <li>Support</li>
        <div>
          <User
            name={data?.user?.name}
            description={<h1>{data?.user?.email}</h1>}
            avatarProps={{
              src: data?.user?.image ?? "",
            }}
          />
        </div>
      </ul>
    </nav>
  );
}
