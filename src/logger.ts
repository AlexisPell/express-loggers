import cls from 'cls-hooked';
import pino from 'pino';
import { APP_NAMESPACE, LOGGER } from './constants';

const logger = pino({
  prettyPrint: true,
});

export const myLogger = {
  init: (traceId: string) => {
    const clsNamespace = cls.getNamespace(String(APP_NAMESPACE));
    const childLogger = logger.child({ traceId });
    clsNamespace?.set(String(LOGGER), childLogger);
  },
  get: () => {
    const clsNamespace = cls.getNamespace(String(APP_NAMESPACE));
    const childLogger: pino.Logger = clsNamespace?.get(String(LOGGER));
    return childLogger || logger;
  },
};
