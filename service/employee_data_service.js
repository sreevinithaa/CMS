const { db } = require("../service/dbconnect");

const get_manager = async () => {
  const connecion = await db();
  return connecion.query(
    `SELECT id as 'value',CONCAT(first_name, ' ',  last_name) as 'name'  FROM employee `
  );
};

const get_assign_manager = async () => {
  const connecion = await db();
  return connecion.query(
    `SELECT DISTINCT emp.id as 'value',CONCAT(emp.first_name, ' ',  emp.last_name) as 'name'  FROM employee
    join employee emp on employee.manager_id=emp.id `
  );
};
const add_employee_ds = async (data) => {
  const connecion = await db();

  if (data.manager != null) {
  
    connecion.query(
      "insert into employee(first_name,last_name,role_id,manager_id) values(?,?,?,?)",
      [data.first_name, data.last_name, data.role, data.manager]
    );
  } else {
    connecion.query(
      "insert into employee(first_name,last_name,role_id) values(?,?,?,?)",
      [data.first_name, data.last_name, data.role]
    );
  }
  return data.first_name + " " + data.last_name;
};
const update_employee_ds = async (data) => {
  const connecion = await db();  
    connecion.query(
      "update employee set role_id=? where id=?",
      [data.role, data.id]
    );
  
  return data;
};
const update_employee_manager_ds = async (data) => {
  const connecion = await db();  
    connecion.query(
      "update employee set manager_id=? where id=?",
      [data.manager, data.id]
    );
  
  return data;
};

const view_employee_ds = async () => {
  const connecion = await db();
  return connecion.query(`SELECT employee.id,employee.first_name,employee.last_name,role.title as 'role',department.name as 'department',CONCAT(COALESCE(emp.first_name,''), ' ',  COALESCE(emp.last_name,'')) as 'Manager' FROM employee 
  join role on role_id=role.id
  join department on department_id=department.id
  LEFT JOIN employee emp on employee.manager_id=emp.id`);
};

const view_employee_by_manager_ds = async (data) => {
  const connecion = await db();
  return connecion.query(`SELECT employee.id,employee.first_name,employee.last_name,role.title as 'role',department.name as 'department',CONCAT(COALESCE(emp.first_name,''), ' ',  COALESCE(emp.last_name,'')) as 'Manager' FROM employee 
  join role on role_id=role.id
  join department on department_id=department.id
  JOIN employee emp on employee.manager_id=emp.id
  where employee.manager_id=?`,data.id);
};
const view_employee_by_department_ds = async (data) => {
  const connecion = await db();
  return connecion.query(`SELECT employee.id,employee.first_name,employee.last_name,role.title as 'role',department.name as 'department',CONCAT(COALESCE(emp.first_name,''), ' ',  COALESCE(emp.last_name,'')) as 'Manager' FROM employee 
  join role on role_id=role.id
  join department on department_id=department.id
  left JOIN employee emp on employee.manager_id=emp.id
  where department_id=?`,data.id);
};
const view_edepartment_budget_ds = async () => {
  const connecion = await db();
  return connecion.query(`SELECT sum(salary) as 'Total',department.name as 'Department' FROM employee 
  join role on role_id=role.id
  join department on department_id=department.id
  group by department.name
  `);
};
module.exports = {
  add_employee_ds,
  view_employee_ds,
  get_manager,
  update_employee_ds,
  update_employee_manager_ds,
  view_edepartment_budget_ds,
  get_assign_manager,
  view_employee_by_manager_ds,
  view_employee_by_department_ds
};
