const express = require("express");
const {
  registerview,
  afterregister,
  homeview,
} = require("../controllers/registercontroller");

const router = express.Router();
router.get("/register", registerview);
router.get("/register/userdeets", afterregister);
router.get("/register/userdeets/home", homeview);

module.exports = router;
