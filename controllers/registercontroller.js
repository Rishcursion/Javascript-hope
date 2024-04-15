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
const journalview = (req, res) => {
  res.render("journal", {});
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
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function journalentry(req, res) {
  let uuid = req.cookies.uuid;
  let workout_id = req.body.wid;
  let duration = req.body.duration;
  let sets = req.body.sets;
  let reps = req.body.reps;

  try {
    await models.journal_entry(uuid, workout_id, duration, reps, sets);
    res.redirect("/login/homepage");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
module.exports = {
  registeration,
  deetsview,
  homeview,
  journalview,
  register_user,
  getdeets,
  journalentry,
  getTableData,
};
