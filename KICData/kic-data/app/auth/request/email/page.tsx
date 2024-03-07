// ResetPassword.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState<{
    success: boolean;
    message: string | null;
  }>({ success: false, message: null });

  const handleResetPassword = async () => {
    try {
      const response = await fetch("http://localhost:8000/password/reset/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setResetStatus({
          success: true,
          message:
            "Password reset email sent successfully. Check your email for further instructions.",
        });
      } else {
        const errorData = await response.json();
        setResetStatus({
          success: false,
          message:
            errorData.detail || "Email reset request failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setResetStatus({
        success: false,
        message: "Error sending email reset request. Please try again.",
      });
    }
  };

  return (
    <div className="w-full bg-cyan-50 text-slate-900">
      {resetStatus.success ? (
        <div>
          <h1 className="bg-slate-900 text-2xl mb-2">Password Reset</h1>
          <label>Email:</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleResetPassword}>Reset Password</Button>
        </div>
      ) : (
        <div>
          <h1>We have sent You the Reset Password Link</h1>
          <h1>{resetStatus.message}</h1>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
