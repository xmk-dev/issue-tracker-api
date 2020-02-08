const { ISSUES } = require('../constants/messages');
const issuesStates = require('../constants/issues-states');
const Issue = require('../models/issue.model');

const requireNotEmptyIssue = ({ body }) => {
  if (!body || !Object.keys(body).length) {
    // eslint-disable-next-line no-throw-literal
    throw { status: 400, message: ISSUES.CANNOT_BE_EMPTY };
  }
};

const create = async (req, res) => {
  requireNotEmptyIssue(req);

  const issue = new Issue({ ...req.body });

  const result = await issue.save();
  return res.status(201).send(result);
};

const findAll = async (req, res) => {
  const { state } = req.query;
  const issues = await (state ? Issue.find({ state }) : Issue.find());

  return res.status(200).send(issues);
};

const findOne = async (req, res) => {
  const issueWithId = await Issue.findById(req.params.issueId);

  return res.status(200).send(issueWithId);
};

const update = async (req, res) => {
  requireNotEmptyIssue(req);

  const { issueId } = req.params;
  const currentIssue = await Issue.findById(issueId);

  if (currentIssue.state === issuesStates.CLOSED) {
    // eslint-disable-next-line no-throw-literal
    throw { status: 400, message: ISSUES.CANNOT_OPEN_CLOSED_ISSUE };
  }

  const updatedIssue = await Issue.findByIdAndUpdate(
    issueId,
    { ...req.body },
    { new: true },
  );

  return res.status(200).send(updatedIssue);
};

const remove = async (req, res) => {
  const deletedIssue = await Issue.findByIdAndRemove(req.params.issueId);
  return res.status(200).send(deletedIssue);
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
