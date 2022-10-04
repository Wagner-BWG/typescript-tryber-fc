import Team from '../database/models/TeamModel';

class TeamService {
  private model = Team;

  public getAll = async (): Promise<Team[]> => {
    const response = await this.model.findAll<Team>();
    return response;
  };
}

export default TeamService;
