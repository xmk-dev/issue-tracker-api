export const ISSUE_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  PENDING: 'pending',
} as const;

type IssueStatusKeys = keyof typeof ISSUE_STATUS;
export type IssueStatus = typeof ISSUE_STATUS[IssueStatusKeys];

export const EMPTY_ISSUE = {
  id: '',
  title: '',
  status: ISSUE_STATUS.OPEN,
  description: '',
} as const;

export type IssueQuerySafe = Partial<Issue>;

export interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ISSUE_STATUS_ARRAY: IssueStatus[] = [
  ISSUE_STATUS.PENDING,
  ISSUE_STATUS.OPEN,
  ISSUE_STATUS.CLOSED,
];
