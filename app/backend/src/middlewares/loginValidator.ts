import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';

class LoginValidator {
  public validateUser = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { password } = req.body;
    const userInfo = res.locals[0];

    if (!userInfo) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const passwordValid = bcrypt.compareSync(password, userInfo.password);
    if (passwordValid === false) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  };
}

export default LoginValidator;
