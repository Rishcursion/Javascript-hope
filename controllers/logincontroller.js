const loginview = (request, response) => {
  response.render("login", {});
};

const homeview = (request, response) => {
  response.render("homepage", {});
};

const landview = (request, response) => {
  response.render("landingpage", {});
};

module.exports = {
  loginview,
  homeview,
  landview,
};
