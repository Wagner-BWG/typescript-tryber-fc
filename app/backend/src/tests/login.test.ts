import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const stubUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const secret = process.env.JWT_SECRET || 'jwt_secret';

describe('When making a POST request to /login without inputing an email,', () => {
  let chaiHttpResponse: Response;

  it('returns status 400 and an error message',async () => {
    const stubLogin = {
      email: "",
      senha: "123456",
    }   
    chaiHttpResponse = await chai.request(app).post('/login').send(stubLogin)
    expect(chaiHttpResponse.status).to.equal(400)
    expect(chaiHttpResponse.body).to.an('object')
    expect(chaiHttpResponse.body.message).to.an('string')
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
  });
});

describe('When making a POST request to /login without inputing a password,', () => {
  let chaiHttpResponse: Response;

  it('returns status 400 and an error message',async () => {
    const stubLogin = {
      email: "user@user.com",
      senha: "",
    }   
    chaiHttpResponse = await chai.request(app).post('/login').send(stubLogin)
    expect(chaiHttpResponse.status).to.equal(400)
    expect(chaiHttpResponse.body).to.an('object')
    expect(chaiHttpResponse.body.message).to.an('string')
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled')
  });
});

describe('When making a POST request to /login with an email not registred in the DB', () => {
  let chaiHttpResponse: Response;
  
  before(async () => {
    return sinon
      .stub(User, "findAll")
      .resolves([] as User[]);
  });

  after(()=>{
    (User.findAll as sinon.SinonStub).restore();
  })

  it('returns status 401 and an error message',async () => {
    const stubLogin = {
      email: "not@registred.com",
      password: "secret_admin",
    }   
    chaiHttpResponse = await chai.request(app).post('/login').send(stubLogin)
    expect(chaiHttpResponse.status).to.equal(401)
    expect(chaiHttpResponse.body).to.an('object')
    expect(chaiHttpResponse.body.message).to.an('string')
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
  });
});

describe('When making a POST request to /login with a password that doesn\'t corresponds to the email\'s', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    return sinon
      .stub(User, "findAll")
      .resolves([stubUser] as User[]);
  });

  after(()=>{
    (User.findAll as sinon.SinonStub).restore();
  })

  it('returns status 400 and an error message',async () => {
    const stubLogin = {
      email: "admin@admin.com",
      password: "wrong_password",
    }   
    chaiHttpResponse = await chai.request(app).post('/login').send(stubLogin)
    expect(chaiHttpResponse.status).to.equal(401)
    expect(chaiHttpResponse.body).to.an('object')
    expect(chaiHttpResponse.body.message).to.an('string')
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
  });
});

describe('When making a POST request to /login with a correct email and password', () => {
  let chaiHttpResponse: Response;
  
  before(async () => {
    return sinon
      .stub(User, "findAll")
      .resolves([stubUser] as User[]);
  });

  after(()=>{
    (User.findAll as sinon.SinonStub).restore();
  })

  const stubLogin = {
    email: "admin@admin.com",
    password: "secret_admin",
  }

  const { role } = stubUser;
  const stubToken = jwt.sign({ data: { role } }, secret);

  it('returns status 200',async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(stubLogin)
    expect(chaiHttpResponse.status).to.equal(200)
  });
  it('returns a proper token',async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(stubLogin)
    expect(chaiHttpResponse.body).to.an('object')
    expect(chaiHttpResponse.body.token).to.an('string')
    expect(chaiHttpResponse.body.token.length).to.be.equal(stubToken.length)
  });
});

describe('When making a GET request to /login/validate with a proper token,', () => {
  let chaiHttpResponse: Response;

  const stubLogin = {
    email: "admin@admin.com",
    password: "secret_admin",
  }

  const { role } = stubUser;
  const stubToken = jwt.sign({ data: { role } }, secret);

  it('returns status 200',async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set({ Authorization: stubToken})
    expect(chaiHttpResponse.status).to.equal(200)
  });
  it('returns the corresponding role',async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set({ Authorization: stubToken})
    expect(chaiHttpResponse.body).to.an('object')
    expect(chaiHttpResponse.body.role).to.an('string')
    expect(chaiHttpResponse.body.role).to.be.equal(stubUser.role)
  });
});