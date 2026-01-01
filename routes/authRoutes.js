const express = require("express");
const router = express.Router();
const { register, login,getProfile } = require("../controllers/authcontrollers");

router.post("/register", register);
router.post("/login", login);
router.get("/view/:id", getProfile);

module.exports = router;
