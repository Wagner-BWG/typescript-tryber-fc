import Team from '../database/models/TeamModel';

class TeamService {
  private model = Team;

  public getAll = async (): Promise<Team[]> => {
    const response = await this.model.findAll<Team>() as unknown as Team[];
    return response;
  };

  public getOne = async (id: string): Promise<Team> => {
    const response = await this.model.findOne<Team>({
      where: {
        id,
      },
    }) as Team;
    return response;
  };
}

export default TeamService;
