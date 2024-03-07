"use client";
import DotGrid from "@/design/dot";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import Google from "@/public/icons/google.svg";
import { Select, SelectItem } from "@nextui-org/react";
import { UserDataError, signup } from "@/app/helpers/signupUser";
import StatusModal from "@/components/Modal";

export default function Login() {
  const [formData, setFormData] = useState({
    surname: "ola",
    othername: "",
    email: "",
    password: "",
    rePassword: "",
    gender: "MALE",
    keepLoggedIn: false,
  });
  const [sucessModal, setSuccessModal] = useState<boolean>(false);
  const [UserDataError, setError] = useState<UserDataError>({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError({});
    const response = await signup(formData);
    if (response.status == 400) {
      setError((prev: UserDataError) => {
        return { ...prev, ...response.dataError };
      });
      console.log(UserDataError, "Ji");
    } else if (response.status == 201) {
      setSuccessModal(!sucessModal);
    }
    // Handle form submission, e.g., send data to the server
    console.log("Form data submitted:", formData);
  };

  return (
    <div
      className="flex justify-between bg-white h-full w-full relative items-center flex-row "
      data-label="sign-in"
    >
      {sucessModal && (
        <div className=" flex items-center justify-center top-0 right-0 absolute w-full h-full z-[1000]">
          <StatusModal
            status="CREATED_SUCCESS"
            onSendActivationLink={() => {}}
          />
        </div>
      )}
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
          className="px-10 py-10 bg-white  lg:bg-amber-50 w-full  md:w-[450px] lg:w-[500px] rounded-[20px]"
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
          <h1 className="text-slate-800 text-xl font-[600] font-[Helvetica]">
            Sign Up.
          </h1>
          <h1 className="text-slate-600 font-[450] mb-5 mt-2 text-[12.5px]">
            Log in with your KICData data that you entered during your
            registration
          </h1>

          <div className="mb-20">
            <Button
              startContent={<img src={Google.src} width={"32"} />}
              className="bg-white w-full font-[400]"
            >
              Sign in with Google
            </Button>
          </div>

          <form method="POST" className="  rounded-md  flex flex-col space-y-5">
            <div>
              <div className="flex items-center space-x-2">
                <div>
                  <label
                    className={`text-sm ${
                      UserDataError.name ? "text-danger" : "text-slate-700"
                    } mb-2 font-[500] font-[Helvetica]`}
                  >
                    Surname{" "}
                    <span className="text-danger-500">
                      :{UserDataError.surname}
                    </span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Jessica"
                    onChange={(e: any) =>
                      setFormData((prev) => ({
                        ...prev,
                        surname: e.target.value,
                      }))
                    }
                    name="username"
                    classNames={{
                      inputWrapper: "py-2 rounded-md h-10 text-slate-900",
                    }}
                  />
                </div>
                <div>
                  <label
                    className={`text-sm ${
                      UserDataError.name ? "text-danger-500" : "text-slate-700"
                    } mb-2 font-[500] font-[Helvetica]`}
                  >
                    Othername{" "}
                    <span className="text-danger-500">
                      :{UserDataError.name}
                    </span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Your other name"
                    onChange={(e: any) =>
                      setFormData((prev) => ({
                        ...prev,
                        othername: e.target.value,
                      }))
                    }
                    name="othername"
                    classNames={{
                      inputWrapper: "py-2 rounded-md h-10 ",
                    }}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label
                  className={`text-sm ${
                    UserDataError.email ? "text-danger-500" : "text-slate-700"
                  } mb-2 font-[500] font-[Helvetica]`}
                >
                  Your Email{" "}
                  <span className="text-danger-500">
                    :{UserDataError.email && UserDataError.email}
                  </span>
                </label>
                <Input
                  type="email"
                  placeholder="joe@gmail.com"
                  name="email"
                  onChange={(e: any) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  classNames={{
                    inputWrapper: "py-2 rounded-md h-10 ",
                  }}
                />
              </div>

              <div className="mt-5 mb-5">
                <label
                  className={`text-sm ${
                    UserDataError.password
                      ? "text-danger-500"
                      : "text-slate-700"
                  } mb-2 font-[500] font-[Helvetica]`}
                >
                  Password{" "}
                  <span className="text-danger-500">
                    :{UserDataError.password && UserDataError.password[0]}
                  </span>
                </label>
                <Input
                  type="password"
                  onChange={(e: any) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  name="password"
                  placeholder="At least 8 character"
                  classNames={{
                    inputWrapper: "py-2 rounded-md h-10 ",
                  }}
                />
              </div>

              <div className="mt-5 mb-5">
                <label
                  className={`text-sm ${
                    UserDataError.rePassword || UserDataError.password
                      ? "text-danger-500"
                      : "text-slate-700"
                  } mb-2 font-[500] font-[Helvetica]`}
                >
                  Confirm Password{" "}
                  <span className="text-danger-500">
                    :{UserDataError.rePassword && UserDataError.rePassword[0]}
                  </span>
                </label>
                <Input
                  type="password"
                  name="rePassword"
                  onChange={(e: any) =>
                    setFormData((prev) => ({
                      ...prev,
                      rePassword: e.target.value,
                    }))
                  }
                  placeholder="Confirm Your Password "
                  classNames={{
                    inputWrapper: "py-2 rounded-md h-10",
                  }}
                />
              </div>

              <Select
                onChange={(e: any) =>
                  setFormData((prev) => ({ ...prev, gender: e.target.value }))
                }
                name="gender"
                label="Select Your Genders"
                className="max-w-x"
              >
                {["MALE", "FEMALE", "PREFER-NOT-TO-SAY"].map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </Select>

              <div className="space-x-">
                <input
                  type="checkbox"
                  onChange={(e: any) =>
                    setFormData((prev) => ({
                      ...prev,
                      keepLoggedIn: e.target.value,
                    }))
                  }
                />
                <label className="text-[12px] text-slate-900 font-[600] font-[Helvetica]">
                  Keep me logged in
                </label>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              className="bg-purple-500 text-slate-100 rounded-md "
            >
              Sign Up
            </Button>
            <div className="space-y-5 flex items-center flex-col">
              <h1 className="text-purple-900 space-x-2">
                <span>Don't here an account?</span>
                <span className="text-purple-800 font-[600]">Login</span>
              </h1>
              <h1 className="text-purple-800">Already have account ?</h1>
            </div>
          </form>
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
                <div className="rotate-260 absolute top-[18%] mr-[20px] border-r-white border-t-white border-r-[7px] border-t-[7px] h-[90px] w-[200px] space-y-2 flex flex-col items-center  bg-transparent  px-5 py-2 rounded-md"></div>
              </div>
            </div>
          </div>
          <div className="w-full absolute right-0 top-0   hidden lg:flex">
            <DotGrid
              gridSize={25}
              spacing={15}
              dotRadius={0.51}
              dotColor="white"
            />
          </div>

          <div className="right-0 top-0 absolute ">
            <DotGrid
              gridSize={25}
              spacing={15}
              dotRadius={0.51}
              dotColor="yellow"
            />
          </div>
        </div>

        <div className="bg-purple-900 relative w-full">
          <div className="w-full absolute left-0 bottom-0 hidden lg:flex">
            <DotGrid
              gridSize={25}
              spacing={20}
              dotRadius={0.51}
              dotColor="blue"
            />
          </div>
          <div className="left-1  bottom-0 absolute ">
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
