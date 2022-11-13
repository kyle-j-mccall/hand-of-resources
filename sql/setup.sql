-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;


CREATE TABLE dogs (
	id INT,
	name VARCHAR(50),
	color VARCHAR(50),
	age INT
);

insert into dogs (id, name, color, age) values (1, 'Lark', 'Mauv', 8);
insert into dogs (id, name, color, age) values (2, 'Jason', 'Purple', 5);
insert into dogs (id, name, color, age) values (3, 'Ilyse', 'Yellow', 9);
insert into dogs (id, name, color, age) values (4, 'Roshelle', 'Maroon', 6);
insert into dogs (id, name, color, age) values (5, 'Babara', 'Maroon', 15);
insert into dogs (id, name, color, age) values (6, 'Desiree', 'Khaki', 13);
insert into dogs (id, name, color, age) values (7, 'Tamara', 'Mauv', 4);
insert into dogs (id, name, color, age) values (8, 'Jodie', 'Violet', 13);