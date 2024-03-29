"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@nextui-org/react";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status == "authenticated") {
      router.push("/Learns/Learn");
    } else {
      router.push("/auth/login");
    }
  });
  return (
    <div className="flex items-center justify-center top-0 right-0 absolute w-full h-full z-[1]"></div>
  );
}
