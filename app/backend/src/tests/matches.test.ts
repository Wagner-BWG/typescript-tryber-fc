import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as jwt from 'jsonwebtoken';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';
import fakeMatchesList from './helpers/matchList';

chai.use(chaiHttp);

const { expect } = chai;

describe('When making a GET request to /matches,', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    return sinon
      .stub(Match, "findAll")
      .resolves(fakeMatchesList as Match[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('returns status 200',async () => {
    chaiHttpResponse = await chai.request(app).get('/matches')
    expect(chaiHttpResponse.status).to.equal(200)
  });
  it('returns all teams',async () => {
    chaiHttpResponse = await chai.request(app).get('/matches')    
    expect(chaiHttpResponse.body).to.an('array')
    expect(chaiHttpResponse.body).to.be.deep.equal(fakeMatchesList)
  });
});

describe('When making a GET request to /matches with the query inProgress=true,', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    return sinon
      .stub(Match, "findAll")
      .resolves([fakeMatchesList[1]] as Match[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('returns status 200',async () => {
    chaiHttpResponse = await chai.request(app).get('/matches').query('inProgress=true')
    expect(chaiHttpResponse.status).to.equal(200)
  });
  it('returns all teams with games in progress',async () => {
    chaiHttpResponse = await chai.request(app).get('/matches')    
    expect(chaiHttpResponse.body).to.an('array')
    expect(chaiHttpResponse.body[0]).to.be.deep.equal(fakeMatchesList[1])
    expect(chaiHttpResponse.body[0].inProgress).to.be.true
  });
});

describe('When making a GET request to /matches with the query inProgress=false,', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    return sinon
      .stub(Match, "findAll")
      .resolves([fakeMatchesList[0]] as Match[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('returns status 200',async () => {
    chaiHttpResponse = await chai.request(app).get('/matches').query('inProgress=false')
    expect(chaiHttpResponse.status).to.equal(200)
  });
  it('returns all teams with games in progress',async () => {
    chaiHttpResponse = await chai.request(app).get('/matches')    
    expect(chaiHttpResponse.body).to.an('array')
    expect(chaiHttpResponse.body[0]).to.be.deep.equal(fakeMatchesList[0])
    expect(chaiHttpResponse.body[0].inProgress).to.be.false
  });
});

describe('When making a POST request to /matches with a valid token', async () => {
  let chaiHttpResponse: Response;

  before(async () => {
    return sinon
      .stub(Match, "create")
      .resolves(fakeMatchesList[0] as Match);
  });

  after(()=>{
    (Match.create as sinon.SinonStub).restore();
  })

  const stubMatch = {
    homeTeam: 1,
    homeTeamGoalss: 1,
    awayTeam: 3,
    awayTeamGoals: 1,
    inProgress: false,
  }
  const secret = process.env.JWT_SECRET || 'jwt_secret';
  const stubToken = jwt.sign({ data: { role: 'user' } }, secret);

  it('returns status 201', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').set({ Authorization: stubToken}).send(stubMatch);
    expect(chaiHttpResponse.status).to.equal(201);
  });
  it('returns the newly inserted match in the DB', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').set({ Authorization: stubToken}).send(stubMatch);
    expect(chaiHttpResponse.body).to.an('object');
    expect(chaiHttpResponse.body).to.be.deep.equal(fakeMatchesList[0]);
  });
})