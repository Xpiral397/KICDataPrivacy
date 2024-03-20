"use client";
import { authorize } from "@/app/helpers/XXRSAgent/activate";
import StatusModal from "@/components/Modal";
import DotGrid from "@/design/dot";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [auth, setAuth] = useState<boolean>(false);
  const [failed, error] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();

  return (
    <div
      className="relative flex flex-row items-center justify-between w-full h-full bg-white "
      data-label="sign-in"
    >
      <div className="absolute w-full h-full ">
        <div className="relative w-full h-full overflow-hidden bg-purple-900 lg:hidden">
          <div className="absolute top-0 left-0 w-full ">
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
        className="z-10 flex items-center justify-center w-full h-full rounded-md "
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

          {failed && (
            <StatusModal
              status="LOGIN_FAILED"
              onSendActivationLink={() => {}}
            />
          )}

          {auth && (
            <div className="flex items-center justify-center top-0 right-0 absolute w-full h-full z-[1000]">
              <div className="bg-white shadow-2xl shadow-blue-900   rounded-md w-full  max-w-[450px] sm:w-[500px] flex space-x-5 items-center place-items-center justify-center h-[300px]">
                <Spinner color="secondary" />
                <h1 className="text-purple-800 font-[600]">Logging in...</h1>
              </div>
            </div>
          )}

          <form method="POST" className="flex flex-col space-y-5 rounded-md ">
            <div>
              <h1 className="text-slate-800 text-xl font-[600] font-[Helvetica]">
                Log in.
              </h1>
              <h1 className="text-slate-600 font-[450] mb-5 mt-2 text-[15px]">
                Log in with your KICData data that you entered during your
                registration
              </h1>

              <div>
                <label className="text-slate-700 mb-2 font-[500] font-[Helvetica]">
                  Your Email
                </label>
                <input
                  type="text"
                  placeholder="joe@gmail.com"
                  name="username"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="w-full px-4 py-2 bg-white border rounded-md border-slate-400 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="mt-5 mb-5">
                <label className="text-slate-800 mb-3 bg-white font-[400] font-[Helvetica]">
                  Password
                </label>
                <input
                  type="password"
                  name="username"
                  placeholder="At least 8 character"
                  onChange={(e) => {
                    setPassword(e.target.value ?? "");
                  }}
                  className="w-full px-4 py-2 bg-white border rounded-md border-slate-400 focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>
            <Button
              onClick={(e) => {
                if (email && password) {
                  
                    (async () => {
                      setAuth(true);
                      error(false);
                      await signIn("credentials", {
                        email,
                        password,
                        redirect: false,
                      });
                      setAuth(false);
                      error(true);
                    })().catch((e) =>{
                    error(true);
                    setAuth(false);
                    })
                }
              }}
              className="bg-purple-500 rounded-md text-slate-100 "
            >
              Log in
            </Button>
            <div className="flex flex-col items-center space-y-5">
              <h1 className="space-x-2 text-purple-900">
                <span>Don't heve an account?</span>
                <span
                  className="text-purple-800 font-[600] pointer"
                  onClick={() => {
                    router.push("/auth/signup");
                  }}
                >
                  Sign up
                </span>
              </h1>
              <a
                href="/auth/reset_password"
                className="pointer text-purple-800"
              >
                Forget password?
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden w-full h-full overflow-hidden lg:block ">
        <div className="relative w-full h-full overflow-hidden bg-purple-900">
          <div className=" rounded-md px-10  w-full h-full flex flex-col items-center right-0  mt-[20%] absolute z-[1]">
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
                <div className="rotate-260 absolute top-[18%] mr-[20px] border-r-white border-t-white border-r-[7px] border-t-[7px] h-[90px] w-[200px] space-y-2 flex flex-col items-center  bg-transparent  px-5 py-2 rounded-md"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 hidden w-full lg:flex">
            <DotGrid
              gridSize={25}
              spacing={15}
              dotRadius={0.51}
              dotColor="white"
            />
          </div>

          <div className="absolute top-0 right-0 ">
            <DotGrid
              gridSize={25}
              spacing={15}
              dotRadius={0.51}
              dotColor="yellow"
            />
          </div>
        </div>

        <div className="relative w-full bg-purple-900">
          <div className="absolute bottom-0 left-0 hidden w-full lg:flex">
            <DotGrid
              gridSize={25}
              spacing={20}
              dotRadius={0.51}
              dotColor="blue"
            />
          </div>
          <div className="absolute bottom-0 left-1 ">
            <DotGrid
              gridSize={25}
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
