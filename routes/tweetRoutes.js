const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");

router.use(
  checkJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }),
);

router.get("/", tweetController.index);
router.post("/", tweetController.store);
router.patch("/:id", tweetController.update);
router.delete("/:id", tweetController.destroy);

module.exports = router;
