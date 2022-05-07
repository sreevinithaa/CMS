const mysql = require("mysql2");
const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "dbadmin",
      // MySQL password
      password: "1234",
      database: "crm_db",
    },
    console.log(`Connected to the crm_db database.`)
  );

  module.exports = {
   db
  };
  