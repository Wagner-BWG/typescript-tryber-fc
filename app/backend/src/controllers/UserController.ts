import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/UserService';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public findUser =
  async (req: Request, res: Response, next: NextFunction) : Promise<void | Response> => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const response = await this.userService.FindOne(email);
    res.locals = response;
    next();
  };

  public getRole = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || 'jwt_secret';

    if (typeof token === 'string') {
      try {
        const user: string | jwt.JwtPayload | null = jwt.verify(token, secret);
        if (user && typeof user === 'object') {
          const { role } = user.data;
          return res.status(200).json({ role });
        }
      } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
      }
    }
    return res.status(400).json({ message: 'Invalid token' });
  };
}

export default UserController;
