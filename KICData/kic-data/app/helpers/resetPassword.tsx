// resetPassword.ts
export const resetPasswordRequest = async (
  uid: string,
  token: string,
  new_password: string,
  re_new_password: string
) => {
  
  const url = "http://localhost:8000/auth/users/reset_password_confirm/"; // Replace with your actual Django endpoint
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, token, new_password, re_new_password }),
    });

    if (!response.ok) {
      return "PASSWORD_RESET_FAILED";
    }
    return "PASSWORD_RESET_SUCCESS";
  } catch (error) {
    return "PASSWORD_RESET_FAILED";
  }
};
