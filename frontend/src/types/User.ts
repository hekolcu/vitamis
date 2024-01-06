interface User {
    fullname: string,
    email: string,
    gender: string,
    dateOfBirth: string | null,
    height: number | null,
    weight: number | null,
    disease: string | null,
    smoking: string | null,
    sunExposure: string | null
}

export type {User};