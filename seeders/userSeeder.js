const faker = require("@faker-js/faker").fakerES;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = async () => {
  const users = [];
  const hashedPassword = await bcrypt.hash("1234", 10);

  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    users.push({
      firstname: firstName,
      lastname: lastName,
      username: faker.internet.userName({ firstName, lastName }),
      password: hashedPassword,
      email: faker.internet.email({ firstName, lastName, provider: "gmail.com" }),
      description: faker.lorem.sentence({ max: 10 }),
      avatar: faker.image.avatar(),
    });
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
