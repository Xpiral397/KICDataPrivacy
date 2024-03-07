// resetPassword.ts
export const resetPasswordRequest = async (
  uid: string,
  token: string,
  password: string
) => {
  const url = "http://localhost:8000/your-reset-password-endpoint/"; // Replace with your actual Django endpoint

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, token, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error making the reset password request");
  }
};
