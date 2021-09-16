import { myLogger } from './logger';
import express from 'express';
import { logic } from './logic';
import pino from 'pino';
import { v4 } from 'uuid';
import cls from 'cls-hooked';
import { APP_NAMESPACE } from './constants';

const main = () => {
  const app = express();

  const clsNamespace = cls.createNamespace(String(APP_NAMESPACE));

  // Middleware
  app.use((req, res, next) => {
    const traceId: string = v4();
    clsNamespace.bind(req as any);
    clsNamespace.bind(req as any);
    clsNamespace.run(() => {
      myLogger.init(traceId);
      next();
    });
  });

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
