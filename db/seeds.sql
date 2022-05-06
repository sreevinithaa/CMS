INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary,department_id)
VALUES ("Sales Lead",100000, 1),
       ("Salesperson",70000, 1),
       ("Lead Engineer",120000, 2),
       ("Software Engineer",100000, 2),
       ("Accountant", 70000,3),
       ("Account Manager",10000,3 ),
       ("Legal team Lead", 120000,4),
        ("Lawyer", 120000,4);

        INSERT INTO employee (first_name, last_name,role_id,manager_id)
VALUES ("John","Lee",1, null),
       ("Jack","Mack",2, null),
       ("Ashton","Simpson",3, null),
       ("Levi","Mullar",4, null),
       ("Jeydon","Mullar",5, null),
       ("Parker","Hill",6, null),
       ("George","Lee",7, null),
       ("Charlie","Gate",8, null);
       
