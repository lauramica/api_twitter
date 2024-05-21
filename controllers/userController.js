const User = require("../models/User");

const userController = {
  show: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username }).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err);
      res.json({ msg: "Ha ocurrido un error al mostrar usuario" });
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
      res.json({ msg: "se ha creado el user" });
    } catch (err) {
      console.error(err);
      res.json({ msg: "Ha ocurrido un error al crear usuario" });
    }
  },
};

module.exports = userController;
