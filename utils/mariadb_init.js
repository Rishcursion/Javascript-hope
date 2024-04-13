const mariadb = require("mariadb");
const dotenv = require("dotenv");

const ea = process.env;

const pool = mariadb.createPool({
  host: ea.DATABASE_HOST,
  port: ea.DATABASE_PORT,
  user: ea.DATABASE_ROOT,
  password: ea.DATABASE_PASSWORD,
  database: ea.DATABASE,
  connectionLimit: 2,
});

module.exports = {
  getConnection() {
    return new Promise(function (res, rej) {
      pool
        .getConnection()
        .then(function (conn) {
          res(conn);
        })
        .catch(function (error) {
          rej(error);
        });
    });
  },
};
