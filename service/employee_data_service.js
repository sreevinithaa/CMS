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
  return connecion.query(`SELECT employee.id,first_name,last_name,role.title as 'role',department.name as 'department' FROM employee 
  join role on role_id=role.id
  join department on department_id=department.id`);
};
module.exports = {
  add_employee_ds,
  view_employee_ds,
};
