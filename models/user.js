const { Schema } = require('mongoose');

const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    contributions: [{ type: Schema.Types.ObjectId, ref: 'jokes' }],
    liked_jokes: [{ type: Schema.Types.ObjectId, ref: 'jokes' }],
    flagged_jokes: [{ type: Schema.Types.ObjectId, ref: 'jokes' }]
  },
  { timestamps: true }
);

module.exports = User;
