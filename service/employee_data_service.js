const db = require("../service/dbconnect");

var Employee = require("../lib/Employee");

const add_employee_ds = (data) => {
  db.query(
    "insert into employee(first_name,last_name,role_id,manager_id) values(?,?,?,?)",
    [data.first_name, data.last_name, data.role_id, data.manager_id]
  );
};

const view_employee_ds = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      return null;
    } else {
      var normalResults = results.map((mysqlObj, index) => {
        return Object.assign({}, mysqlObj);
      });
    }
  });
};
module.exports = {
  add_employee_ds,
  view_employee_ds,
};
