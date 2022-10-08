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
  ("COO", 300000, 3),
  ("Supervisor", 65000, 4),
  ("Representative", 42000, 4),
  ("Director", 150000, 5),
  ("Recruiter", 60000, 5),
  ("Specialist", 63000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ("Evan", "Kane", 1, 3),
  ("Tommy-Lee", "Allman", 1, 3),
  ("Bernard", "Mclean", 2, NULL),
  ("Hamza", "Rankin", 3, NULL),
  ("Usmaan", "O'Conner", 3, NULL),
  ("Elmer", "Duran", 4, 4),
  ("Anisa", "Mora", 4, 4),
  ("Zidane", "Power", 4, 5),
  ("Sienna", "Henry", 5, NULL),
  ("Lacey-May", "Healy", 6, NULL),
  ("Stewart", "Cross", 7, NULL),
  ("Ffion", "Green", 8, NULL),
  ("Aaliyah", "Whitfield", 9, 12),
  ("Cherise", "Blackmore", 9, 12),
  ("Abiha", "Ayala", 9, 12),
  ("Hayleigh", "Bravo", 10, NULL),
  ("Jeremiah", "Bryan", 11, 16),
  ("Shannon", "Burgess", 11, 16),
  ("Cassia", "Obrien", 12, 16),
  ("Rafe", "Millington", 12, 16);
