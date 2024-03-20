import { User } from "../../types/User";
// import {VitaminRecommendation} from "../types/VitaminRecommendation";

const api = 'https://api.vitamis.hekolcu.com/';

interface RegistrationData {
    fullname: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface GetUserDetailResponseBody {
    fullname: string;
    email: string;
    gender?: string;
    dateOfBirth?: string;
    height?: number;
    weight?: number;
    disease?: string;
    smoking?: string;
    sunExposure?: string;
  }

async function registerUser(registrationData: RegistrationData): Promise<boolean> {
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

async function login(loginData: LoginData): Promise<{ token: string | null }> {
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
            const body: {token: string} = await response.json() as {token: string};
            // console.log(body);
            return body
        } else {
            return { token: null };
        }
    } catch (error) {
        return { token: null };
    }
}

async function getUserDetails(token: string): Promise<User | null> {
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
            const responseBody: GetUserDetailResponseBody = await response.json() as GetUserDetailResponseBody;

            // Construct a User object with all necessary properties, including defaults for id and avatar
            const userDetails: User = {
                id: 'USR-000', // Default id
                avatar: '/assets/avatar.png', // Default avatar
                fullname: responseBody.fullname,
                email: responseBody.email,
                gender: responseBody.gender ?? null,
                dateOfBirth: responseBody.dateOfBirth ?? null,
                height: responseBody.height ?? null,
                weight: responseBody.weight ?? null,
                disease: responseBody.disease ?? null,
                smoking: responseBody.smoking ?? null,
                sunExposure: responseBody.sunExposure ?? null,
            };

            return userDetails;
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
    smoking: boolean,// Yes, No
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
// async function getRecommendations(token: string): Promise<{
//     groupName: string;
//     recommendedVitamins: VitaminRecommendation[];
// } | null> {
//     const endpoint = api + "recommendations/vitamins"

//     try {
//         const response = await fetch(endpoint, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (response.ok) {
//             return await response.json();
//         } else {
//             return null;
//         }
//     } catch (error) {
//         return null;
//     }
// }


export { login, registerUser, getUserDetails, updateProfile };