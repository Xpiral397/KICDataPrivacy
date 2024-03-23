// resetPassword.ts
export const requestForResetPasswordLink = async (
 email:string
) => {
  const url = "https://xpiral.pythonanywhere.com/auth/users/reset_password/"; // Replace with your actual Django endpoint

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      return "PASSWORD_RESET_FAILED";
    }
    return "PASSWORD_RESET_SUCCESS";
  } catch (error) {
    return "PASSWORD_RESET_FAILED";
  }
};
