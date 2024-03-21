export interface UserData {
  country?: string;
  surname?: string;
  name?: string;
  username?: string;
  othername?: string;
  email?: string;
  password?: string;
  rePassword?: string;
  gender?: string;
  keepLoggedIn?: boolean;
}
export interface UserDataError {
  surname?: string;
  othername?: string;
  name?: string;
  email?: string;
  password?: string;
  rePassword?: string;
  gender?: string;
  keepLoggedIn?: boolean;
  country?: string;
}

export interface SignupResponse {
  status: number;
  data?: any;
  error?: string;
  dataError?: UserDataError;
}

export async function signup(userData: UserData): Promise<SignupResponse> {
  try {
    // Replace the URL with your actual signup endpoint
    const apiUrl = "https://xpiral.pythonanywhere.com/auth/users/";

    // Adjust the payload based on your API requirements
    const payload: UserData = {
      username: userData.email,
      surname: userData.surname,
      othername: userData.othername,
      email: userData.email,
      password: userData.password,
      rePassword: userData.rePassword,
      gender: userData.gender,
      name: userData.surname + " " + userData.othername,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      // Return the status code and response data
      return { status: response.status, data };
    } else if (response.status === 400) {
      const dataError: UserDataError = await response.json();
      return { status: 400, dataError };
    } else {
      // Return the status code and error message
      return { status: response.status, error: response.statusText };
    }
  } catch (error: any) {
    // Return an error status code and message
    console.log(error.status);
    return { status: 500, error: error.message || "Internal Server Error" };
  }
}
