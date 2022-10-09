import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public getLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
    const response = await this.leaderboardService.getHomeLeaderboard();
    return res.status(200).json(response);
  };
}

export default LeaderboardController;
