import type { Document, LeanDocument } from 'mongoose';

import { IssueModel } from './models';
import { type Issue, type IssueQuerySafe, EMPTY_ISSUE } from './types';

const transform = ({
  __v,
  _id: id,
  createdAt,
  updatedAt,
  ...data
}: LeanDocument<Document<any, any, Issue> & Issue>): Issue => ({
  ...data,
  id,
  createdAt: createdAt ? new Date(createdAt) : undefined,
  updatedAt: updatedAt ? new Date(updatedAt) : undefined,
});

export const findIssueById = async (id: string): Promise<Issue | undefined> => {
  const result = await IssueModel.findById(id);

  return result ? transform(result.toObject()) : undefined;
};

export const findIssues = async (queryObject: IssueQuerySafe): Promise<Issue[] | undefined> => {
  const safeQuery: IssueQuerySafe = Object.fromEntries(
    Object.entries(queryObject).map(([key, value]) =>
      value === undefined || !Object.keys(EMPTY_ISSUE).includes(key) ? [] : [key, value],
    ),
  );
  const results = await IssueModel.find(safeQuery);

  return results?.map((result) => transform(result.toObject()));
};

export const updateIssue = async ({
  id,
  title,
  status,
  description,
}: Issue): Promise<Issue | undefined> => {
  const result = await IssueModel.findByIdAndUpdate(
    id,
    { title, description, status },
    { returnDocument: 'after' },
  );

  return result ? transform(result.toObject()) : undefined;
};

export const createIssue = async ({
  title,
  description,
  status,
}: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Issue | undefined> => {
  const data = { title, description, status };
  const result = await new IssueModel(data).save();

  return result ? transform(result.toObject()) : undefined;
};

export const removeIssue = async (id: string): Promise<Issue | undefined> => {
  const result = await IssueModel.findByIdAndRemove(id);

  return result ? transform(result.toObject()) : undefined;
};
