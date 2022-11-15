# :construction: README em construção ! :construction:
<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
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

## Instalação

A aplicação tem seus 3 componentes, backend, frontend e banco de dados, dockerizados. É preciso 

1. Clone o repositório `git clone git@github.com:Wagner-BWG/typescript-tryber-fc.git`

2. 

<!-- Até o momento, estão implementados no projeto:

1. A **model** e **migration** para tabela *users*.
2. Uma rota do tipo *POST* no endpoint */login* que permite acesso com dados válidos no front-end, comparando os com os emails e suas respectivas senhas encriptadas no banco de dados, e retorna um token (*jwt*).
3. Lógica no endpoint */login* que previne que seja feita uma sem que um email e uma senha válidos tenham sido informados.
4. Uma rota *GET* no endpoint */login/validate* que recebe um *header* com parâmetro *authorization*, onde está armazenado o *token* gerado no login. Tendo um *token* válido, a rota retorna o *role* (tipo) do usuário.
5. **Testes de integração** para o endpoint */login* e para os middlewares de autenticação.

6. A **model** e **migration** para tabela *teams*.
7. Uma rota do tipo *GET* no endpoint */teams* que retorna os dados de todos os times cadastrados no banco de dados.
8. Uma rota do tipo *GET* no endpoint */teams/:id* que retorna apenas os dados do time de *id* correspondente.
9. **Testes de integração** para o endpoint */teams*.

10. A **model** e **migration** para tabela *matches*. -->
