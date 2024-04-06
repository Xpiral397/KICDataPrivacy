"use client";
import React, { ReactNode } from "react";
import Navbar from "../dashboard/navbar";
import { ScrollShadow } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const { data, status } = useSession();
  const router = useRouter();
  if (status == "unauthenticated") {
    router.push("/auth/login");
  }
  return (
    <>
      <Navbar />
      <ScrollShadow
        orientation="horizontal"
        hideScrollBar
        className="flex flex-col items-center w-full h-full max-h-full "
      >
        <div className="flex justify-around w-full h-full ">
          <div className="w-[300px] h-full">
            <div className="px-2 py-6 shadow-md ">
              <h2 className="px-8 py-10 mb-4 text-3xl font-semibold text-white bg-blue-500 rounded-lg">
                Data Privacy
              </h2>
            </div>
            <aside className="h-[50vh] p-4 rounded-lg shadow-md bg-slate-white">
              <ol className="space-y-2">
                <li>
                  <a
                    href="/consentForm/forms/info"
                    className="text-[15px] hover:underline text-slate-800"
                  >
                    How Your Data Will Be Used
                  </a>
                </li>
                <li>
                  <a
                    href="/consentForm/forms/data"
                    className="text-[15px] hover:underline text-slate-800"
                  >
                    Data Information
                  </a>
                </li>
                <li>
                  <a
                    href="/consentForm/forms/device"
                    className="text-[15px] hover:underline text-slate-800"
                  >
                    Device Information
                  </a>
                </li>
              </ol>
            </aside>
          </div>

          <ScrollShadow
            orientation="horizontal"
            hideScrollBar
            className="h-[100%] md:h-[100%] lg:h-[100%] w-full lg:w-[900px] items-center flex flex-col overflow-scroll  "
          >
            {children}
          </ScrollShadow>
        </div>
        <footer className="w-full py-4 mt-8 text-white bg-blue-600 ">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </footer>
      </ScrollShadow>
    </>
  );
}
