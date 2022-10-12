const { prompt } = require("inquirer");
const db = require("./db/connection");
const express = require("express");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

init();

// Display logo text, load main prompts
function init() {
  prompt({
    type: 'list',
    name: 'menu_options',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Deparment', 'Quit']
  }).then( answer => {
    switch (answer.menu_options) {
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Quit':
        quit();
        break;
    }
  })
};

// View All Employees;
function viewAllEmployees() {
  const query = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                department.name AS department,
                role.salary,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                ORDER BY employee.id`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
    init();
  });
};

// Add employee
function addEmployee() {

}

// Update employee role
function updateEmployeeRole() {

}

// View all roles
function viewAllRoles() {

}

// Add a role
function addRole () {

}

// View all departments
function viewAllDepartments() {

}

// Add a department
function addDepartment() {

}

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
