const { ISSUES: msg } = require('../constants/messages');
const issuesStates = require('../constants/issues-states');
const Issue = require('../models/issue.model');

const create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: msg.ISSUES.ISSUE_CANNOT_BE_EMPTY });
  }

  const issue = new Issue({ ...req.body });

  try {
    const result = await issue.save();
    return res.status(201).send(result);
  } catch (err) {
    return res.status(500).send({ message: msg.ERROR_WHILE_SAVING });
  }
};

const findAll = async (req, res) => {
  try {
    const { state } = req.query;
    const issues = await (state ? Issue.find({ state }) : Issue.find());

    return res.status(200).send(issues);
  } catch (err) {
    return res.status(500).send({ message: msg.ERROR_WHILE_GETTING_ALL });
  }
};

const findOne = async (req, res) => {
  try {
    const issueWithId = await Issue.findById(req.params.issueId);
    return res.status(200).send(issueWithId);
  } catch (err) {
    return res.status(500).send({ message: msg.ERROR_WHILE_GETTING_BY_ID });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: msg.ISSUES.ISSUE_CANNOT_BE_EMPTY });
  }

  try {
    const updatedIssue = req.body;
    // eslint-disable-next-line no-underscore-dangle
    const issueId = req.params.issueId || updatedIssue._id;
    const currentIssue = await Issue.findById(issueId);

    if (currentIssue.state === issuesStates.CLOSED) {
      return res.status(400).send({ message: msg.ISSUES.CANNOT_OPEN_CLOSED_ISSUE });
    }

    const newIssue = await Issue.findByIdAndUpdate(issueId, { ...updatedIssue }, { new: true });

    return res.status(200).send(newIssue);
  } catch (err) {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({ message: msg.NOT_FOUND });
    }
    return res.status(500).send({ message: msg.ERROR_WHILE_SAVING });
  }
};

const remove = async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndRemove(req.params.issueId);
    return res.status(200).send(deletedIssue);
  } catch (err) {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({ message: msg.NOT_FOUND });
    }
    return res.status(500).send({ message: msg.ERROR_WHILE_SAVING });
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
