import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRoutes = Router();
const leaderboardController = new LeaderboardController();

LeaderboardRoutes.get('/leaderboard/home', leaderboardController.getLeaderboard);

export default LeaderboardRoutes;
