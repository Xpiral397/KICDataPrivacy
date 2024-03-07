// ResetPassword.tsx
"use client";
import { resetPasswordRequest } from "@/app/helpers/resetPassword";
import DotGrid from "@/design/dot";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";

export default function ResetPassword(param: any) {
  const { uid, token } = param;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
      // Perform client-side validation
      if (!password || !confirmPassword) {
        setError("Please enter both password and confirm password.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match. Please enter matching passwords.");
        return;
      }

      // Make the reset password request
      const response = await resetPasswordRequest(uid, token, password);

      // Update state with the response message
      setResetMessage(response.message);
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError("Error resetting password. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-between bg-white h-full w-full relative items-center flex-row"
      data-label="reset-password"
    >
      {/* ... (your existing code) ... */}

      <form method="POST" className="rounded-md flex flex-col space-y-5">
        <div>
          <div>
            {" "}
            <h1 className="text-slate-800 text-xl font-[600] font-[Helvetica]">
              password Reset.
            </h1>
            <h1 className="text-slate-600 font-[450] mb-5 mt-2 text-[15px]">
              Rest Your Password
            </h1>
          </div>
          <label className="text-slate-700 mb-2 font-[500] font-[Helvetica]">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white w-full px-4 py-2 border border-slate-400 rounded-md focus:outline-none focus:border-slate-900"
          />
        </div>

        <div className="mt-5 mb-5">
          {/* ... (your existing code) ... */}
          <label className="text-slate-800 mb-3 bg-white font-[400] font-[Helvetica]">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border bg-white border-slate-400 rounded-md focus:outline-none focus:border-slate-900"
          />
        </div>

        {error && <div className="text-red-600 font-bold mb-3">{error}</div>}

        <Button
          className="bg-purple-500 text-slate-100 rounded-md"
          onClick={handleResetPassword}
        >
          Reset Password
        </Button>

        <div className="space-y-5 flex items-center flex-col">
          <h1 className="text-purple-900 space-x-2">
            <span>{resetMessage}</span>
          </h1>
        </div>
      </form>
    </div>
  );
}
