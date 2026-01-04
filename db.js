require("dotenv").config();
const mysql = require("mysql2/promise");

const database = mysql.createPool({

  // host:"localhost",
  // password:"",
  // user:"root",
  // database:"electricone"
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

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
