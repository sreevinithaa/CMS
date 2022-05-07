const db = require("../service/dbconnect");
var Department = require("../lib/Department");



const add_department_ds =async (data) => {
  const connecion = await db();
  connecion.query("insert into department(name) values(?)", data.name);
};
const view_department_ds =async () => {
  const connecion = await db();
  connecion.query("SELECT * FROM department", function (err, results) {
    if (err) {
      return null;
    } else {
      var normalResults = results.map((mysqlObj, index) => {
        return Object.assign  ({}, mysqlObj);
      });
    }
  });
};
module.exports = {
    add_department_ds,
    view_department_ds,
  };
  
