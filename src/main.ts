import { myLogger } from './logger';
import express from 'express';
import { logic } from './logic';
import { v4 } from 'uuid';
import { asyncLocalStorage } from './asyncStorage';

const main = () => {
  const app = express();

  // Logger Setup Middleware
  app.use((req, res, next) => {
    const store = new Map();
    const traceId: string = v4().split('').slice(0, 13).join('');
    asyncLocalStorage.run(store, () => {
      myLogger.init(store, traceId);
      next();
    });
  });

  // Logger Usage Middleware
  app.use((req, res, next) => {
    myLogger.get().info(`Logger middleware`);
    const traceId = req.headers['x-request-id'] || v4();
    (req as any).traceId = traceId;
    next();
  });

  // Handlers
  app.get('/', (req, res) => {
    myLogger.get().info(`Route started`);

    logic.foo();

    res.end('Hello world!');

    myLogger.get().info(`Request finished`);
  });

  // Server
  app.listen(8080, () => {
    myLogger.get().info(`Application started`);
  });
};
main();
