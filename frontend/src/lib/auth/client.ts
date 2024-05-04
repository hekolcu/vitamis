'use client';

import type { User } from '@/types/User';
import { login, registerUser, getUserDetails, uploadFile } from './auth-utils';

// const user = {
//   id: 'USR-000',
//   avatar: '/assets/avatar.png',
//   firstName: 'Sofia',
//   lastName: 'Rivers',
//   email: 'sofia@devias.io',
// } satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    const { firstName, lastName, email, password } = params;
    const registrationData = {
        fullname: `${firstName} ${lastName}`,
        email,
        password, // Assuming the backend expects password here
        // You may need to include additional fields as per your backend requirements
    };

    const success = await registerUser(registrationData);
    if (!success) {
        return { error: 'Failed to register user' };
    }

    // Registration successful, but does not automatically log the user in or generate a token
    // The client application might need to direct the user to log in manually next
    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    // Here you would replace the hardcoded check with an API call
    const response = await login({ email, password });
    if (!response.token) {
      return { error: 'Invalid credentials' };
    }

    localStorage.setItem('custom-auth-token', response.token);
    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');
    if (!token) {
      return { data: null, error: 'No authentication token found' };
    }

    const userDetails = await getUserDetails(token);
    if (!userDetails) {
      return { data: null, error: 'Failed to fetch user details' };
    }

    return { data: userDetails };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }

  async uploadDieticianFile(file: File, email: string): Promise<{ error?: string }> {
    const success = await uploadFile({file: file}, email);
    if (!success) {
      return { error: 'Failed to upload file' };
    }
    return {};
  }
}

export const authClient = new AuthClient();
