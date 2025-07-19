// models/Prompt.js
const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  userPrompt: {
    type: String,
    required: true,
  },
  suggestions: {
    type: String,
  },
  refinedPrompt: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Prompt', PromptSchema);
