# CMS

## Table of Contents

- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)

## Description

Node.js  command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## User Story
```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```
## Installation

`npm init`

`npm i`

## Usage

Run the following command at th root of your project and answer the prompted questions:

`node index.js`

## Contributing

[Vinitha Gowtheepan](https://github.com/sreevinithaa)

## Vedio of functionality

![CMS gif link](./src/assets/img/Employee_CMS_Demo.gif)<br>
The full movie file showing functionality of the application can be found [here](https://sreevinithaa.github.io/CMS/src/assets/vedio/Employee_CMS_Demo.mp4)



## Repository

You can get the code in the following link. https://github.com/sreevinithaa/CMS.git


## Questions

Contact me with any questions: [email](mailto:sreevinithaa@gmail.com) , [GitHub](https://github.com/sreevinithaa)<br />



