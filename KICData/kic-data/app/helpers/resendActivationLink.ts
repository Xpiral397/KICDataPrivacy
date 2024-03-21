
export async function ResendActivateEmailLink(email:string,code_send_if_failed?:string)  {
  try {
    // Replace the URL with your actual signup endpoint
    const apiUrl = "https://xpiral.pythonanywhere.com/auth/users/resend_activation/";

    // Adjust the payload based on your API requirements
  
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    });

    if (response.status === 204) {
      return "EMAIL_RESEND_ACTIVATION_LINK_SUCCESS";
    }
    return code_send_if_failed ?? "Error"
  } catch(error: any) {
    console.log("Hello")
    // Return an error status code and message
    return code_send_if_failed ?? "Error"
 
  }
}
