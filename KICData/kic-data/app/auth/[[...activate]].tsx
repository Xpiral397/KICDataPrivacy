import DotGrid from "@/design/dot";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";

export default function Login(emailActivation:string[]) {

  return (
    <div
      className="flex justify-between bg-white h-full w-full relative items-center flex-row "
      data-label="sign-in"
    >
      <div className=" w-full h-full absolute  ">
        <div className="lg:hidden bg-purple-900 overflow-hidden relative w-full h-full">
          <div className="w-full absolute left-0 top-0 ">
            <DotGrid
              gridSize={100}
              spacing={10}
              dotRadius={1}
              dotColor="white"
            />
          </div>
        </div>
      </div>

      <div
        className="z-10 rounded-md flex   items-center  justify-center h-full w-full "
        data-label="label"
      >
        <div
          className="px-10 py-10 bg-white  lg:bg-amber-50 w-full  md:w-[450px] lg:w-[500px] rounded-md"
          data-label="container"
        >
          <div
            data-label="dots"
            className="mb-10 lg:mt-20 flex space-x-2 mt-[2px] items-center h-full w-full "
          >
            <div>
              <DotGrid gridSize={4} spacing={4} dotRadius={1} dotColor="blue" />
            </div>
            <h1 className="text-[14.5px]   font-[550] text-purple-600">
              KICData Privacy
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full h-full lg:block hidden overflow-hidden ">
        <div className="bg-purple-900 overflow-hidden relative w-full h-full">
          <div className=" rounded-md px-10  w-full h-full flex flex-col items-center right-0  mt-[20%] absolute z-[1000]">
            <div className="w-[500px] space-y-2 flex flex-col items-center shadow-2xl shadow-purple-600 bg-white px-5 py-2 rounded-md">
              <h1 className="font-[600] text-purple-900 ">
                Keep your data safe
              </h1>
              <p className="text-[15px] text-purple-800 font-[Arial, Helvetica, sans-serif] font-[500] ">
                Keep your eyes on your data, focus on your privacy rather than
                your restriction of privacy accessible for vunerebility
              </p>
            </div>
            <div className="w-2 h-40 bg-white "></div>
            <div className="flex space-x-10">
              <div className="w-[200px] space-y-2 flex flex-col items-center shadow-2xl shadow-purple-600 bg-white px-5 py-2 rounded-md">
                <h1 className="font-[600] text-purple-900 ">
                  Keep your data safe
                </h1>
                <p className="text-[15px] text-purple-800 font-[Arial, Helvetica, sans-serif] font-[500] ">
                  Keep your eyes on your data
                </p>
                <div className="absolute top-[18%] -mr-16 border-t-white border-l-white border-t-[7px] border-l-[7px] h-[90px] w-[200px] space-y-2 flex flex-col items-center  bg-transparent  px-5 py-2 rounded-md"></div>
              </div>

              <div className="w-[200px] space-y-2 flex flex-col items-center shadow-2xl shadow-purple-600 bg-white px-5 py-2 rounded-md">
                <h1 className="font-[600] text-purple-900 ">
                  Keep your data safe
                </h1>
                <p className="text-[15px] text-purple-800 font-[Arial, Helvetica, sans-serif] font-[500] ">
                  Keep your eyes on your data, focus on your privacy rather than
                </p>
                <div className="rotate-260 absolute top-[18%] mr-[30px] border-r-white border-t-white border-r-[7px] border-t-[7px] h-[90px] w-[200px] space-y-2 flex flex-col items-center  bg-transparent  px-5 py-2 rounded-md"></div>
              </div>
            </div>
          </div>
          <div className="w-full absolute right-0 top-0   hidden lg:flex">
            <DotGrid
              gridSize={150}
              spacing={15}
              dotRadius={0.51}
              dotColor="white"
            />
          </div>
          <div className="right-0 top-0 absolute ">
            <DotGrid
              gridSize={225}
              spacing={15}
              dotRadius={0.51}
              dotColor="yellow"
            />
          </div>
        </div>

        <div className="bg-purple-900 relative w-full">
          <div className="w-full absolute left-0 bottom-0 hidden lg:flex">
            <DotGrid
              gridSize={150}
              spacing={20}
              dotRadius={0.51}
              dotColor="blue"
            />
          </div>
          <div className="left-1  bottom-0 absolute ">
            <DotGrid
              gridSize={125}
              spacing={20}
              dotRadius={0.69}
              dotColor="orange"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
