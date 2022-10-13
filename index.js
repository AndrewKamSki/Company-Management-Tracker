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
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
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
  db.query('SELECT * FROM role', (err, roleResult) => {
    if (err) throw err;
    const roles = roleResult.map(role => role.title);
    db.query(`SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS full_name FROM employee`, (err, empResult) => {
      if (err) throw err;
      const employees = empResult.map(employee => employee.full_name)
      employees.unshift('None');
      prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "What is the employee's first name?"
        },
        {
          type: 'input',
          name: 'last_name',
          message: "What is the employee's last name?"
        },
        {
          type: 'list',
          name: 'role',
          message: 'What would you like to do?',
          choices: roles
        },
        {
          type: 'list',
          name: 'manager',
          message: 'What would you like to do?',
          choices: employees
        }
      ]).then((answer) => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        let role;
        let manager;
        db.query(`SELECT id FROM role WHERE title = ?`,answer.role,(err, result) => {
          if (err) throw err;
          role = result
          if (answer.manager === "None") {
            manager = null;
            const params = [answer.first_name, answer.last_name, role[0].id, manager];
            db.query(query, params, (err, result) => {
              if (err) throw err;
              console.log(`Added ${params[0]} ${params[1]} to the database`);
              init();
            });
          } else {
            db.query(`SELECT id FROM employee WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?`, answer.manager, (err, result) => {
              if (err) throw err;
              manager = result;
              const params = [answer.first_name, answer.last_name, role[0].id, manager[0].id];
              db.query(query, params, (err, result) => {
                if (err) throw err;
                console.log(`Added ${params[0]} ${params[1]} to the database`);
                init();
              });
            });
          };
        });
      });
    });
  });
}

// Update employee role
function updateEmployeeRole() {
  db.query(`SELECT * FROM employee`, (err, empResult) => {
    if (err) throw err;
    const employees = empResult.map(employee => {
      return {
        name: employee.first_name + ' ' + employee.last_name,
        value: employee.id
      }
    });
    db.query(`SELECT * FROM role`, (err, roleResult) => {
      if (err) throw err;
      const roles = roleResult.map(role => {
        return {
          name: role.title,
          value: role.id
        }
      });
      prompt([
        {
          type: 'list',
          name: 'employee',
          message: "Which employee's role to you want to update?",
          choices: employees
        },
        {
          type: 'list',
          name: 'role',
          message: 'Which role to you want to assign the selected employee?',
          choices: roles
        }
      ]).then ((answer) => {
        db.query('UPDATE employee SET ? WHERE ?', [ {role_id: answer.role}, {id: answer.employee}], (err, res) => {
          if (err) throw err;
          console.log('Updated employee\'s role')
          init();
        })
      })
    });
  })

}

// View all roles
function viewAllRoles() {
  const query = `SELECT role.id,
                role.title,
                department.name AS department,
                role.salary
                FROM role 
                LEFT JOIN department ON role.department_id = department.id
                ORDER BY role.id`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
    init();
  });
}

// Add a role
function addRole () {
  db.query('SELECT * FROM department', (err, result) => {
    if (err) throw err;
    const departments = result.map(department => department.name);
    prompt([
      {
        type: 'input',
        name: 'new_role',
        message: 'What is the name of the role?'
      },
      {
        type: 'input',
        name: 'new_salary',
        message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'department',
        message: 'What would you like to do?',
        choices: departments
      }
    ]).then((answer) => {
      const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      let department;
      db.query(`SELECT id FROM department WHERE name = ?`,answer.department,(err, result) => {
        if (err) throw err;
        department = result;
        const params = [answer.new_role, answer.new_salary, department[0].id];
        db.query(query, params, (err, result) => {
          if (err) throw err;
          console.log(`Added ${params[0]} to the database`);
          init();
        });
      });
    });
  })
}

// View all departments
function viewAllDepartments() {
  const query = `SELECT department.id,
                department.name
                FROM department
                ORDER BY department.id`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
    init();
  });
}

// Add a department
function addDepartment() {
  prompt({
    type: 'input',
    name: 'new_department',
    message: 'What is the name of the department?'
  }).then((answer) => {
    const query = `INSERT INTO department (name) VALUES (?)`;
    const params = [answer.new_department];
    db.query(query, params, (err, result) => {
      if (err) throw err;
      console.log(`Added ${params} to the database`);
      init();
    });
  });
};

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
