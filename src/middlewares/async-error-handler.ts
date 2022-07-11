import { RequestHandler } from 'express';

import { ISSUES_MESSAGES } from '../constants';

const DEFAULT_ERROR_STATUS = 500;

export const asyncErrorHandlerMiddleware =
  (function_: Function): RequestHandler =>
  async (req, res, next) => {
    try {
      await function_(req, res, next);
    } catch (error: any) {
      console.error(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.kind === 'ObjectId' || error.name === 'NotFound') {
        return res.status(404).send({ message: ISSUES_MESSAGES.NOT_FOUND });
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const status = (error.status as number) || DEFAULT_ERROR_STATUS;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const message = (error.message as string) || ISSUES_MESSAGES.GENERAL_ERROR;

      res.status(status).send({ message, status });
    }
  };
