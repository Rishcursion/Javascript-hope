const pool = require("../utils/mariadb_init");
module.exports = {
  async registerdetails(
    username,
    user_name,
    user_gender,
    user_age,
    user_weight,
    user_height,
    user_neck_size,
    user_waist_size
  ) {
    try {
      const conn = await pool.getConnection();
      const uuid_query = "SELECT uuid FROM User WHERE username = ?";
      const sqlob = await conn.query(uuid_query, username);
      if (sqlob.length == 0) {
        conn.release();
        return false;
      }
      const uuid = sqlob[0].uuid;

      const sqlquery = "INSERT INTO user_data  VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      await conn.query(sqlquery, [
        uuid,
        user_name,
        user_gender,
        user_age,
        user_height,
        user_weight,
        user_neck_size,
        user_waist_size,
        uuid,
      ]);
      conn.release();
      return true;
    } catch (err) {
      throw err;
    }
  },
};
