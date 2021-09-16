import { myLogger } from './logger';

export const logic = {
  foo() {
    myLogger.get().info(`Business logic`);
  },
};
