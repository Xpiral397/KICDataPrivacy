"use client";
import React, { ReactNode, useState } from "react";
import {
  EventAvailableOutlined,
  Home,
  HomeOutlined,
  HomeTwoTone,
  Movie,
  MovieCreation,
  PeopleAltOutlined,
  PhotoLibrary,
  ShoppingBagOutlined,
  ShoppingCartOutlined,
  Verified,
  YouTube,
} from "@mui/icons-material";
import { Button, Divider, ScrollShadow, User } from "@nextui-org/react";
import Link from "next/link";

type Features = "Account" | "Insight";
export function SingleSidebarBoardLayout() {
  const [selected, select] = useState<Features>("Account");
  return (
    <div className="flex h-full w-full items-center bg-blue-50 py-10">
      <nav className="flex flex-col  space-y-5 w-full ">
        <ul className="flex  h-full flex-col w-full">
          <h1 className="text-slate-500 font-[550] px-3">Data Overview</h1>

          <ScrollShadow
            orientation="vertical"
            hideScrollBar
            className="px-5 max-h-full overflow-scroll bg-blue-50 dark:bg-slate-900 w-full h-full rounded-md flex flex-col justify-between  "
          >
            <ul className="px-2 py-2 md:space-y-3">
              <li>
                <Button
                  startContent={
                    <PeopleAltOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Account");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Account"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link
                    href={"dashboard/Account"}
                    className="w-full text-inherit "
                  >
                    Account
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={
                    <PeopleAltOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Insight");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Insight"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    Self Insight
                  </Link>
                </Button>
              </li>
            </ul>
          </ScrollShadow>
        </ul>
      </nav>
    </div>
  );
}
