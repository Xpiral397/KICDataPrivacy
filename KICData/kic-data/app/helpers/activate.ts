export interface EmailActivationPayLoad{
    uid: string;
    token:string
}

export async function ActivateEmail(params:EmailActivationPayLoad) {
  try {
    // Replace the URL with your actual signup endpoint
    const apiUrl = "http://127.0.0.1:8000/auth/users/activation/";
    console.log

    // Adjust the payload based on your API requirements
    const payload: EmailActivationPayLoad = {
        "uid":params.uid,
        "token": params.token
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 204) {
      return 
    }
    return response.json()
  } catch (error: any) {
    // Return an error status code and message
    return { status: 500, error: error.message || "Internal Server Error" };
  }
}
