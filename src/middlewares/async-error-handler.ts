import { RequestHandler } from 'express';
import { ISSUES_MESSAGES } from '../constants';

const DEFAULT_ERROR_STATUS = 500;

export const asyncErrorHandlerMiddleware =
  (func: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      return await func(req, res, next);
    } catch (err: any) {
      console.error(err);
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({ message: ISSUES_MESSAGES.NOT_FOUND });
      }

      const status = err.status || DEFAULT_ERROR_STATUS;
      const message = err.message || ISSUES_MESSAGES.GENERAL_ERROR;

      return res.status(status).send({ message, error: err });
    }
  };
