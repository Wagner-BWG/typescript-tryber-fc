import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public getHomeLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
    const response = await this.leaderboardService.getPartialLeaderboard('home');
    return res.status(200).json(response);
  };

  public getAwayLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
    const response = await this.leaderboardService.getPartialLeaderboard('away');
    return res.status(200).json(response);
  };

  public getCompleteLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
    const response = await this.leaderboardService.getCompleteLeaderboard();
    return res.status(200).json(response);
  };
}

export default LeaderboardController;
