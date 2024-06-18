const { mongoose, Schema, User } = require("../db");

const tweetSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, require: true, maxLength: 140 },
    likes: [0],
  },
  {
    timestamps: true,
  },
);

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
