const issuesController = require('../controllers/issues.controller');
const issuesMiddlewares = require('../middlewares/issues.middlewares');

const ISSUES_BASE_PATH = '/issues';
const ISSUE_ID_PATH_PARAM = '/:issueId';

module.exports = (app) => {
  app.post(
    `${ISSUES_BASE_PATH}`,
    issuesMiddlewares.asyncHandleErrors(issuesController.create),
  );

  app.get(
    `${ISSUES_BASE_PATH}`,
    issuesMiddlewares.asyncHandleErrors(issuesController.findAll),
  );

  app.get(
    `${ISSUES_BASE_PATH}${ISSUE_ID_PATH_PARAM}`,
    issuesMiddlewares.asyncHandleErrors(issuesController.findOne),
  );

  app.put(
    `${ISSUES_BASE_PATH}${ISSUE_ID_PATH_PARAM}`,
    issuesMiddlewares.asyncHandleErrors(issuesController.update),
  );

  app.delete(
    `${ISSUES_BASE_PATH}${ISSUE_ID_PATH_PARAM}`,
    issuesMiddlewares.asyncHandleErrors(issuesController.remove),
  );
};
