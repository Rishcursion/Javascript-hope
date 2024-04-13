const pool = require("../utils/mariadb_init");

module.exports = {
  async registerdetails(
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
      const sqlob = await conn.query(uuid_query, user_name);
      if (sqlob.length == 0) {
        return false;
      } else {
        const uuid = sqlob[0].uuid;
      }
      const sqlquery = "INSERT INTO user_data  VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      await conn.query(sqlquery, [
        user_gender,
        user_age,
        user_weight,
        user_height,
        user_neck_size,
        user_waist_size,
      ]);
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
  },
};
