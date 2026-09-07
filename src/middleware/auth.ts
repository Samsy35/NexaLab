import type { NextFunction, Request, Response } from 'express';

import { verifyAccessToken } from '../lib/auth';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token d\'authentification requis.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = verifyAccessToken(token);
    return next();
  } catch {
    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès interdit pour ce rôle.' });
    }

    return next();
  };
};
