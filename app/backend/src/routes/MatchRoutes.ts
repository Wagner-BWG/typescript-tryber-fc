import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const MatchRoutes = Router();
const matchController = new MatchController();

MatchRoutes.get('/matches', matchController.getAll);

export default MatchRoutes;
