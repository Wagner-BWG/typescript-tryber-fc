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

  public createMatch = async (req:Request, res: Response) => {
    const data = req.body;
    if (!data.inProgress) {
      data.inProgress = false;
    }
    const newEntry = await this.matchsService.createEntry(data);
    return res.status(201).json(newEntry);
  };
}

export default MatchController;
