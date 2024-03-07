"use client";
import { resetEmailRequest } from "@/app/helpers/resetEmail";
import DotGrid from "@/design/dot";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";

export default function ResetEmail(param: any) {
  const { uid, token } = param;
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetEmail = async () => {
    try {
      // Perform client-side validation
      if (!email || !confirmEmail) {
        setError("Please enter both email and confirm email.");
        return;
      }

      if (email !== confirmEmail) {
        setError("Emails do not match. Please enter matching email addresses.");
        return;
      }

      // Make the reset email request
      const response = await resetEmailRequest(uid, token, email);

      // Update state with the response message
      setResetMessage(response.message);
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError("Error resetting email. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-between bg-white h-full w-full relative items-center flex-row"
      data-label="sign-in"
    >
      {/* ... (your existing code) ... */}

      <form method="POST" className="rounded-md flex flex-col space-y-5">
        <div>
          {/* ... (your existing code) ... */}
          <label className="text-slate-700 mb-2 font-[500] font-[Helvetica]">
            Your Email
          </label>
          <input
            type="text"
            placeholder="joe@gmail.com"
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white w-full px-4 py-2 border border-slate-400 rounded-md focus:outline-none focus:border-slate-900"
          />
        </div>

        <div className="mt-5 mb-5">
          {/* ... (your existing code) ... */}
          <label className="text-slate-800 mb-3 bg-white font-[400] font-[Helvetica]">
            Confirm Email
          </label>
          <input
            type="text"
            name="Email"
            placeholder="Re-enter your email address"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="w-full px-4 py-2 border bg-white border-slate-400 rounded-md focus:outline-none focus:border-slate-900"
          />
        </div>

        {error && <div className="text-red-600 font-bold mb-3">{error}</div>}

        <Button
          className="bg-purple-500 text-slate-100 rounded-md"
          onClick={handleResetEmail}
        >
          Reset Email
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
