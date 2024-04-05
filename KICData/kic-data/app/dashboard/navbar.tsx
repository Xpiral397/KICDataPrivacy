"use client";
import DotGrid from "@/design/dot";
import { InputRounded, Person, SearchRounded } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Code,
  Divider,
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
import { clearConsent } from "./layout";

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
  console.log(data);
  return (
    <nav className="h-16 px-10 flex items-center justify-between bg-blue-500 w-full">
      <div className="flex items-center space-x-5">
        <DotGrid gridSize={4} spacing={4} dotRadius={1} dotColor="white" />
        <h1 className="text-white font-[600]  text-xl">KICData</h1>
      </div>

      <ul className="flex items-center justify-center space-x-10 ">
        <ul className="flex items-center  text-white font-[500] space-x-10 text-sm  ">
          <Input
            startContent=<SearchRounded color="secondary" />
            size="sm"
            className="lg:block hidden  w-[300px]"
            endContent={<InputRounded color="secondary" />}
          />
          <a href="/dashboard/Account" className=" pointer">
            Account
          </a>
          <li className="pointer">
            <a href="/Learns">Learn</a>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src={(data as any)?.user?.image ?? ""}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="w-[350px]"
            >
              <DropdownItem key="profile" className=" bg-zinc-100 gap-2">
                <div className="flex w-full justify-between items-center ">
                  <Avatar
                    isBordered
                    as="button"
                    className="mx-6"
                    className="transition-transform"
                    src={(data as any)?.user?.image ?? ""}
                  />
                  <div>
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">
                      {(data as any)?.user?.userData?.name ??
                        data?.user?.name ??
                        ""}
                    </p>
                    <p className="font-semibold">
                      {(data as any)?.user?.userData?.email ??
                        data?.user?.email ??
                        ""}
                    </p>
                  </div>
                </div>
              </DropdownItem>

              <DropdownItem key="settings">
                <h1 className="mt-8 flex  items-center justify-between">
                  <span>
                    <Person />
                  </span>
                  <p className="font-[500]">Account Personal Information</p>
                </h1>
                <Divider />
                <div className="mt-5 flex justify-between items-center">
                  <span className="font-[500]">Full Name:</span>
                  <Code className="font-[500] min-w-[30px]">
                    {(data as any).user?.userData?.name}
                  </Code>
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <span className="font-[500]">Surname:</span>
                  <Code className="font-[500] min-w-[30px]">
                    {(data as any).user?.userData?.name.split(" ")[0]}
                  </Code>
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <span className="font-[500]">Other Names:</span>
                  <Code className="font-[500] min-w-[30px]">
                    {(data as any).user?.userData?.name?.split(" ", 1)[1]}
                  </Code>
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <span className="font-[500]">Username:</span>
                  <Code className="font-[500] min-w-[30px]">
                    {(data as any).user?.userData?.username}
                  </Code>
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <span className="font-[500]">Email:</span>
                  <Code className="font-[500]" color="secondary">
                    {(data as any).user?.userData?.email
                      ? "Confirmed"
                      : "Not Confirmed"}
                  </Code>
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <span className="font-[500]">Gender:</span>
                  <Code className="font-[500]  text-center w-[50px]">
                    {(data as any).user?.userData?.gender}
                  </Code>
                </div>
                <h1 className="mt-8 flex  items-center justify-between">
                  <span>
                    <Person />
                  </span>
                  <p className="font-[500]">Log in Details</p>
                </h1>
                <Divider />
                <div className="mt-5 flex justify-between items-center">
                  <span className="font-[500]">Date Joined:</span>
                  <Code className="font-[500]" color={"danger"}>
                    {(data as any).user?.userData?.date_joined.split("T")[0]}
                  </Code>
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <span className="font-[500]">Last Login:</span>
                  <Code className="font-[500]" color="success">
                    {
                      (
                        (data as any).user?.userData?.last_login ?? "Today"
                      )?.split("T")[0]
                    }
                  </Code>
                </div>
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  signOut();
                  clearConsent();
                  router.push("/auth/login");
                }}
                key="logout"
                color="danger"
              >
                <Button
                  onClick={() => {
                    signOut();
                    clearConsent();
                    router.push("/auth/login");
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
