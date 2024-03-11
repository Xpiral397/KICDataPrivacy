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

type Features =
  | "Data Overview"
  | "Consent Management"
  | "Data Access"
  | "Data Detection Request"
  | "Personal Security"
  | "Password Management"
  | "Privacy & Policy"
  | "Secure Connection"
  | "Data Breaches"
  | "Cookies & Tracking"
  | "Phishing & Fraudulent"
  | "Payment Security";

export function SingleSidebarBoardLayout() {
  const [selected, select] = useState<Features>("Data Overview");
  return (
    <div className="flex w-full items-center bg-blue-50">
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
                    <HomeOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Data Overview");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Data Overview"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/"} className="w-full text-inherit ">
                    Data Overview
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={
                    <PeopleAltOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Consent Management");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Consent Management"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    Consent Management
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={
                    <EventAvailableOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Data Access");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Data Access"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    <div className="w-full flex justify-between items-center  ">
                      <h1>Data Access</h1>
                      <div className="bg-red-500 text-[10px] font-bold text-white w-[20px] h-[20px] flex justify-center items-center  rounded-full ">
                        10
                      </div>
                    </div>
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={<YouTube className="w-5 hover:text-white" />}
                  onClick={() => {
                    select("Data Detection Request");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Data Detection Request"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    Data Detection Request
                  </Link>
                </Button>
              </li>
            </ul>
          </ScrollShadow>

          <h1 className="text-slate-500 font-[550] px-3">Data Awearness </h1>

          <ScrollShadow
            orientation="vertical"
            hideScrollBar
            className="px-5 max-h-full overflow-scroll bg-blue-50 dark:bg-slate-900  w-full h-full rounded-md flex flex-col justify-between  "
          >
            <ul className="px-2 py-2 md:space-y-3">
              <li>
                <Button
                  startContent={
                    <HomeOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Personal Security");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Personal Security"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/"} className="w-full text-inherit ">
                    Personal Security
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={
                    <HomeOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Payment Security");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Payment Security"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/"} className="w-full text-inherit ">
                    Payment Security
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={
                    <HomeOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Secure Connection");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Secure Connection"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/"} className="w-full text-inherit ">
                    Secure Connection
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={
                    <PeopleAltOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Cookies & Tracking");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Cookies & Tracking"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    Cookies & Tracking
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={
                    <EventAvailableOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Password Management");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Password Management"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    <div className="w-full flex justify-between items-center  ">
                      <h1>Password Management</h1>
                      <div className="bg-red-500 text-[10px] font-bold text-white w-[20px] h-[20px] flex justify-center items-center  rounded-full ">
                        10
                      </div>
                    </div>
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={<YouTube className="w-5 hover:text-white" />}
                  onClick={() => {
                    select("Data Breaches");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Data Breaches"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    Data Breaches
                  </Link>
                </Button>
              </li>

              <li>
                <Button
                  startContent={
                    <HomeOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Payment Security");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Payment Security"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/"} className="w-full text-inherit ">
                    Fraudulnet Alert
                  </Link>
                </Button>
              </li>
            </ul>
          </ScrollShadow>
          <h1 className="text-slate-500 font-[550] px-3">Data Overview</h1>
          <ScrollShadow
            orientation="vertical"
            hideScrollBar
            className="px-5 max-h-full overflow-scroll bg-blue-50 dark:bg-slate-900 shadow-xl w-full h-full rounded-md flex flex-col justify-between  "
          >
            <ul className="px-2 py-2 md:space-y-3">
              <li>
                <Button
                  startContent={
                    <PeopleAltOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Personal Security");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Consent Management"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    Friends
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={
                    <EventAvailableOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Data Access");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Data Access"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    <div className="w-full flex justify-between items-center  ">
                      <h1>Event</h1>
                      <div className="bg-red-500 text-[10px] font-bold text-white w-[20px] h-[20px] flex justify-center items-center  rounded-full ">
                        10
                      </div>
                    </div>
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={<YouTube className="w-5 hover:text-white" />}
                  onClick={() => {
                    select("Data Detection Request");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Data Detection Request"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    Watch Video
                  </Link>
                </Button>
              </li>
            </ul>
          </ScrollShadow>

          <ScrollShadow
            orientation="vertical"
            hideScrollBar
            className="px-5 max-h-full overflow-scroll bg-blue-50 dark:bg-slate-900 shadow-xl w-full h-full rounded-md flex flex-col justify-between  "
          >
            <ul className="px-2 py-2 md:space-y-3">
              <li>
                <Button
                  startContent={
                    <PeopleAltOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Personal Security");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Consent Management"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    Friends
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={
                    <EventAvailableOutlined className="w-5 hover:text-white" />
                  }
                  onClick={() => {
                    select("Data Access");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Data Access"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    <div className="w-full flex justify-between items-center  ">
                      <h1>Event</h1>
                      <div className="bg-red-500 text-[10px] font-bold text-white w-[20px] h-[20px] flex justify-center items-center  rounded-full ">
                        10
                      </div>
                    </div>
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  startContent={<YouTube className="w-5 hover:text-white" />}
                  onClick={() => {
                    select("Data Detection Request");
                  }}
                  className={`w-full rounded-md ${
                    selected == "Data Detection Request"
                      ? "dark:bg-purple-700 bg-blue-500 text-white"
                      : "bg-bue-50 dark:bg-slate-900 text-slate-500"
                  } text-start font-[500]`}
                >
                  <Link href={"/Feed"} className="w-full text-inherit ">
                    Watch Video
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
