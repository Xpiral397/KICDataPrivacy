"use client";
import DotGrid from "@/design/dot";
import {InputRounded, SearchRounded} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  User,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const items = [
    {
      key: "new",
      label: "Login",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];
  const { data, status } = useSession();
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/auth/login");
    }
  });
  return (
    <nav className="h-16 px-10 flex items-center justify-between bg-blue-500 w-full">
      <div className="flex items-center space-x-5">
        <DotGrid gridSize={4} spacing={4} dotRadius={1} dotColor="white" />
        <h1 className="text-white font-[600]  text-xl">KICData</h1>
      </div>

      <ul className="flex items-center justify-center space-x-10 ">
        <ul className="flex items-center  text-white font-[500] space-x-10 text-sm  ">
          <Input  startContent=<SearchRounded color="secondary"/> size="sm" className="lg:block hidden  w-[300px]" endContent={<InputRounded color="secondary"/>}/>
          <a href = '/dashboard/Account' className=" pointer">Account</a>
          <li
          className="pointer"
            onClick={() => {
              router.push("Learn");
            }}
          >
            Learn
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src={data?.user?.image ?? ""}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">
                  {data?.user?.userData?.name ?? data?.user?.name ?? ""}
                </p>
                <p className="font-semibold">
                  {data?.user?.userData?.email ?? data?.user?.email ?? ""}
                </p>
              </DropdownItem>
              {/* <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Activity Log</DropdownItem>
              <DropdownItem key="team_settings">Notfications</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">Data Deletation</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem> */}
              <DropdownItem
                onClick={() => {
                  signOut();
                }}
                key="logout"
                color="danger"
              >
                <Button
                  onClick={() => {
                    signOut();
                  }}
                  className="px-2 w-full bg-danger-300 text-white font-[600]"
                >
                  Log Out
                </Button>{" "}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </ul>
    </nav>
  );
}
