const Tweet = require("../models/Tweet");
const User = require("../models/User");

const tweetController = {
  index: async (req, res) => {
    try {
      const tweets = await Tweet.find().limit(20).populate("user");
      return res.json(tweets);
    } catch (err) {
      console.error(err);
      return res.json({ msg: "Ha ocurrido un error al mostrar los tweets" });
    }
  },

  store: async (req, res) => {
    try {
      const user = req.auth.sub;
      const { content } = req.body;
      const author = await User.findById(user);
      const newTweet = new Tweet({
        user,
        content,
      });
      await newTweet.save();
      author.tweets.push(newTweet);
      await author.save();

      return res.json({ msg: "Se creó el tweet" });
    } catch (err) {
      console.error(err);
      return res.json({ msg: "Ocurrió un error al crear el tweet" });
    }
  },

  update: async (req, res) => {
    try {
      const user = req.auth.sub;
      const tweet = await Tweet.findById(req.params.id);

      if (tweet.likes.includes(user)) {
        tweet.likes.pull(user);
      } else {
        tweet.likes.push(user);
      }
      await tweet.save();
      return res.json({ msg: "Se actualizó el like" });
    } catch (err) {
      console.error(err);
      return res.json({ msg: "Ocurrió un error al actualizar el like" });
    }
  },

  destroy: async (req, res) => {
    try {
      await Tweet.findByIdAndDelete(req.params._id);
      return res.json({ msg: "Se eliminó el tweet" });
    } catch (err) {
      console.error(err);
      return res.json({ msg: "Ocurrió un error al eliminar el tweet" });
    }
  },
};

module.exports = tweetController;
