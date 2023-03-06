# ***TFC - Trybe Futebol Clube***

<details><summary><strong>Readme in English! 🇺🇸</strong> </summary><br />

The ***TFC - Trybe Futebol Clube*** was a solo project part of the web development course by [Trybe](https://github.com/betrybe) for purely educational purposes.

The proposal is for the students to create an API, in typeScript, to feed a front-end, already made available by the school, for a webpage that shows the matches and the scoreboard for football championship. ⚽️

The API communicate with a local database with info over ficticious mathes. The objective of this project is simply to apply skills learned in the back-end course so far. Those skills are:
* Dockerization an application. Creating the *Dockerfile* for the front and back end apps.
* Modelling data in ***MySQL*** DB using ***Sequelize***;
* Creating and associating tables using *models* in *sequelize*;
* Creating and  ***RESTful API*** with endpoints for using said models;
* Use ***TypeScript*** to create a *CRUD* interface, using *ORM*;
* Write integration tests using ***mocha***, ***chai*** e ***sinon***.

## To run this application locally:

The app has its 3 components, backend, frontend and DB, dockerized.
Clone this repository and in its root folder execute the command `npm run compose:up` to start up the dockerized app.
Fron-end is accessed via `localhost:3000` and back-end via `localhost:3001`

To run the available integration tests, in the root folder execute the following commands to intall the dependencies and execute the tests:

```
npm install
cd app/backend && npm test
```

To take down the app, execute `npm run compose:down` in the root folder.

## Usage demonstration:

![Aplication Screenchot](app_screenshot.png "App home page")

### Endpoints:

These are the endpoints that can be requested using an API Client (such as Insomnia or Postman)

|Method|Funcionality|URL|Observations
|------|--------------|---|-----------|
|`POST`|Logs in as a registered user or administrator.|http://localhost:3001/login|[This request needs a JSON.](#POSTlogin)|
|`GET`|Returns info on if the account belongs to a user or an administrator.|http://localhost:3001/login/validate|[This request needs and Authorization header.](#tokenUser)|
|`GET`|Returns the teams and their respective ids.|http://localhost:3001/teams||
|`GET`|Return one team an it's respective id.|http://localhost:3001/teams/:id||
|`GET`|Returns a list of all matches.|http://localhost:3001/matches|The query "inProgress=true" or "inProgress=false" to return only matches that are still in progress or that have already ended.|
|`POST`|Adds a new match to the list of matches.|http://localhost:3001/matches|[This request needs a JSON](#POSTmatch) and an [authorization header](#POSTlogin)|
|`PATCH`|Marks a match as finished.|http://localhost:3001/matches/:id/finish|[This request needs and Authorization header.](#tokenUser)|
|`PATCH`|Sets the score for each team in a match.|http://localhost:3001/matches/:id/|[This request needs a JSON](#POSTmatch) and an [authorization header](#POSTlogin)|
|`GET`|Returns the scoreboard considering only the matches where each team played "at home"|http://localhost:3001/leaderboard/home||
|`GET`|Returns the scoreboard considering only the matches where each team played "as visitor"|http://localhost:3001/leaderboard/away||
|`GET`|Returns the complete scoreboard|http://localhost:3001/leaderboard||

### Appendix

<a name="POSTlogin">JSON for an administrator account for POST /login:</a>
```
{
	"email": "admin@admin.com",
	"password": "secret_admin"
}
```
Obs: you can change each instance of the word admin to user to log as a user.

<a name="tokenUser">User token for the "authorization" header</a>
(Required for: GET /login/validade, POST /matches and PATCH /matches)
```
authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJ1c2VyIn0sImlhdCI6MTY2NDgxOTY4MH0.VzMj36UL8cQbX2no1eeSZevg-9x6gSAnIverABcC0A8"
```

Administrator token for the "authorization" header
(Required for: GET /login/validade, POST /matches and PATCH /matches)
```
authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NzgwNTk2NjB9.4tJ-_N31IEcXUh8vOONvAEbkGbG5Kz9Ldw5Gko_a2bQ"
```

<a name="POSTmatch">Example of a JSON for POST /matches:</a>
```
{
  "homeTeam": 1,
  "homeTeamGoals": 2,
  "awayTeam": 7,
  "awayTeamGoals": 2,
	"inProgress": true
}
```

<a name="PATCHmatch">Example of a JSON for PATCH /matches/:id</a>
```
{
  "homeTeamGoals": 7,
  "awayTeamGoals": 7
}
```
</details>

<details><summary><strong>Readme em Português! 🇧🇷</strong> </summary><br />

O projeto ***TFC - Trybe Futebol Clube*** foi um projeto indivídual de propósito puramente educacional, parte do curso de desenvolvimento web da [Trybe](https://github.com/betrybe).

A proposta é que as pessoas estudantes criem uma API, em typeScript, que será consumida pelo front-end já disponibilizado pela *Trybe*, para um site informativo sobre partidas e classificações de futebol! ⚽️

A API comunica-se com um banco de dados local com informações sobre partidas fictícias. Por tanto, o objetivo deste projeto é apenas aplicar todos os conhecimentos adquiridos no curso de back-end até aquele momento. Sendo eles:
* A dockerização dos aplicativos. Criando o *Dockerfile* para as aplicações front e back end.
* A modelagem de dados com ***MySQL*** através do ***Sequelize***;
* A criação e associação de tabelas usando *models* do *sequelize*;
* A construção de uma ***API REST*** com endpoints para consumir os models criados;
* A construção de um *CRUD* com ***TypeScript***, utilizando *ORM*;
* A construção de testes de cobertura usando ***mocha***, ***chai*** e ***sinon***.

## Para rodar essa aplicação localmente:

A aplicação tem seus 3 componentes, backend, frontend e banco de dados, dockerizados.
Clone o repositório e em sua pasta raíz execute o comando `npm run compose:up` para iniciar a aplicação dockerizada.
O front-end é acessado via `localhost:3000` e o back-end via `localhost:3001`

Para rodar os testes de integração disponívies, exceute na pasta raíz os seguintes comandos para instalar as dependências e executar os testes:

```
npm install
cd app/backend && npm test
```

Para parar a aplicação, execute o comando `npm run compose:down` na pasta raíz do projeto.

## Demonstração de uso:

![Aplication Screenchot](app_screenshot.png "Pagina inicial da Aplicação")

### Endpoints:

Estes são os endpoints que podem ser acessados através das requisições de um API Client (como Insomnia ou Postman)

|Método|Funcionalidade|URL|Observações|
|------|--------------|---|-----------|
|`POST`|Efetua login de um usuário ou administrador cadastrado.|http://localhost:3001/login|[Está requisição necessita de um JSON.](#POSTlogin)|
|`GET`|Retorna se a conta é um usuário ou administrador.|http://localhost:3001/login/validate|[Está requisição necessita de um header de autorização.](#tokenUser)|
|`GET`|Retorna os times cadastrados e seus respctivos ids.|http://localhost:3001/teams||
|`GET`|Retorna um time cadastrado e seu respctivo id.|http://localhost:3001/teams/:id||
|`GET`|Retorna a lista de todas as partidas.|http://localhost:3001/matches|Pode-se usar a query "inProgress=true" ou "inProgress=false" para retornar apenas partidas em progresso ou já terminadas.|
|`POST`|Adiciona uma nova partida à lista de partidas.|http://localhost:3001/matches|[Está requsição necessita de um JSON](#POSTmatch) e um [header de autorização](#POSTlogin)|
|`PATCH`|Marca uma partida como encerrada.|http://localhost:3001/matches/:id/finish|[Está requisição necessita de um header de autorização.](#tokenUser)|
|`PATCH`|Altera o placar da partida.|http://localhost:3001/matches/:id/|[Está requsição necessita de um JSON](#PATCHmatch) e um [header de autorização](#POSTlogin)|
|`GET`|Retorna o placar com a pontuação que os times fizeram nos jogos feitos "em casa"|http://localhost:3001/leaderboard/home||
|`GET`|Retorna o placar com a pontuação que os times fizeram nos jogos feitos como "visitante"|http://localhost:3001/leaderboard/away||
|`GET`|Retorna o placar com a pontuação geral|http://localhost:3001/leaderboard||

### Apêndice

<a name="POSTlogin">JSON de administrador para POST /login:</a>
```
{
	"email": "admin@admin.com",
	"password": "secret_admin"
}
```
Obs: pode-se substituir admin por user para logar como usuário.

<a name="tokenUser">Token de usuário para o header "authorization"</a>
(Necessário em: GET /login/validade, POST /matches e PATCH /matches)
```
authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJ1c2VyIn0sImlhdCI6MTY2NDgxOTY4MH0.VzMj36UL8cQbX2no1eeSZevg-9x6gSAnIverABcC0A8"
```

Token de administrador para o header "authorization"
(Necessário em: GET /login/validade e POST /matches)
```
authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NzgwNTk2NjB9.4tJ-_N31IEcXUh8vOONvAEbkGbG5Kz9Ldw5Gko_a2bQ"
```

<a name="POSTmatch">Exemplo JSON para POST /matches:</a>
```
{
  "homeTeam": 1,
  "homeTeamGoals": 2,
  "awayTeam": 7,
  "awayTeamGoals": 2,
	"inProgress": true
}
```

<a name="PATCHmatch">Exemplo de JSON para PATCH /matches/:id</a>
```
{
  "homeTeamGoals": 7,
  "awayTeamGoals": 7
}
```
</details>