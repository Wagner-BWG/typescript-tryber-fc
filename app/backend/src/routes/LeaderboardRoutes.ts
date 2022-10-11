import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRoutes = Router();
const leaderboardController = new LeaderboardController();

LeaderboardRoutes.get('/leaderboard/home', leaderboardController.getHomeLeaderboard);
LeaderboardRoutes.get('/leaderboard/away', leaderboardController.getAwayLeaderboard);
LeaderboardRoutes.get('/leaderboard', leaderboardController.getCompleteLeaderboard);

export default LeaderboardRoutes;
