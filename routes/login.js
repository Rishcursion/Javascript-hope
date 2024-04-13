const express = require("express");
const {
  loginview,
  homeview,
  landview,
} = require("../controllers/logincontroller");

const router = express.Router();

router.get("/", landview);
router.get("/login", loginview);
router.get("/login/homepage", homeview);

module.exports = router;
