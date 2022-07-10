export const ISSUES_MESSAGES = {
  CANNOT_BE_EMPTY: 'Issue cannot be empty.',
  GENERAL_ERROR: 'Error occured while processing issues.',
  CANNOT_OPEN_CLOSED_ISSUE: 'You cannot open already closed issue.',
  NOT_FOUND: 'Issue not found.',
  ISSUE_ID_DOESNT_MATCH: "Issue id doesn't match.",
  MISSING_ID: 'Issue id is missing.',
} as const;

export const ROUTER_MESSAGES = {
  CANNOT_CONNECT_ROUTES: 'Cannot connect routes. Express app must exist. Closing the app...',
} as const;
