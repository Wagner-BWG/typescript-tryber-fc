import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const response = await this.teamService.getAll();
    return res.status(200).json(response);
  };
}

export default TeamController;
