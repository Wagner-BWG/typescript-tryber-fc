import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public findOne = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(200).json({ response: 'funfa' });
    }
    console.log(this.userService);
    const response = await this.userService.FindOne(email, password);
    console.log(response);
    return res.status(200).json(response);
  };
}

export default UserController;
