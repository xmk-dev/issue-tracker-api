import { Schema, model } from 'mongoose';
import { ISSUE_STATUS, Issue } from './types';

const IssueSchema = new Schema<Issue>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    status: {
      type: String,
      required: true,
      default: ISSUE_STATUS.PENDING,
      enum: Object.values(ISSUE_STATUS),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const IssueModel = model('issues', IssueSchema);
