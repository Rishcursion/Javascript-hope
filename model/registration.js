const bcrypt = require("bcrypt");
const pool = require("../utils/mariadb_init");

module.exports = {
  async register(username, email, pass, repass) {
    console.log("reached model");
    if (pass == repass) {
      try {
        conn = await pool.getConnection();
        sql1 = "select username from User where username = (?)";
        sql2 =
          "INSERT INTO User (uuid, username, email, password) VALUES (NULL, ?, ?, ?)";
        const sqlobj1 = await conn.query(sql1, [username]);
        if (sqlobj1.length > 0) {
          return false;
        } else {
          const hash_pass = await bcrypt.hash(pass, 10);
          await conn.query(sql2, [username, email, hash_pass]);
          return true;
        }
      } catch (err) {
        throw err;
      } finally {
        conn.release();
      }
    } else {
      return false;
    }
  },
};
