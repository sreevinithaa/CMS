const { db } = require("../service/dbconnect");

var Employee = require("../lib/Employee");

const add_employee_ds =async (data) => {
  const connecion = await db();
  connecion.query(
    "insert into employee(first_name,last_name,role_id,manager_id) values(?,?,?,?)",
    [data.first_name, data.last_name, data.role_id, data.manager_id]
  );
};

const view_employee_ds =async () => {
  const connecion = await db();
  return connecion.query("SELECT * FROM employee");
};
module.exports = {
  add_employee_ds,
  view_employee_ds,
};
