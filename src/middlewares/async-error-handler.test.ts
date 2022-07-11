import { ISSUES_MESSAGES } from '../constants';
import { asyncErrorHandlerMiddleware } from './async-error-handler';

describe('middlewares/async-error-handler', () => {
  const req = { a: 1 } as any;
  const send = jest.fn();
  const status = jest.fn(() => ({ send }));
  const res = { status } as any;
  let next = jest.fn();

  it('should process function properly', async () => {
    const foo = jest.fn();

    await asyncErrorHandlerMiddleware(foo)(req, res, next);

    expect(foo).toBeCalledWith(req, res, next);
  });

  it('should should throw 404 error because of NotFound error name', async () => {
    const foo = jest.fn(async () => {
      throw { name: 'NotFound' };
    });

    await asyncErrorHandlerMiddleware(foo)(req, res, next);

    expect(foo).toBeCalledWith(req, res, next);
    expect(status).toBeCalledWith(404);
    expect(send).toBeCalledWith({ message: ISSUES_MESSAGES.NOT_FOUND });
  });

  it('should throw 404 error because of ObjectId error kind', async () => {
    const foo = jest.fn(async () => {
      throw { kind: 'ObjectId' };
    });

    await asyncErrorHandlerMiddleware(foo)(req, res, next);

    expect(foo).toBeCalledWith(req, res, next);
    expect(status).toBeCalledWith(404);
    expect(send).toBeCalledWith({ message: ISSUES_MESSAGES.NOT_FOUND });
  });

  it('should throw any error catched', async () => {
    const error = { status: 500, message: 'test' };
    const foo = jest.fn(async () => {
      throw error;
    });

    await asyncErrorHandlerMiddleware(foo)(req, res, next);

    expect(foo).toBeCalledWith(req, res, next);
    expect(status).toBeCalledWith(404);
    expect(send).toBeCalledWith(error);
  });
});
