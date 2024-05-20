const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/*
 * API endpoints relacionados a los usuarios.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/users",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.post("/", userController.store);
router.get("/:id", userController.show);

module.exports = router;
