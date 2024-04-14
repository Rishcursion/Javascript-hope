const bcrypt = require("bcrypt");
const pool = require("../utils/mariadb_init");

module.exports = {
  async auth(username) {
    try {
      sqlquery = "SELECT * from User WHERE username = (?)";
      conn = await pool.getConnection();
      const sqlobj = await conn.query(sqlquery, [username]);
      conn.release();
      if (sqlobj.length > 0) {
        return sqlobj[0];
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },
};
