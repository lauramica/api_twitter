const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/", userController.index);
router.post("/", userController.store);

router.use(
  checkJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }),
);

router.get("/:username", userController.show);

module.exports = router;
