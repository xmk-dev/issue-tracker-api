const { ISSUES } = require('../constants/messages');

const DEFAULT_ERROR_STATUS = 500;

const asyncHandleErrors = (func) => async (req, res, next) => {
  try {
    return await func(req, res, next);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({ message: ISSUES.NOT_FOUND });
    }

    const status = err.status || DEFAULT_ERROR_STATUS;
    const message = err.message || ISSUES.GENERAL_ERROR;

    return res.status(status).send({ message, error: err });
  }
};

module.exports = {
  asyncHandleErrors,
};
