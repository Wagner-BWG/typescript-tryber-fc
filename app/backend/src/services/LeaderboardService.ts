import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

import MatchService from './MatchService';

type TeamScore = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
};

class LeaderboardService {
  private matchModel = Match;
  private teamModel = Team;
  private matchsService: MatchService;

  constructor() {
    this.matchsService = new MatchService();
  }

  public getHomeLeaderboard = async (): Promise<TeamScore[]> => {
    // const allMatches = await this.matchsService.getAll('false');
    const allMatches = await this.matchModel.findAll<Match>({
      attributes: ['homeTeam', 'homeTeamGoals', 'awayTeamGoals'],
      where: {
        inProgress: 'false',
      },
      raw: true,
    });
    const allTeams = await this.teamModel.findAll<Team>({
      raw: true,
    });
    const leaderboard = this.composeHomeData(allMatches, allTeams);
    return leaderboard;
  };

  public composeHomeData = (allMatches: Match[], allTeams: Team[]): TeamScore[] => {
    const teamResults: TeamScore[] = [];
    allMatches.forEach((match) => {
      if (!teamResults[match.homeTeam]) {
        teamResults[match.homeTeam] = this.defaultScoreGenerator();
      }
      teamResults[match.homeTeam].name = allTeams[match.homeTeam - 1].teamName;
      teamResults[match.homeTeam] = this.calculateGoals(teamResults[match.homeTeam], match);
      teamResults[match.homeTeam] = this.calculateVictories(teamResults[match.homeTeam], match);
      teamResults[match.homeTeam].efficiency = (
        ((teamResults[match.homeTeam].totalPoints * 100)
      / (teamResults[match.homeTeam].totalGames * 3)).toFixed(2)
      );
    });
    teamResults.shift();
    const leaderboard = this.organizeLeaderboard(teamResults);
    return leaderboard;
  };

  private calculateGoals = (position: TeamScore, match: Match): TeamScore => {
    const teamResults = position;
    teamResults.totalGames += 1;
    teamResults.goalsFavor += match.homeTeamGoals;
    teamResults.goalsOwn += match.awayTeamGoals;
    teamResults.goalsBalance = teamResults.goalsFavor - teamResults.goalsOwn;

    return teamResults;
  };

  private calculateVictories = (position: TeamScore, match: Match): TeamScore => {
    const teamResults = position;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      teamResults.totalVictories += 1;
      teamResults.totalPoints += 3;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      teamResults.totalDraws += 1;
      teamResults.totalPoints += 1;
    } else teamResults.totalLosses += 1;

    return teamResults;
  };

  private organizeLeaderboard = (leaderboard: TeamScore[]): TeamScore[] => {
    leaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints === b.totalPoints) return this.tieBreaker1(a, b);
      return 0;
    });
    return leaderboard;
  };

  private tieBreaker1 = (a: TeamScore, b: TeamScore) => {
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    return this.tieBreaker2(a, b);
  };

  private tieBreaker2 = (a: TeamScore, b: TeamScore) => {
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    return this.tieBreaker3(a, b);
  };

  private tieBreaker3 = (a: TeamScore, b: TeamScore) => {
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    return this.tieBreaker4(a, b);
  };

  private tieBreaker4 = (a: TeamScore, b: TeamScore) => {
    if (a.goalsOwn > b.goalsOwn) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    return 0;
  };

  private defaultScoreGenerator = () => {
    const defaultScore = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '0.00',
    };
    return defaultScore;
  };
}

export default LeaderboardService;
