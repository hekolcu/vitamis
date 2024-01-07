import {User} from "../types/User";
import {VitaminRecommendation} from "../types/VitaminRecommendation";

const api = 'https://api.vitamis.hekolcu.com/';

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
            const body = await  response.json();
            console.log(body);
            return body
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

async function updateProfile(token: string, user: {
    gender: string,// male, female
    dateOfBirth: string,// yyyy-mm-dd
    height: number,// cm
    weight: number,// kg
    disease: string,
    sunExposure: string,// low, moderate, high
    smoking: boolean
}): Promise<boolean> {
    const endpoint = api + "user/details"

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user),
        });

        return response.ok;
    } catch (error) {
        return false;
    }
}

// get api + recommendations/vitamins + token
async function getRecommendations(token: string): Promise<{
    groupName: string;
    recommendedVitamins: VitaminRecommendation[];
} | null> {
    const endpoint = api + "recommendations/vitamins"

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


export {login , registerUser, getUserDetails, updateProfile, getRecommendations};