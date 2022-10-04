import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as jwt from 'jsonwebtoken';
import Team from '../database/models/TeamModel';
import fakeTeamsList from './helpers/teamsList';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('When making a GET request to /teams,', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    return sinon
      .stub(Team, "findAll")
      .resolves(fakeTeamsList as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('returns status 200',async () => {
    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.status).to.equal(200)
  });
  it('returns all teams',async () => {
    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.body).to.an('array')
    expect(chaiHttpResponse.body).to.be.deep.equal(fakeTeamsList)
    expect(chaiHttpResponse.body[0].teamName).to.an('string')
    expect(chaiHttpResponse.body[0].teamName).to.be.equal(fakeTeamsList[0].teamName)
  });
});