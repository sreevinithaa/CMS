var inquirer = require("inquirer");
var employee_data_service = require("./employee_data_service");
var department_data_service = require("./department_data_service");
var role_data_service = require("./role_data_service");
const cTable = require("console.table");

//Prompt for add department
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

//prompt for update employee by manager
const update_employee_manager_question = async () => {
  const option_choices_manager = await employee_data_service
    .get_manager()
    .then((results) => {
      return results[0];
    });
  const option_choices_employee = option_choices_manager;

  return await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Which employee's manager do you want to update?",
      choices: option_choices_employee,
      validate(answer) {
        if (!answer) {
          return "Please select employee!";
        } else {
          option_choices_manager.splice(
            option_choices_employee.findIndex((m) => m.value == answer)
          );
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
};

//Prompt for view employee by manager
const view_employee_by_manager_question = async () => {
  const option_choices_manager = await employee_data_service
    .get_assign_manager()
    .then((results) => {
      return results[0];
    });

  return await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Choose the manager to display his employees?",
      choices: option_choices_manager,
      validate(answer) {
        if (!answer) {
          return "Please select manager!";
        }
        return true;
      },
    },
  ]);
};

//prompt for view employee by department
const view_employee_by_department_question = async () => {
  const option_choices_deparment = await department_data_service
    .view_department_list()
    .then((results) => {
      return results[0];
    });

  return await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Choose the department to display the employees?",
      choices: option_choices_deparment,
      validate(answer) {
        if (!answer) {
          return "Please select department!";
        }
        return true;
      },
    },
  ]);
};

//prompt for update employee role
const update_employee_role_question = async () => {
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
};

//prompt for add employee
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

//prompt for add role
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
        const rajex = /^\d+(\.\d{1,2})?$/;
        if (!answer) {
          return "Please enter the salary!";
        }
        if (!rajex.test(answer)) {
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


//view employee functionality
const fk_view_employees = async () => {
  const [rows, fields] = await employee_data_service
    .view_employee_ds()
    .catch(console.log);
  const res = { status: true, data: rows };
  console.table(res.data);
  return res;
};

//view employee by manager functionality
const fk_view_employees_by_manager = async () => {
  await view_employee_by_manager_question()
    .then(
      async (data) =>
        await employee_data_service.view_employee_by_manager_ds(data)
    )
    .then((res) => console.table(res[0]))
    .catch(console.log);
  const res = { status: true, data: "success!" };

  return res;
};

//view employee by department functionality
const fk_view_employees_by_department = async () => {
  await view_employee_by_department_question()
    .then(
      async (data) =>
        await employee_data_service.view_employee_by_department_ds(data)
    )
    .then((res) => console.table(res[0]))
    .catch(console.log);
  const res = { status: true, data: "success!" };

  return res;
};

//add new employee functionality
const fk_add_employees = async () => {
  await add_employee_question()
    .then(async (data) => await employee_data_service.add_employee_ds(data))
    .then((res) => console.log(`Added ${res} to the database!`))
    .catch(console.log);

  const res = { status: true, message: "Success" };

  return res;
};

//update employee manager functionality
const fk_update_employee_manager = async () => {
  await update_employee_manager_question()
    .then(
      async (data) =>
        await employee_data_service.update_employee_manager_ds(data)
    )
    .then((res) => console.log(`Update employee's manager to the database!`))
    .catch(console.log);
  const res = { status: true, message: "Success" };

  return res;
};

//update employee role functionality
const fk_update_employee_role = async () => {
  await update_employee_role_question()
    .then(async (data) => await employee_data_service.update_employee_ds(data))
    .then((res) => console.log(`Update employee's role to the database!`))
    .catch(console.log);
  const res = { status: true, message: "Success" };

  return res;
};

//view all role functionality
const fk_view_roles = async () => {
  const [rows, fields] = await role_data_service
    .view_role_ds()
    .catch(console.log);
  const res = { status: true, data: rows };
  console.table(res.data);
  return res;
};

//add new role functionality
const fk_add_roles = async () => {
  await add_role_question()
    .then(async (data) => await role_data_service.add_role_ds(data))
    .then((res) => console.log(`Added ${res.title} to the database!`))
    .catch(console.log);
  const res = { status: true, message: "Success" };

  return res;
};

//view all department functionality
const fk_view_department = async () => {
  const [rows, fields] = await department_data_service
    .view_department_ds()
    .catch(console.log);
  const res = { status: true, data: rows };
  console.table(res.data);

  return res;
};

//add new department functionality
const fk_add_department = async () => {
  await add_department_question()
    .then(async (data) => await department_data_service.add_department_ds(data))
    .then((res) => console.log(`Added ${res} to the database!`))
    .catch(console.log);
  const res = { status: true, message: "Success" };

  return res;
};

//view budget for department functionality
const fk_view_budget = async () => {
  const [rows, fields] = await employee_data_service
    .view_edepartment_budget_ds()
    .catch(console.log);
  const res = { status: true, data: rows };
  console.table(res.data);

  return res;
};

module.exports = {
  fk_view_budget,
  fk_view_employees,
  fk_add_employees,
  fk_update_employee_manager,
  fk_update_employee_role,
  fk_view_roles,
  fk_add_roles,
  fk_view_department,
  fk_add_department,
  fk_view_employees_by_manager,
  fk_view_employees_by_department,
};
