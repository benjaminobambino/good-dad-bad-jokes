const { Schema } = require('mongoose');

const Joke = new Schema(
  {
    setup: { type: String, required: true },
    punchline: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: 'users' },
    viewed_by: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    flagged: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

module.exports = Joke;
