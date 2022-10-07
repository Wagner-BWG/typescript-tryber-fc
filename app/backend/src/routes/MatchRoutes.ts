import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import TokenValidator from '../middlewares/tokenValidator';

const MatchRoutes = Router();
const matchController = new MatchController();
const tokenValidator = new TokenValidator();

MatchRoutes.get('/matches', matchController.getAll);
MatchRoutes.post('/matches', tokenValidator.validateToken, matchController.createMatch);
MatchRoutes.patch('/matches/:id/finish', tokenValidator.validateToken, matchController.endMatch);

export default MatchRoutes;
