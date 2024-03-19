export async function postData(username: string, formData: FormData): Promise<number> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/cookies/accounts/${username}`, {
      method: 'POST',
       headers: {
                'Content-Type': 'multipart/form-data',
            },
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


export function timestampToTime(timestamp: number): string {
  const milliseconds = timestamp / 1000;
  const epochStart = Date.UTC(1601, 0, 1);
  const date = new Date(milliseconds + epochStart);
  return date.toISOString(); // Return ISO 8601 formatted date string
}


