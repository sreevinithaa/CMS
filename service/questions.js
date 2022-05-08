var inquirer = require("inquirer");

var functionality = require("./functionality.js");


const option_choices = [
  "View All Employees",
  "Add Employee",
  "Update Employee Role",
  "Update employee managers",
  "View All roles",
  "Add Role",
  "View All departments",
  "Add Department",
  "View the total utilized budget of a department",
  "View Employees By Manager",
  "Quit",
];

const mainQuestion = async () => {
  return await inquirer.prompt([
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


const loadSecondQuestion = (selected_option) => {
  let obj;
  switch (selected_option) {
    case "View All Employees":
      obj = functionality.fk_view_employees();
      break;
      case "View Employees By Manager":
        obj = functionality.fk_view_employees_by_manager();
        break;
    case "Add Employee":
      obj = functionality.fk_add_employees();
      break;
    case "Update Employee Role":
      obj = functionality.fk_update_employee_role();
      break;
      case "Update employee managers":
        obj = functionality.fk_update_employee_manager();
        break;      
    case "View All roles":
      obj = functionality.fk_view_roles();
      break;
    case "Add Role":
      obj = functionality.fk_add_roles();
      break;
    case "View All departments":
      obj = functionality.fk_view_department();
      break;
    case "Add Department":
      obj = functionality.fk_add_department();
      break;
      case "View the total utilized budget of a department":
        obj = functionality.fk_view_budget();
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
