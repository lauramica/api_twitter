const Tweet = require("../models/Tweet");

const tweetController = {
  index: (req, res) => {},
  store: async (req, res) => {
    try {
      const { user, content, likes } = req.body;
      const newTweet = new Tweet({
        user,
        content,
        likes,
      });
      await newTweet.save();
      res.json({ msg: "Se ha creado un nuevo tweet" });
    } catch (err) {
      console.error(err);
      res.json({ msg: "Ha ocurrido un error al crear tweet" });
    }
  },
  update: (req, res) => {},
  destroy: (req, res) => {},
};

module.exports = tweetController;
