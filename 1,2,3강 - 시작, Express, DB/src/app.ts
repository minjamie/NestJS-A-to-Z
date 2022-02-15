import express from "express";
import catsRouter from "./cats/cats.route";

// 싱글톤 패턴 적용하기

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }
  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    // logging middleware
    this.app.use((req, res, next) => {
      console.log("this is logging middleware");
      next();
    });

    // json middleware
    this.app.use(express.json());

    this.setRoute();

    this.app.use((req, res, next) => {
      res.send({ error: "404 not found error" });
    });
  }

  public listen() {
    this.setMiddleware();
    const port: number = 8000;
    this.app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
