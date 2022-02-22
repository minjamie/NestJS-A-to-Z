import express from "express";
import catsRouter from "./cats/cats.route";

/* 싱글톤 패턴 적용하기
싱글톤 패턴 -  객체의 인스턴스가 오직 한개만 생성되는 패턴
[사용하는 이유]
1> 최초의 한 번에 new 연산자를 통해 객체를 만들어 추후 객체에 접근 시 메모리 낭비 방지
2> 다른 클래스간의 데이터 공유가 쉽다

분리하는 이유는 캣츠 말고 여러 라우터들을 싱글톤패턴으로 하면 분리할 수 있다
*/

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
