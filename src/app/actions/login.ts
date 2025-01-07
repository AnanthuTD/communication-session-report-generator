'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Secret key for JWT signing, should be stored securely (use .env.local)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET); // Use TextEncoder for jose
const JWT_EXPIRATION_TIME = 30 * 24 * 60 * 60; // 30 days in seconds

// Mock database values from .env.local for demonstration
const EMAIL = process.env.LOGIN_EMAIL;
const PASSWORD = process.env.LOGIN_PASSWORD;

// Function to create JWT
const createJWT = async (email: string) => {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .sign(JWT_SECRET);
};

// Action to handle login
export const authenticateUser = async (email: string, password: string) => {
  if (email === EMAIL && password === PASSWORD) {
    const token = await createJWT(email);
    const cookieStore = cookies();

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: JWT_EXPIRATION_TIME,
    });

    return { success: true };
  } else {
    return { message: 'Invalid credentials', success: false };
  }
};

// Function to verify the JWT
export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { valid: true, payload };
  } catch (error) {
    console.error('JWT verification failed:', error);
    return { valid: false, error: 'Invalid token' };
  }
};
