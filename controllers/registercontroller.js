const registerview = (request, response) => {
  response.render("register", {});
};

const afterregister = (request, response) => {
  response.render("userdetails", {});
};

const homeview = (request, response) => {
  response.render("homepage", {});
};

module.exports = {
  registerview,
  afterregister,
  homeview,
};
