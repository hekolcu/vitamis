import {User} from "../types/User";

const api = 'http://api.vitamis.hekolcu.com:8080/';

async function registerUser(registrationData: any): Promise<boolean> {
    const endpoint = api + 'auth/register';
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST'
            },
            body: JSON.stringify(registrationData),
        });

        return response.ok;
    } catch (error) {
        return false;
    }
}

async  function login(loginData: any): Promise<{token: string | null}> {
    const endpoint = api + "auth/login"

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            return await response.json();
        } else {
            return {token: null};
        }
    } catch (error) {
        return {token: null};
    }
}

async  function getUserDetails(token: string): Promise<User | null> {
    const endpoint = api + "user/details"

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export {login , registerUser, getUserDetails};