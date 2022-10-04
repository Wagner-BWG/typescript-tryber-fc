const fakeMatchesList = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Trybe Futebol Clube"
    },
    teamAway: {
      teamName: "Sociedade Esportiva de Futebol"
    }
  },
  {
    id: 2,
    homeTeam: 4,
    homeTeamGoals: 2,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "Associação Futebolística de Esporte"
    },
    teamAway: {
      teamName: "XV de Catorze"
    }
  }
]

export default fakeMatchesList;
