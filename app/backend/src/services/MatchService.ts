import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

class MatchService {
  private matchModel = Match;
  private teamModel = Team;

  public getAll = async (query: string): Promise<Match[]> => {
    if (!query) {
      const response = await this.matchModel.findAll<Match>({
        include: [
          { model: this.teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: this.teamModel, as: 'teamAway', attributes: { exclude: ['id'] } }],
      });
      return response;
    }
    const inProgress = query === 'true' ? 1 : 0;
    const response = await this.matchModel.findAll<Match>({
      where: {
        inProgress,
      },
      include: [
        { model: this.teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this.teamModel, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return response;
  };

  public createEntry = async (data: Match) => {
    const newEntry = await this.matchModel.create(data);
    return newEntry;
  };
}

export default MatchService;
