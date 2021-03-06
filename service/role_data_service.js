const { db } = require("../service/dbconnect");

//select all role query for list
const view_role_list = async () => {
  const connecion = await db();
  return connecion.query(
    "SELECT role.id as 'value',title as 'name' FROM role "
  );
};

//add new role query
const add_role_ds = async (data) => {
  const connecion = await db();

  connecion.query(
    "insert into role(title,salary,department_id) values(?,?,?)",
    [data.title, data.salary, data.department_id]
  );
  return data;
};

//select all role query
const view_role_ds = async () => {
  const connecion = await db();
  return connecion.query(
    "SELECT role.id,title,salary,department.name as 'department' FROM role join department on department_id=department.id"
  );
};

module.exports = {
  add_role_ds,
  view_role_ds,
  view_role_list,
};
