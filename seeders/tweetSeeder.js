const faker = require("@faker-js/faker").fakerES;
const Tweet = require("../models/Tweet");
const User = require("../models/User");

module.exports = async () => {
  const tweets = [];
  const users = await User.find();

  for (const user of users) {
    for (let i = 0; i < Math.ceil(Math.random() * 10); i++) {
      const newTweet = new Tweet({
        user: user,
        content: faker.lorem.paragraph(1),
      });

      tweets.push(newTweet);

      user.tweets.push(newTweet);
      await user.save();
    }
  }

  await Tweet.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de Tweets.");
};
