const User = require("../models/User");

const userController = {
  show: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }).select("-password");
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.json({ msg: "Ha ocurrido un error al mostrar usuario" });
    }
  },

  store: async (req, res) => {
    try {
      const { firstname, lastname, username, password, email, description, photo } = req.body;
      const newUser = new User({
        firstname,
        lastname,
        username,
        password,
        email,
        description,
        photo,
      });
      await newUser.save();
      return res.json({ msg: "se ha creado el user" });
    } catch (err) {
      console.error(err);
      return res.json({ msg: "Ha ocurrido un error al crear usuario" });
    }
  },
};

module.exports = userController;
