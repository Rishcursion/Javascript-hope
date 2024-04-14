const bcrypt = require("bcrypt");
const userModel = require("../model/login");
const deets = require("../model/deets");
const loginview = (request, response) => {
  response.render("login", {});
};

const landview = (request, response) => {
  response.render("landingpage", {});
};

async function loginUser(req, res) {
  let username = req.body.Username;
  let pass = req.body.pass;

  try {
    // Call the auth function from userModel to authenticate the user
    const user = await userModel.auth(username);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      // Authentication successful
      // Redirect to the homepage
      res.cookie("uuid", user.uuid);
      console.log("cookie is set");
      res.redirect("/login/homepage");
    } else {
      // Authentication failed
      res.render("login", { error: "Incorrect password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function getTableData(req, res) {
  const uuid = req.cookies.uuid; // Assuming the UUID is stored in the session
  console.log(`${uuid}`);
  try {
    const data = await deets.gettabledata(uuid);
    if (data) {
      const waist_neck_log = Math.log(
        data[0].waist_size - data[0].neck_circumference
      );
      const heightLog = Math.log10(data[0].height);
      const bmi = (
        (data[0].weight / Math.pow(data[0].height, 2)) *
        10000
      ).toFixed(2);
      const body_fat = (
        (495 / (1.0324 - 0.19077 * waist_neck_log + 0, 0.15456 * heightLog) -
          450) /
        100
      ).toFixed(2);
      const biodata = { bmi, body_fat };
      res.render("homepage", { data, biodata });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
//async function addentry(req, res) {
//const uuid = req.cookies.uuid;
//try {
//await addentry.insert()
// }
//}

module.exports = {
  loginview,
  landview,
  loginUser,
  getTableData,
};
