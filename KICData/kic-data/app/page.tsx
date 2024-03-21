'use client'
import {Link} from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Spinner} from "@nextui-org/react";

export default function Home() {
   const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status == "authenticated") {
      router.push("/dashboard/Account");
    }
    else {
      router.push("/auth/login");
    }
  });
  return  <div className="flex items-center justify-center top-0 right-0 absolute w-full h-full z-[1000]">
          <div className="bg-white shadow-2xl shadow-blue-900   rounded-md w-full  max-w-[450px] sm:w-[500px] flex space-x-5 items-center place-items-center justify-center h-[300px]">
            <Spinner color="secondary" />
            <h1 className="text-purple-800 font-[600]">
              KICDataPrivacy ensures safety and security by thoroughly checking for vulnerabilities and securing internet connections
            </h1>
          </div>
        </div>
}
