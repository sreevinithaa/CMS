const mysql = require("mysql2/promise");
require('dotenv').config();
//database connection
async function db() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    // MySQL username,
    user: process.env.DB_USERNAME,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
}

module.exports = {
  db,
};
