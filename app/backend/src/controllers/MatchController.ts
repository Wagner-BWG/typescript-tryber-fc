import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private matchsService: MatchService;

  constructor() {
    this.matchsService = new MatchService();
  }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    const response = await this.matchsService.getAll(inProgress as string);
    return res.status(200).json(response);
  };
}

export default MatchController;
