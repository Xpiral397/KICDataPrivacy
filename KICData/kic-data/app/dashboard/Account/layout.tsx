"use client";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
  ScrollShadow,
  Tab,
  Tabs,
} from "@nextui-org/react";
import React, { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image1 from "@/public/learn/trustService.jpg";
import cityGov from "@/public/learn/cityGov.jpg";
import republic from "@/public/learn/repbulic.jpg";
import workflow from "@/public/learn/workflowdigaram.jpg";
import Load from "@/public/learn/load.jpg";
import Motor from "@/public/learn/motor.jpg";
import { StaticImageData } from "next/image";
import Logo from "@/public/favicon.ico";
import NextVideo from "react-player";

function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [push, setPush] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<StaticImageData>(Image1);
  const [currentUrl, setCurrentUrl] = useState<string>(
    "https://youtube.com/watch?v=vTWywg4DVpg&si=5CSTejlggFbyGc8r"
  );

  //youtube.com/watch?v=vTWywg4DVpg&si=5CSTejlggFbyGc8r
  useEffect(() => {
    const TimeChanger = setTimeout(() => {
      setCurrentImage(
        [Image1, Load, cityGov, republic, workflow, Motor][
          Math.floor(Math.random() * 5)
        ]
      );
    }, 3000);
    return () => {
      clearTimeout(TimeChanger);
    };
  }, [currentImage]);

  return (
    <div className="w-full h-full flex sm:flex-row flex-col space-x-3 ">
      <div>
        <ScrollShadow
          orientation="vertical"
          className="px-3 space-y-5  py-3 rounded-lg overflow-hidden"
        >
          <div className="sm:w-[500px] w-full py-3 px-4 h-full">
            {/* <Card
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-7"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Your day your way
              </p>
              <h4 className="text-white/90 font-medium text-xl">
                Data Privacy
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src={currentImage.src}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <Image
                  alt="Breathing app icon"
                  className="rounded-full w-10 h-11 bg-black"
                  src={Logo.src}
                />
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">Data Privacy App</p>
                  <p className="text-tiny text-white/60">
                    Educate Yourself About Data Privacy
                  </p>
                </div>
              </div>
              <Button radius="full" size="sm">
                <a href="/Learns/Learn/pis">Learn More</a>
              </Button>
            </CardFooter>
          </Card>
           */}
            <CardRender>
              <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src={currentImage.src}
              />
            </CardRender>
          </div>
          <CardRender>
            <NextVideo
              className="sm:w-[500px] w-full rounded-lg"
              url={
                "https://youtube.com/watch?v=vTWywg4DVpg&si=5CSTejlggFbyGc8r"
              }
            />
          </CardRender>
          <CardRender>
            <NextVideo
              className="sm:w-[500px] w-full rounded-lg"
              url={
                "https://youtube.com/watch?v=6vNxslcf9AE&si=GJJ7ZRdZz7qzMDBm"
              }
            />
          </CardRender>{" "}
          <CardRender>
            <NextVideo
              className="sm:w-[500px] w-full rounded-lg"
              url={
                "https://youtube.com/watch?v=UHeQABHx7d4&si=YaDTDFtu1IWn_JPp"
              }
            />
          </CardRender>
        </ScrollShadow>
      </div>

      <div className="w-full items-center flex flex-col  h-full">
        {children}
      </div>
    </div>
  );
}

export default Layout;

export function CardRender({ children }: { children: ReactNode }) {
  return (
    <Card
      isFooterBlurred
      className="w-[550px] h-[300px] col-span-12 sm:col-span-7"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">
          Your day your way
        </p>
        <h4 className="text-white/90 font-medium text-xl">Data Privacy</h4>
      </CardHeader>
      {children}
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-10 h-11 bg-black"
            src={Logo.src}
          />
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">Data Privacy App</p>
            <p className="text-tiny text-white/60">
              Educate Yourself About Data Privacy
            </p>
          </div>
        </div>
        <Button radius="full" size="sm">
          <a href="/Learns/Learn/pis">Learn More</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
