import * as express from 'express';
import LeaderboardRoutes from './routes/LeaderboardRoutes';
import MatchRoutes from './routes/MatchRoutes';
import TeamRoutes from './routes/TeamRoutes';
import UserRoutes from './routes/UserRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(UserRoutes);
    this.app.use(TeamRoutes);
    this.app.use(MatchRoutes);
    this.app.use(LeaderboardRoutes);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
