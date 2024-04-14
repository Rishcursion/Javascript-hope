const express = require("express");
const {
  loginview,
  landview,
  loginUser,
  //addentry,
  getTableData,
} = require("../controllers/logincontroller");

const router = express.Router();
1;
router.get("/", landview);
router.get("/login", loginview);
router.get("/login/homepage", getTableData);

router.post("/login", loginUser);
// router.post("/homepage/add", addentry);

module.exports = router;
