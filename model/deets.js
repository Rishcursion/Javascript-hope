const pool = require("../utils/mariadb_init");

module.exports = {
  async gettabledata(uuid) {
    sqlquery = "SELECT * from response where uuid = (?)";
    try {
      const conn = await pool.getConnection();
      const sqlobject = await conn.query(sqlquery, [uuid]);
      if (sqlobject.length == 0) {
        const newquery =
          "SELECT gender,weight,height,neck_circumference,waist_size from user_data where uuid = (?)";
        const sqlobject2 = await conn.query(newquery, [uuid]);
        return sqlobject2;
      } else {
        return sqlobject;
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      conn.release();
    }
  },
};
