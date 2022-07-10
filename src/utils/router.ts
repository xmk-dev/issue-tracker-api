import type { Application } from 'express';
import { connectIssuesRouter } from '../features/issues';
import { ROUTER_MESSAGES } from '../constants/messages';

export const connectRouter = (app: Application) => {
  if (!app) {
    // eslint-disable-next-line no-console
    console.error(ROUTER_MESSAGES.CANNOT_CONNECT_ROUTES);
    process.exit();
  }

  connectIssuesRouter(app);
};
