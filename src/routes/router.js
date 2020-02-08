const { ROUTER: msg } = require('../constants/messages');
const issuesRouter = require('./issues.routes');

module.exports = (app) => {
  if (!app) {
    // eslint-disable-next-line no-console
    console.error(msg.CANNOT_CONNECT_ROUTES);
    process.exit();
  }

  issuesRouter(app);
};
