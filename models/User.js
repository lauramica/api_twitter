const { mongoose, Schema, Tweet } = require("../db");

const userSchema = new Schema(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    description: { type: String },
    photo: String,
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
