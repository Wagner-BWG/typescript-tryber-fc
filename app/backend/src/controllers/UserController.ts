import { NextFunction, Request, Response } from 'express';
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

    const response = await this.userService.FindOne(email, password);
    res.locals = response;
    next();
  };
}

export default UserController;
