var inquirer = require("inquirer");
const cTable = require("console.table");
var employee_data_service = require("../../service/employee_data_service");
var department_data_service = require("../../service/department_data_service");
var role_data_service = require("../../service/role_data_service");

const option_choices = [
  "View All Employees",
  "Add Employee",
  "Update Employee Role",
  "View All roles",
  "Add Role",
  "View All departments",
  "Add Department",
  "Quit",
];
const mainQuestion = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "What would you like to do ?",
      choices: option_choices,
      validate(answer) {
        if (!answer) {
          return "Please choose the option!";
        }
        return true;
      },
    },
  ]);
};

const fk_view_employees = async () => {
  
  const [rows, fields] = await employee_data_service.view_employee_ds();
  const res = { status: true, data: rows };
  console.table(res.data);
  return res;
};
const fk_add_employees = () => {
  const res = { status: true, message: "Success" };

  return res;
};
const fk_update_employees = () => {
  const res = { status: true, message: "Success" };

  return res;
};
const fk_view_roles =async () => {

  const [rows, fields] = await role_data_service.view_role_ds();
  const res = { status: true, data: rows };
  console.table(res.data);
  return res;
};
const fk_add_roles = () => {
  const res = { status: true, message: "Success" };

  return res;
};
const fk_view_department =async () => {

    const [rows, fields] = await department_data_service.view_department_ds();
    const res = { status: true, data: rows };
    console.table(res.data);
  
  return res;
};
const fk_add_department = () => {
  const res = { status: true, message: "Success" };

  return res;
};

const loadSecondQuestion = (selected_option) => {
  let obj;
  switch (selected_option) {
    case "View All Employees":
      obj = fk_view_employees();
      break;
    case "Add Employee":
      obj = fk_add_employees();
      break;
    case "Update Employee Role":
      obj = fk_update_employees();
      break;
    case "View All roles":
      obj = fk_view_roles();
      break;
    case "Add Role":
      obj = fk_add_roles();
      break;
    case "View All departments":
      obj = fk_view_department();
      break;
    case "Add Department":
      obj = fk_add_department();
      break;
    case "Quit":
      obj = {
        status: false,
        message: "You have choose Quit option.Thanks.Bye",
      };
      break;
    default:
      break;
  }
  return obj;
};

module.exports = {
  mainQuestion,
  loadSecondQuestion,
};
