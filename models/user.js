const { Schema } = require('mongoose');

const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    jokes_contributed: [{ type: Schema.Types.ObjectId, ref: 'jokes' }],
    jokes_liked: [{ type: Schema.Types.ObjectId, ref: 'jokes' }],
    jokes_viewed: [{ type: Schema.Types.ObjectId, ref: 'jokes' }]
  },
  { timestamps: true }
);

module.exports = User;
