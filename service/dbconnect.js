const mysql = require("mysql2/promise");

//database connection
async function db() {
  return await mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "dbadmin",
    // MySQL password
    password: "1234",
    database: "cms_db",
  });
}

module.exports = {
  db,
};
