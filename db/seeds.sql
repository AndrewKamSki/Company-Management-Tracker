INSERT INTO department (name)
VALUES 
  ('Engineering'),
  ('Sales'),
  ('Executive'),
  ('Customer Service'),
  ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES 
  ("Software Engineer", 80000, 1),
  ("Software Engineering Manager", 120000, 1),
  ("Sales Lead", 80000, 2),
  ("Salesperson", 60000, 2),
  ("CEO", 350000, 3),
  ("CFO", 300000, 3),
  ("COO", 300000, 3);
  ("Representative", 42000, 4),
  ("Supervisor", 65000, 4),
  ("Director", 150000, 5),
  ("Recruiter", 60000, 5),
  ("Specialist", 63000, 5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ("The Great Gatsby", true, 1),
  ("Huckleberry Finn", true, 3),
  ("100 Years of Solitude", false, 5),
  ("Things Fall Apart", false, 1),
  ("Crime and Punishment", true, 2),
  ("Moby Dick", true, 4),
  ("Decameron", false, 1);