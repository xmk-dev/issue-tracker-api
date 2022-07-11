import type { Request, RequestHandler } from 'express';

import { ISSUES_MESSAGES } from '../../constants';
import { createIssue, findIssueById, findIssues, removeIssue, updateIssue } from './database';
import { Issue, ISSUE_STATUS } from './types';

const requireNotEmptyIssue = ({ body }: Request) => {
  if (!body || Object.keys(body).length === 0) {
    // eslint-disable-next-line no-throw-literal
    throw { status: 400, message: ISSUES_MESSAGES.CANNOT_BE_EMPTY };
  }
};

export const createIssueHandler: RequestHandler = async (request, res) => {
  requireNotEmptyIssue(request);
  const result = await createIssue(request.body as Issue);

  res.status(201).send(result);
};

export const findAllIssuesHandler: RequestHandler = async (request, res) => {
  const { title, description, status, id } = (request.query || {}) as unknown as Partial<Issue>;
  const result = await findIssues({ title, description, status, id });

  res.status(200).send(result);
};

export const findIssueByIdHandler: RequestHandler = async (request, res) => {
  const result = await findIssueById(request.params.issueId);

  res.status(200).send(result);
};

export const updateIssueHandler: RequestHandler = async (request, res) => {
  requireNotEmptyIssue(request);

  const { issueId } = request.params;
  const issue = request.body as Issue;

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

  res.status(200).send(result);
};

export const removeIssueHandler: RequestHandler = async (request, res) => {
  const { issueId } = request.params;

  if (!issueId) {
    // eslint-disable-next-line no-throw-literal
    throw { status: 400, message: ISSUES_MESSAGES.MISSING_ID };
  }

  const result = await removeIssue(issueId);

  res.status(200).send(result);
};
