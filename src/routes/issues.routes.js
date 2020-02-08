const issues = require('../controllers/issues.controller');

const ISSUES_BASE_PATH = '/issues';
const ISSUE_ID_PATH_PARAM = '/:issueId';

module.exports = (app) => {
  app.post(`${ISSUES_BASE_PATH}`, issues.create);

  app.get(`${ISSUES_BASE_PATH}`, issues.findAll);

  app.get(`${ISSUES_BASE_PATH}${ISSUE_ID_PATH_PARAM}`, issues.findOne);

  app.put(`${ISSUES_BASE_PATH}${ISSUE_ID_PATH_PARAM}`, issues.update);

  app.delete(`${ISSUES_BASE_PATH}${ISSUE_ID_PATH_PARAM}`, issues.remove);
};
