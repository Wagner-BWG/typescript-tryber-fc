import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import Match from '../database/models/MatchModel';

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

    const newEntry = await this.matchsService.createEntry(data) as Match;
    if (newEntry.id) {
      return res.status(201).json(newEntry);
    }
    return res.status(401).json(newEntry);
  };

  public endMatch = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    await this.matchsService.endMatch(id);
    return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchController;
