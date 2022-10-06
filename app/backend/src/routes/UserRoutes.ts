import { Router } from 'express';
import LoginValidator from '../middlewares/loginValidator';
import UserController from '../controllers/UserController';
import TokenGenerator from '../middlewares/tokenGenerator';
import TokenValidator from '../middlewares/tokenValidator';

const UserRoutes = Router();
const userController = new UserController();
const loginValidator = new LoginValidator();
const tokenGenerator = new TokenGenerator();
const tokenValidator = new TokenValidator();

UserRoutes.post(
  '/login',
  userController.findUser,
  loginValidator.validateUser,
  tokenGenerator.generateToken,
);

UserRoutes.get('/login/validate', tokenValidator.validateToken, userController.getRole);

export default UserRoutes;
