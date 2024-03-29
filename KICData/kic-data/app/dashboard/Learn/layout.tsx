"use client";
import DotGrid from "@/design/dot";
import { ListAltTwoTone } from "@mui/icons-material";
import { List } from "@mui/material";
import {
  Button,
  Code,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Input } from "postcss";
import React, { ReactNode, useEffect, useState } from "react";

function Layout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [set, sets] = useState<number>(0);
  const [expand, setExpand] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/Learn/pis");
  }, []);
  return (
    <div className="flex w-full h-full justify-center items-start">
      <div className="flex flex-row justify-around items-start">
        <div className="lg:hidden">
          <div onClick={() => onOpen()} className="text-black">
            <ListAltTwoTone />
          </div>
          {isOpen ? (
            <Modal
              size="full"
              onClose={onClose}
              isOpen={isOpen}
              onOpenChange={onOpen}
            >
              <ModalContent>
                {(onClose) => {
                  return (
                    <>
                      <ModalHeader>Awearnes Page</ModalHeader>
                      <ModalBody className="grid grid-cols-2 gap-4">
                        <ul className="md:block flex flex-col md:space-x-0 space-x-10 list rounded-lg space-y-10 bg-slate-50  py-20 px-3 text-sm font-[500]">
                          <li
                            onClick={() => {
                              router.push("/dashboard/Learn/pis");
                              sets(0);
                            }}
                            className={`${
                              set == 0
                                ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                                : ""
                            }`}
                          >
                            Information Security
                          </li>
                          <li
                            onClick={() => {
                              router.push("/dashboard/Learn/pm");
                              sets(1);
                            }}
                            className={`${
                              set == 1
                                ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                                : ""
                            }`}
                          >
                            Password Management
                          </li>
                          <li
                            onClick={() => {
                              router.push("/dashboard/Learn/upp");
                              sets(2);
                            }}
                            className={`${
                              set == 2
                                ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                                : ""
                            }`}
                          >
                            Understandng Privacy & Policy
                          </li>

                          <li
                            onClick={() => {
                              router.push("/dashboard/Learn/sic");
                              sets(3);
                            }}
                            className={`${
                              set == 3
                                ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                                : ""
                            }`}
                          >
                            Secure Internet Connection
                          </li>
                          <li
                            onClick={() => {
                              sets(4);
                              router.push("/dashboard/Learn/wdb");
                            }}
                            className={`${
                              set == 4
                                ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                                : ""
                            }`}
                          >
                            What iS Data Breach
                          </li>
                          <li
                            onClick={() => {
                              sets(5);
                              router.push("/dashboard/Learn/uyr");
                            }}
                            className={`${
                              set == 5
                                ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                                : ""
                            }`}
                          >
                            Understand Your Rights{" "}
                          </li>
                          <li
                            onClick={() => {
                              sets(6);
                              router.push("/dashboard/Learn/uct");
                            }}
                            className={`${
                              set == 6
                                ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                                : ""
                            }`}
                          >
                            Use Of Cookies And Tracking{" "}
                          </li>
                          <li
                            onClick={() => {
                              sets(7);
                              router.push("/dashboard/Learn/pfa");
                            }}
                            className={`${
                              set == 7
                                ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                                : ""
                            }`}
                          >
                            PhisingScan And Fruda Awearness{" "}
                          </li>
                        </ul>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                      </ModalFooter>
                    </>
                  );
                }}
              </ModalContent>
            </Modal>
          ) : (
            ""
          )}
        </div>
        <div className="lg:block hidden">
          <ul className="md:block flex md:space-x-0 space-x-10 list rounded-lg space-y-10 bg-slate-50  py-20 px-3 text-sm font-[500]">
            <li
              onClick={() => {
                router.push("/dashboard/Learn/pis");
                sets(0);
              }}
              className={`${
                set == 0
                  ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                  : ""
              }`}
            >
              Information Security
            </li>
            <li
              onClick={() => {
                router.push("/dashboard/Learn/pm");
                sets(1);
              }}
              className={`${
                set == 1
                  ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                  : ""
              }`}
            >
              Password Management
            </li>
            <li
              onClick={() => {
                router.push("/dashboard/Learn/upp");
                sets(2);
              }}
              className={`${
                set == 2
                  ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                  : ""
              }`}
            >
              Understandng Privacy & Policy
            </li>

            <li
              onClick={() => {
                router.push("/dashboard/Learn/sic");
                sets(3);
              }}
              className={`${
                set == 3
                  ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                  : ""
              }`}
            >
              Secure Internet Connection
            </li>
            <li
              onClick={() => {
                sets(4);
                router.push("/dashboard/Learn/wdb");
              }}
              className={`${
                set == 4
                  ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                  : ""
              }`}
            >
              What iS Data Breach
            </li>
            <li
              onClick={() => {
                sets(5);
                router.push("/dashboard/Learn/uyr");
              }}
              className={`${
                set == 5
                  ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                  : ""
              }`}
            >
              Understand Your Rights{" "}
            </li>
            <li
              onClick={() => {
                sets(6);
                router.push("/dashboard/Learn/uct");
              }}
              className={`${
                set == 6
                  ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                  : ""
              }`}
            >
              Use Of Cookies And Tracking{" "}
            </li>
            <li
              onClick={() => {
                sets(7);
                router.push("/dashboard/Learn/pfa");
              }}
              className={`${
                set == 7
                  ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                  : ""
              }`}
            >
              PhisingScan And Fruda Awearness{" "}
            </li>
            
            <li
              onClick={() => {
                sets(7);
                router.push("/dashboard/Learn/psp");
              }}
              className={`${
                set == 7
                  ? "border-l-blue-600  border-l h-10 flex flex-col items-center justify-center w-[70%]"
                  : ""
              }`}
            >
              Payment Security Page
            </li>
          </ul>
        </div>

        <ScrollShadow
          orientation="vertical"
          hideScrollBar
          className="h-screen max-h-screen w-full lg:w-[900px] items-center flex flex-col  "
        >
          {children}
        </ScrollShadow>
      </div>{" "}
    </div>
  );
}

export default Layout;
