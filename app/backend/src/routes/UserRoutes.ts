import { Router } from 'express';
import LoginValidator from '../middlewares/loginValidator';
import UserController from '../controllers/UserController';
import TokenGenerator from '../middlewares/tokenGenerator';

const UserRoutes = Router();
const userController = new UserController();
const loginValidator = new LoginValidator();
const tokenGenerator = new TokenGenerator();

UserRoutes.post(
  '/login',
  userController.findUser,
  loginValidator.validateUser,
  tokenGenerator.generateToken,
);

export default UserRoutes;
