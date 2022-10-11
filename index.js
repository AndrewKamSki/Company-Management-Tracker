const { prompt } = require("inquirer");
const db = require("./db/connection");
const sql = require("mysql2/promise");
const express = require("express");
const table = require("console.table");

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
  })
  // loadPrompts();
}

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
