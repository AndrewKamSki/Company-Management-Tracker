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
    }
  })
  // loadPrompts();
};

// View All Employees;
function viewAllEmployees() {
  const query = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                role.title,
                department.name,
                role.salary,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id
                JOIN employee AS manager ON employee.manager_id = manager.id
                ORDER BY employee.id`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
    init();
  });
};

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
