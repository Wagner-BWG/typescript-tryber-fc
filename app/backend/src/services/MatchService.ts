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

  public validateMatch = async (data:Match): Promise<null | object> => {
    const teamHome = await this.teamModel.findOne<Team>({
      where: {
        id: data.homeTeam,
      },
    }) as Team;
    const teamAway = await this.teamModel.findOne<Team>({
      where: {
        id: data.awayTeam,
      },
    }) as Team;
    if (!teamHome || !teamAway) {
      return { status: 404, json: { message: 'There is no team with such id!' } };
    }
    if (teamHome.id === teamAway.id) {
      return { status: 401,
        json: { message: 'It is not possible to create a match with two equal teams' } };
    }
    return null;
  };

  public createEntry = async (data: Match): Promise<object> => {
    let response = await this.validateMatch(data);
    if (!response) {
      const json = await this.matchModel.create(data);
      response = { status: 201, json };
    }
    return response;
  };

  public endMatch = async (id: number): Promise<null> => {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
    return null;
  };

  public updateMatch =
  async (id: number, score: { homeTeamGoals: number, awayTeamGoals: number }): Promise<null> => {
    await this.matchModel.update(score, { where: { id } });
    return null;
  };
}

export default MatchService;
