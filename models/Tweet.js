const { mongoose, Schema, User } = require("../db");

const tweetSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, require: true, maxLength: 140 },
    likes: [],
  },
  {
    timestamps: true,
  },
);

const Tweet = mongoose.model("Tweet", tweetSchema); // Entre comillas se coloca el nombre del modelo en mayúscula y en singular.

module.exports = Tweet;
