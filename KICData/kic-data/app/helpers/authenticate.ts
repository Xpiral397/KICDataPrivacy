export async function fetchCurrentUser(username:string , password:string) : Promise<{ refreshToken: string, userData: any } | null> {
    try {
        // Step 1: Authenticate and obtain tokens
        const loginResponse = await fetch('http://127.0.0.1:8000/auth/jwt/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: username,
                password: password,
            }),
        });
        const {access, refresh} = await loginResponse.json();
        console.log(access)
        // Step 2: Fetch user data using the access token
        const userResponse = await fetch('http://127.0.0.1:8000/auths/user/me/', {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${access}`,
            },
        });
        const userData = await userResponse.json();

        // Step 3: Return the access token and user data
        return { refreshToken: refresh, userData: userData };

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}