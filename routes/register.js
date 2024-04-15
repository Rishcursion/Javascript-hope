const express = require("express");
const {
  registeration,
  deetsview,
  homeview,
  journalview,
  register_user,
  getdeets,
  journalentry,
  getTableData,
} = require("../controllers/registercontroller");

const router = express.Router();
router.get("/register", registeration);
router.get("/register/userdeets", deetsview);
router.get("/register/userdeets/homepage", getTableData);
router.get("/register/userdeets/journal", journalview);

router.post("/register", register_user);
router.post("/register/userdeets", getdeets);
router.post("/register/userdeets/journal", journalentry);

module.exports = router;
