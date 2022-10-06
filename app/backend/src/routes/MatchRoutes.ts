import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import TokenValidator from '../middlewares/tokenValidator';

const MatchRoutes = Router();
const matchController = new MatchController();
const tokenValidator = new TokenValidator();

MatchRoutes.get('/matches', matchController.getAll);
MatchRoutes.post('/matches', tokenValidator.validateToken, matchController.createMatch);

export default MatchRoutes;
