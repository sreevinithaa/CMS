var inquirer = require("inquirer");
const cTable = require("console.table");
var employee_data_service = require("../../service/employee_data_service");
var department_data_service = require("../../service/department_data_service");
var role_data_service = require("../../service/role_data_service");

const option_choices = [
  "View All Employees",
  "Add Employee",
  "Update Employee Role",
  "Update employee managers",
  "View All roles",
  "Add Role",
  "View All departments",
  "Add Department",
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
const add_department_question = async () => {
  return await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "what is the name of the department?",
      validate(answer) {
        if (!answer) {
          return "Please enter the department name!";
        }
        return true;
      },
    },
  ]);
};

const update_employee_manager_question=async () => {

  
    const option_choices_manager = await employee_data_service
      .get_manager()
      .then((results) => {
        return results[0];
      });
      const option_choices_employee=option_choices_manager;
    
      return await inquirer.prompt([
        {
          type: "list",
          name: "id",
          message: "Which employee's manager do you want to update?",
          choices: option_choices_employee,
          validate(answer) {
            if (!answer) {
              return "Please select employee!";
            }
            else{
                option_choices_manager.splice(option_choices_employee.findIndex(m=>m.value==answer));
                console.log(option_choices_manager);
            }
            return true;
          },
        },
        {
          type: "list",
          name: "manager",
          message: "which manager do you want to assign the selected employee?",
          choices: option_choices_manager,
          validate(answer) {
            if (!answer) {
              return "Please choose the manager!";
            }
            return true;
          },
        },
        
      ]);
    }  
const update_employee_role_question=async () => {
    const option_choices_role = await role_data_service
      .view_role_list()
      .then((results) => {
        return results[0];
      });
  
    const option_choices_manager = await employee_data_service
      .get_manager()
      .then((results) => {
        return results[0];
      });
      return await inquirer.prompt([
        {
          type: "list",
          name: "id",
          message: "Which employee's role do you want to update?",
          choices: option_choices_manager,
          validate(answer) {
            if (!answer) {
              return "Please select employee!";
            }
            return true;
          },
        },
        {
          type: "list",
          name: "role",
          message: "which role do you want to assign the selected employee?",
          choices: option_choices_role,
          validate(answer) {
            if (!answer) {
              return "Please choose role!";
            }
            return true;
          },
        },
        
      ]);
    }  
const add_employee_question = async () => {
  const option_choices_role = await role_data_service
    .view_role_list()
    .then((results) => {
      return results[0];
    });

  const option_choices_manager = await employee_data_service
    .get_manager()
    .then((results) => {
      return results[0];
    });

  option_choices_manager.push({ value: null, name: "None" });
  //console.log(option_choices_manager);
  return await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "what is the employee's first name?",
      validate(answer) {
        if (!answer) {
          return "Please enter the first name!";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "last_name",
      message: "what is the employee's last name?",
      validate(answer) {
        if (!answer) {
          return "Please enter the last name!";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "role",
      message: "what is the employee's role?",
      choices: option_choices_role,
      validate(answer) {
        if (!answer) {
          return "Please choose role!";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "manager",
      message: "what is the employee's manager?",
      choices: option_choices_manager,
    },
  ]);
};

const add_role_question = async () => {
  const option_choices = await department_data_service
    .view_department_list()
    .then((results) => {
      return results[0];
    });

  return await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "what is the name of the role?",
      validate(answer) {
        if (!answer) {
          return "Please enter the role name!";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "salary",
      message: "what is the salary of the role?",
      validate(answer) {
          const rajex=/^\d+(\.\d{1,2})?$/;
        if (!answer) {
          return "Please enter the salary!";
        }
        if(!rajex.test(answer))
        {
            return "Please enter valid salary!";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "department_id",
      message: "which department does the role belong to?",
      choices: option_choices,
      validate(answer) {
        if (!answer) {
          return "Please choose department!";
        }
        return true;
      },
    },
  ]);
};
const fk_view_employees = async () => {
  const [rows, fields] = await employee_data_service
    .view_employee_ds()
    .catch(console.log);
  const res = { status: true, data: rows };
  console.table(res.data);
  return res;
};
const fk_add_employees = async () => {
  await add_employee_question()
    .then(async (data) => await employee_data_service.add_employee_ds(data))
    .then((res) => console.log(`Added ${res} to the database!`))
    .catch(console.log);

  const res = { status: true, message: "Success" };

  return res;
};

const fk_update_employee_manager =async () => {
    await update_employee_manager_question()
    .then(async (data) => await employee_data_service.update_employee_manager_ds(data))
    .then((res) => console.log(`Update employee's manager to the database!`))
    .catch(console.log);
  const res = { status: true, message: "Success" };

  return res;
};
const fk_update_employee_role =async () => {
    await update_employee_role_question()
    .then(async (data) => await employee_data_service.update_employee_ds(data))
    .then((res) => console.log(`Update employee's role to the database!`))
    .catch(console.log);
  const res = { status: true, message: "Success" };

  return res;
};
const fk_view_roles = async () => {
  const [rows, fields] = await role_data_service
    .view_role_ds()
    .catch(console.log);
  const res = { status: true, data: rows };
  console.table(res.data);
  return res;
};
const fk_add_roles = async () => {
  await add_role_question()
    .then(async (data) => await role_data_service.add_role_ds(data))
    .then((res) => console.log(`Added ${res.title} to the database!`))
    .catch(console.log);
  const res = { status: true, message: "Success" };

  return res;
};
const fk_view_department = async () => {
  const [rows, fields] = await department_data_service
    .view_department_ds()
    .catch(console.log);
  const res = { status: true, data: rows };
  console.table(res.data);

  return res;
};
const fk_add_department = async () => {
  await add_department_question()
    .then(async (data) => await department_data_service.add_department_ds(data))
    .then((res) => console.log(`Added ${res} to the database!`))
    .catch(console.log);
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
      obj = fk_update_employee_role();
      break;
      case "Update employee managers":
        obj = fk_update_employee_manager();
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
