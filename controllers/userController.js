const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {
  index: async (req, res) => {
    try {
      const users = await User.find().select("-password").populate("tweets");
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.json({ msg: "Ha ocurrido un error al mostrar los usuarios" });
    }
  },
  show: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }).select("-password").populate("tweets");
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.json({ msg: "Ocurrió un error al mostrar el usuario" });
    }
  },

  store: async (req, res) => {
    try {
      const { firstname, lastname, username, password, email, description, photo } = req.body;
      const newUser = new User({
        firstname,
        lastname,
        username,
        password: await bcrypt.hash(password, 10),
        email,
        description,
        photo,
      });
      await newUser.save();
      return res.json({ msg: "Se creó el usuario" });
    } catch (err) {
      console.error(err);
      return res.json({ msg: "Ocurrió un error al crear el usuario" });
    }
  },
};

module.exports = userController;
