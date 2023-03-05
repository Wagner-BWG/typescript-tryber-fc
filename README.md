# :construction: README em construção ! :construction:
 # ***TFC - Trybe Futebol Clube***

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
|`POST`|Adiciona uma nova partida à lista de partidas.|http://localhost:3001/matches|[Está requsição necessita de um JSON e um header de autorização](#POSTmatch)|

<details><summary>Apêndice</summary>

<a name="POSTlogin">Body JSON para POST /login:</a>
```
{
	"email": "admin@admin.com",
	"password": "secret_admin"
}
```

<a name="tokenUser">Token de usuário para GET /login/validade:</a>
```
authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJ1c2VyIn0sImlhdCI6MTY2NDgxOTY4MH0.VzMj36UL8cQbX2no1eeSZevg-9x6gSAnIverABcC0A8"
```

Token de administrador para GET /login/validade:
```
authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NzgwNTk2NjB9.4tJ-_N31IEcXUh8vOONvAEbkGbG5Kz9Ldw5Gko_a2bQ"
```

<a name="POSTmatch">Exemplo Body JSON para POST /matches:</a>
```
{
  "homeTeam": 1,
  "homeTeamGoals": 2,
  "awayTeam": 7,
  "awayTeamGoals": 2,
	"inProgress": true
}
```

Token de usuário para o header "authorization":
```
authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJ1c2VyIn0sImlhdCI6MTY2NDgxOTY4MH0.VzMj36UL8cQbX2no1eeSZevg-9x6gSAnIverABcC0A8"
```
</details>