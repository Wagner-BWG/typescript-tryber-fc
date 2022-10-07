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

  public validateMatch = async (data: Match): Promise<null | object> => {
    let { inProgress } = data;
    const { homeTeam, awayTeam } = data;
    if (!inProgress) {
      inProgress = true;
    }
    if (homeTeam === awayTeam) {
      return { message: 'It is not possible to create a match with two equal teams' };
    }
    return null;
  };

  public createEntry = async (data: Match): Promise<Match | object> => {
    let response = await this.validateMatch(data);
    console.log(response);
    if (!response) {
      response = await this.matchModel.create(data);
    }
    return response;
  };

  public endMatch = async (id: number): Promise<null> => {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
    return null;
  };
}

export default MatchService;
