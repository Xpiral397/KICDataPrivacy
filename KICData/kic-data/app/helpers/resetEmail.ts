// utils/api.js
export const resetEmailRequest = async (uid:string, token:string,email:string) => {
  const url = 'http://localhost:8000/your-reset-email-endpoint/';  // Replace with your actual Django endpoint

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, token, email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error making the reset email request');
  }
};
