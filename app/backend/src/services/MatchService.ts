import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

class MatchService {
  private matchModel = Match;
  private teamModel = Team;

  public getAll = async (): Promise<Match[]> => {
    const response = await this.matchModel.findAll<Match>({
      include: [
        { model: this.teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this.teamModel, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return response;
  };
}

export default MatchService;
