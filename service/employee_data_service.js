const { db } = require("../service/dbconnect");


const get_manager=async () => {
  const connecion = await db();
  return connecion.query(`SELECT id as 'value',CONCAT(first_name, ' ',  last_name) as 'name'  FROM employee `);
};
const add_employee_ds =async (data) => {
  const connecion = await db();

  if(data.manager!=null)
  {
    const obj_manager=await connecion.query("select id from employee where first_name=? LIMIT 1", data.manager).then((results) => {return results[0]});
    connecion.query(
      "insert into employee(first_name,last_name,role_id,manager_id) values(?,?,?,?)",
      [data.first_name, data.last_name, data.role, data.manager]
    );
  }
  else{
    connecion.query(
      "insert into employee(first_name,last_name,role_id) values(?,?,?,?)",
      [data.first_name, data.last_name, data.role]
    );
  }
 return data.first_name+" "+data.last_name;
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
  get_manager,
};
