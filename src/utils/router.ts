import type { Application } from 'express';

import { ROUTER_MESSAGES } from '../constants/messages';
import { connectIssuesRouter } from '../features/issues';

export const connectRouter = (app: Application) => {
  if (!app) {
    // eslint-disable-next-line no-console
    console.error(ROUTER_MESSAGES.CANNOT_CONNECT_ROUTES);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit();
  }

  connectIssuesRouter(app);
};
