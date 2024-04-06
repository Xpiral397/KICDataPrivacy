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
import Navbar from "../../dashboard/navbar";

function Layout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [set, sets] = useState<number>(0);
  const [expand, setExpand] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, []);
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex items-start justify-center w-full h-full"> </div>
    </>
  );
}

export default Layout;
