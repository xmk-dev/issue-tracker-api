const mongoose = require('mongoose');
const issuesStates = require('../constants/issues-states');

const IssueSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false, default: '' },
  state: {
    type: String,
    required: true,
    default: issuesStates.PENDING,
    enum: Object.values(issuesStates),
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('issues', IssueSchema);
