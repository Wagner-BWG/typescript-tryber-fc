import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

class TokenGenerator {
  public generateToken = (req: Request, res: Response) => {
    const userInfo = res.locals[0];

    const secret = process.env.JWT_SECRET || 'jwt_secret';

    const { role } = userInfo;

    const token = jwt.sign({ data: { role } }, secret);

    return res.status(200).json({ token });
  };
}

export default TokenGenerator;
