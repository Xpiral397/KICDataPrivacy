import {Refresh} from "@mui/icons-material";

export async function fetchCurrentUser(username:string , password:string) : Promise<{ refreshToken: string, userData: any } | null> {
    console.log(username,password)
    try {
        // Step 1: Authenticate and obtain tokens
        const loginResponse = await fetch('https://xpiral.pythonanywhere.com/auth/jwt/create/', {
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
        const userResponse = await fetch('https://xpiral.pythonanywhere.com/auths/user/me/', {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${access}`,
            },
        });
        if(!userResponse.ok) {
            return null
        }
        const userData = await userResponse.json();

        // Step 3: Return the access token and user data
        return { refreshToken: refresh, userData: userData };

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function isSigIn(refresh_token:string){
    try {
        // Step 1: Authenticate and obtain tokens
        const loginResponse = await fetch('https://xpiral.pythonanywhere.com/auth/jwt/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               refresh:refresh_token
            }),
        });

        if(loginResponse.ok){
            return true
        }
        return false
    }
    catch(e){
        return null
    }
}


export async function  getCookies(refresh_token:string, attepmts:string){
    let access_token:any
    try{
        access_token = await fetch('https://xpiral.pythonanywhere.com/auth/jwt/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refresh_token
            }),
        });

        const access = await access_token.json()
        console.log(access.access)
    const userResponse = await fetch(`https://xpiral.pythonanywhere.com/auths/user/get-cookies/${attepmts}/`, {
        method: 'GET',
        headers: {
            'Authorization': `JWT ${access.access}`,
        },
    });
    if(!userResponse.ok) {
        return null
    }
    const cookies = await userResponse.json();
    // Step 3: Return the access token and user data
    return cookies
}

 catch (error) {
    console.error('Error:', error);
    return null;
}
} 