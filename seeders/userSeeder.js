const faker = require("@faker-js/faker").fakerES;
const User = require("../models/User");

module.exports = async () => {
  const users = [];

  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    users.push({
      firstname: firstName,
      lastname: lastName,
      username: faker.internet.userName({ firstName, lastName }),
      password: "1234",
      email: faker.internet.email({ firstName, lastName, provider: "gmail.com" }),
      description: faker.lorem.sentence({ max: 10 }),
      photo: faker.image.avatar(),
    });
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
