import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const TeamRoutes = Router();
const teamController = new TeamController();

TeamRoutes.get('/teams', teamController.getAll);
TeamRoutes.get('/teams/:id', teamController.getOne);

export default TeamRoutes;
