import DotGrid from "@/design/dot";
import { Button } from "@nextui-org/button";
import React from "react";

export default function TabBar(data: {}) {
  return (
    <div className="flex justify-between bg-wite" data-label="sign-in">
      <div className="flex justify-center h-full w-full " data-label="label">
        <div className="w-[400px]" data-label="container">
          <div data-label="dots" className="mt-20 flex items-center space-x-2">
            <DotGrid gridSize={4} spacing={2} dotRadius={2} dotColor="white" />
            <h1 className="text-[12px] font-[550] text-purple-600">
              KICData Privacy
            </h1>
          </div>
          <form method="POST" className="flex flex-col space-y-5">
            <div>
              <h1 className="text-slate-900 font-[600] font-[Helvetica]">
                Log in.
              </h1>
              <h1 className="text-slate-200 text-sm">
                Log in with your data that you enterrd during your registration
              </h1>

              <div>
                <label className="text-slate-900 font-[600] font-[Helvetica]">
                  Your Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-slate-900 font-[600] font-[Helvetica]">
                  At least 8 character
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex items-centerspace-x-2">
                <input
                  type="checkbox"
                  className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-slate-900"
                />
                <label className="text-slate-900 font-[600] font-[Helvetica]">
                  Keep me logged in
                </label>
              </div>
            </div>
            <Button className="bg-purple-500 text-slate-100 rounded-md ">
              Log in
            </Button>
            <div className="space-y-5">
              <h1>
                Don't here an account?
                <span className="text-purple-800 font-[600]">Sign up</span>
              </h1>
              <h1 className="text-purple-800">Forget password?</h1>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-purple-900 relative">
        <div className="absolute right-0 top-0">
          <DotGrid gridSize={10} spacing={10} dotRadius={1} dotColor="white" />
        </div>
      </div>
    </div>
  );
}
