export async function postData(username: string, formData: FormData): Promise<number> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/cookies/accounts/${username}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      return 409
    }
  } catch (error) {
    return 409
    // Handle error as needed
    }
    return 200
}



