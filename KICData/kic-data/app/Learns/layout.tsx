"use client";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "../dashboard/navbar";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { isSigIn } from "../helpers/authenticate";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Spinner,
} from "@nextui-org/react";
import { List } from "@mui/icons-material";

export function clearConsent() {
  localStorage.removeItem("consent");
}

export default function SidebarBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [set, sets] = useState(0);

  const menuItems = [
    { title: "Information Security", route: "/Learns/Learn/pis", index: 0 },
    { title: "Password Management", route: "/Learns/Learn/pm", index: 1 },
    {
      title: "Understanding Privacy & Policy",
      route: "/Learns/Learn/upp",
      index: 2,
    },
    {
      title: "Secure Internet Connection",
      route: "/Learns/Learn/sic",
      index: 3,
    },
    { title: "What is Data Breach", route: "/Learns/Learn/wdb", index: 4 },
    { title: "Understand Your Rights", route: "/Learns/Learn/uyr", index: 5 },
    {
      title: "Use of Cookies and Tracking",
      route: "/Learns/Learn/uct",
      index: 6,
    },
    {
      title: "Phishing Scan and Fraud Awareness",
      route: "/Learns/Learn/pfa",
      index: 7,
    },
    { title: "Payment Security Page", route: "/Learns/Learn/psp", index: 8 },
  ];

  useEffect(() => {
    if (accepted || JSON.parse(localStorage.getItem("consent") || "false")) {
      router.push("/Learns/Learn");
      setLoading(false);
    } else if (session.status === "unauthenticated") {
      if (JSON.parse(localStorage.getItem("consent") || "false")) {
        clearConsent();
      }
      router.push("/auth/login");
      setLoading(false);
    } else if (session.status === "authenticated") {
      (async () => {
        const response = await isSigIn(
          (session?.data?.user as any)?.refreshToken
        );
        if (
          response &&
          JSON.parse(localStorage.getItem("consent") || "false")
        ) {
          router.push("/Learns/Learn");
          setLoading(false);
        } else if (
          response &&
          !JSON.parse(localStorage.getItem("consent") || "false")
        ) {
          setIsOpen(true);
        } else {
          signOut();
          setLoading(false);
        }
      })();
    }
  }, [accepted, session.status]);

  if (session.status === "authenticated") {
    return (
      <>
        <div className="flex w-full h-full">
          <main className="w-full">
            <div className="w-full ">{!loading && children}</div>
          </main>
        </div>
      </>
    );
  } else if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center top-0 right-0 absolute w-full h-full z-[1000]">
      <div className="bg-white shadow-2xl shadow-blue-900 rounded-md w-full max-w-[450px] sm:w-[500px] flex space-x-5 items-center place-items-center justify-center h-[300px]">
        <Spinner color="secondary" />
        <h1 className="text-purple-800 font-[600]">Processing...</h1>
      </div>
    </div>
  );
}
