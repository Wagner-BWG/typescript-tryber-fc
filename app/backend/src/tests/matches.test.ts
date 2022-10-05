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
      .resolves(fakeMatchesList as []);
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