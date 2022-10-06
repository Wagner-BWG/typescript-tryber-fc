import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
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