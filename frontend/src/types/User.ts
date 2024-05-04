export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;

  fullname: string,
  gender: string | null,
  dateOfBirth: string | null,
  height: number | null,
  weight: number | null,
  disease: string | null,
  smoking: string | null,
  sunExposure: string | null

  userType: ('Advisee' | 'Dietitian' | 'AcademicianDietitian' | 'Admin');

  [key: string]: unknown;
}
