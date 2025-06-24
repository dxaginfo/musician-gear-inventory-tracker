import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import logger from '../utils/logger';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}

/**
 * Authentication middleware using Firebase
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No authentication token provided' });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = authHeader.split('Bearer ')[1];
    
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error: any) {
      logger.error('Error verifying Firebase token:', error);
      return res.status(403).json({ message: 'Invalid or expired authentication token' });
    }
  } catch (error) {
    logger.error('Authentication middleware error:', error);
    return res.status(500).json({ message: 'Internal server error during authentication' });
  }
};

/**
 * Role-based authorization middleware
 */
export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userRole = req.user.role || 'user';
    
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
  };
};