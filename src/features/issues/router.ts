import type { Application } from 'express';
import { asyncErrorHandlerMiddleware } from '../../middlewares/async-error-handler';
import {
  createIssueHandler,
  findAllIssuesHandler,
  findIssueByIdHandler,
  updateIssueHandler,
  removeIssueHandler,
} from './controllers';

const ISSUES_BASE_PATH = '/issues';
const ISSUE_ID_PATH_PARAM = '/:issueId';

export const connectIssuesRouter = (app: Application) => {
  app.post(`${ISSUES_BASE_PATH}`, asyncErrorHandlerMiddleware(createIssueHandler));

  app.get(`${ISSUES_BASE_PATH}`, asyncErrorHandlerMiddleware(findAllIssuesHandler));

  app.get(
    `${ISSUES_BASE_PATH}${ISSUE_ID_PATH_PARAM}`,
    asyncErrorHandlerMiddleware(findIssueByIdHandler),
  );

  app.put(
    `${ISSUES_BASE_PATH}${ISSUE_ID_PATH_PARAM}`,
    asyncErrorHandlerMiddleware(updateIssueHandler),
  );

  app.delete(
    `${ISSUES_BASE_PATH}${ISSUE_ID_PATH_PARAM}`,
    asyncErrorHandlerMiddleware(removeIssueHandler),
  );
};
