import { Router } from 'express';
import UserController from '../controllers/UserController';
// import User from '../database/models/UserModel';
// import UserService from '../services/UserService';

const UserRoutes = Router();
const userController = new UserController();

UserRoutes.post('/login', (req, res) => userController.findOne(req, res));

export default UserRoutes;
