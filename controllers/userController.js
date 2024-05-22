const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {
  show: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }).select("-password");
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
