import { fetchCurrentUser } from "../authenticate";

export async function authorize(credentials: any, req: any) {
  try {
    const { email, password } = credentials;
    const response = await fetchCurrentUser(email ?? "", password ?? "");

    // If authentication fails, return null
    if (response === null) {
      return null;
    }

    // If authentication succeeds, return the user data and include the refresh token in the session
    return {
      ...response.userData,
      refreshToken: response.refreshToken,
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
