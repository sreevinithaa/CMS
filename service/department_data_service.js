const { db } = require("../service/dbconnect");




const add_department_ds =async ({name}) => {
  
  const connecion = await db();
  await connecion.query("insert into department(name) values(?)", name);
  return name;
};
const view_department_ds =async () => {
  const connecion = await db();
  return connecion.query("SELECT * FROM department");
};
module.exports = {
    add_department_ds,
    view_department_ds,
  };
  
