const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "electricone",
});

(async () => {
  try {
    const connection = await database.getConnection();
    console.log("Database connection successful");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

module.exports = database;
