const models = require("../model/registration");
const models2 = require("../model/newdeets");
const registeration = (req, res) => {
  res.render("register", {});
};

const deetsview = (req, res) => {
  res.render("userdetails", {});
};
const homeview = (req, res) => {
  res.render("homepage", {});
};
async function register_user(req, res) {
  let username = req.body.user;
  let email = req.body.email;
  let password = req.body.pass;
  let confirmPassword = req.body.repass;

  try {
    const result = await models.register(
      username,
      email,
      password,
      confirmPassword
    );

    if (result) {
      res.redirect("/register/userdeets");
      console.log("Registration Succesful!");
    } else {
      res.render("register", {
        error: "Username Already Exists/ Passwords Do Not Match",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getdeets(req, res) {
  let username = req.body.Username;
  let user_name = req.body.name;
  let user_gender = req.body.gender;
  let user_age = req.body.age;

  let user_height = req.body.height;
  let user_weight = req.body.weight;
  let user_waist_size = req.body.waist_size;
  let user_neck_size = req.body.neck_size;
  try {
    const result2 = await models2.registerdetails(
      username,
      user_name,
      user_gender,
      user_age,
      user_height,
      user_weight,
      user_waist_size,
      user_neck_size
    );
    res.redirect("/register/userdeets/homepage");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  registeration,
  deetsview,
  homeview,
  register_user,
  getdeets,
};
