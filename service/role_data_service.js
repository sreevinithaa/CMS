const db = require("../service/dbconnect");

var Role = require("../lib/Role");


const add_role_ds =async (data) => {

  const connecion = await db();
  connecion.query("insert into role(title,salary,department_id) values(?,?,?)", [
    data.title,
    data.salary,
    data.department_id,
  ]);
};
const view_role_ds =async () => {
  const connecion = await db();
  connecion.query("SELECT * FROM role join department on department_id=department.id", function (err, results) {
    if (err) {
      return null;
    } else {
      var normalResults = results.map((mysqlObj, index) => {
        return Object.assign ({}, mysqlObj);
      });
    }
  });
};
module.exports = {
    add_role_ds,
    view_role_ds,
  };
  