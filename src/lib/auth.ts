import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import env from '../config/env';

export type AuthTokenPayload = {
  id: string;
  email: string;
  role: string;
};

export const hashPassword = async (password: string) => bcrypt.hash(password, 10);

export const comparePassword = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const signAccessToken = (payload: AuthTokenPayload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' });

export const verifyAccessToken = (token: string): AuthTokenPayload =>
  jwt.verify(token, env.jwtSecret) as AuthTokenPayload;
