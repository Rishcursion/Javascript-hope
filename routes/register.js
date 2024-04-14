const express = require("express");
const {
  registeration,
  deetsview,
  homeview,
  register_user,
  getdeets,
} = require("../controllers/registercontroller");

const router = express.Router();
router.get("/register", registeration);
router.get("/register/userdeets", deetsview);
router.get("/register/userdeets/homepage", homeview);

router.post("/register", register_user);
router.post("/register/userdeets", getdeets);

module.exports = router;
