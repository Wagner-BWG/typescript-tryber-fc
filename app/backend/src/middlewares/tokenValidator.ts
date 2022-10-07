import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

class TokenValidator {
  public validateToken =
  async (req:Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || 'jwt_secret';

    if (typeof token === 'string') {
      try {
        const user: string | jwt.JwtPayload | null = jwt.verify(token, secret);
        if (user && typeof user === 'object') {
          const { role } = user.data;
          res.locals = role;
          return next();
        }
      } catch (error) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
    }
    return res.status(401).json({ message: 'Token must be a valid token' });
  };
}

export default TokenValidator;
//
