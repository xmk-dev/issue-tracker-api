import type { Request, RequestHandler } from 'express';
import { ISSUES_MESSAGES } from '../../constants';
import { createIssue, findIssueById, findIssues, removeIssue, updateIssue } from './database';
import { Issue, ISSUE_STATUS } from './types';

const requireNotEmptyIssue = ({ body }: Request) => {
  if (!body || !Object.keys(body).length) {
    // eslint-disable-next-line no-throw-literal
    throw { status: 400, message: ISSUES_MESSAGES.CANNOT_BE_EMPTY };
  }
};

export const createIssueHandler: RequestHandler = async (req, res) => {
  requireNotEmptyIssue(req);
  const result = await createIssue(req.body as Issue);

  return res.status(201).send(result);
};

export const findAllIssuesHandler: RequestHandler = async (req, res) => {
  const { title, description, status, id } = (req.query || {}) as unknown as Partial<Issue>;
  const result = await findIssues({ title, description, status, id });

  return res.status(200).send(result);
};

export const findIssueByIdHandler: RequestHandler = async (req, res) => {
  const result = await findIssueById(req.params.issueId);

  return res.status(200).send(result);
};

export const updateIssueHandler: RequestHandler = async (req, res) => {
  requireNotEmptyIssue(req);

  const { issueId } = req.params;
  const issue = req.body as Issue;

  if (issue.id !== issueId) {
    // eslint-disable-next-line no-throw-literal
    throw { status: 400, message: ISSUES_MESSAGES.ISSUE_ID_DOESNT_MATCH };
  }

  const currentIssue = await findIssueById(issueId);

  if (currentIssue?.status === ISSUE_STATUS.CLOSED) {
    // eslint-disable-next-line no-throw-literal
    throw { status: 400, message: ISSUES_MESSAGES.CANNOT_OPEN_CLOSED_ISSUE };
  }

  const result = await updateIssue(issue);

  return res.status(200).send(result);
};

export const removeIssueHandler: RequestHandler = async (req, res) => {
  const { issueId } = req.params;

  if (!issueId) {
    // eslint-disable-next-line no-throw-literal
    throw { status: 400, message: ISSUES_MESSAGES.MISSING_ID };
  }

  const result = removeIssue(issueId);

  return res.status(200).send(result);
};
