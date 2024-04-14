const pool = require("../utils/mariadb_init");

module.exports = {
  async gettabledata(uuid) {
    sqlquery = "SELECT * from response where uuid = (?)";
    try {
      const conn = await pool.getConnection();
      const sqlobject = await conn.query(sqlquery, [uuid]);
      if (sqlobject.length == 0) {
        console.log("Data Not Availabe");
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
