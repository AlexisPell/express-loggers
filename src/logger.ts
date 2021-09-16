import pino from 'pino';
import { asyncLocalStorage } from './asyncStorage';

const logger = pino({
  prettyPrint: true,
});

export const myLogger = {
  init: (store: Map<any, any>, traceId: string) => {
    // const store = asyncLocalStorage.getStore() as Map<any, any>;
    const childLogger = logger.child({ traceId });
    store.set('logger', childLogger);
  },
  get: () => {
    const store = asyncLocalStorage.getStore() as Map<any, any>;
    const childLogger = store?.get('logger');
    return childLogger || logger;
  },
};
