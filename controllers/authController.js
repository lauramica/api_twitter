const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function getToken(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ msg: "verifique credenciales 1" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.json({ msg: "verifique credenciales 2" });

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
  return res.json(token);
}

module.exports = { getToken };
