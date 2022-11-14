-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS cars;


CREATE TABLE dogs (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(50),
	color VARCHAR(50),
	age INT
);

CREATE TABLE countries (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  language VARCHAR NOT NULL,
  population INT NOT NULL
);

CREATE TABLE cars (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  make VARCHAR NOT NULL,
  model VARCHAR NOT NULL,
  year INT
);

INSERT INTO dogs (
  name,
  color, 
  age
)

VALUES 
  ('Lark', 'Mauv', 8),
  ('Jason', 'Purple', 5),
  ('Ilyse', 'Yellow', 9),
  ('Roshelle', 'Maroon', 6),
  ('Babara', 'Maroon', 15),
  ('Desiree', 'Khaki', 13),
  ('Tamara', 'Mauv', 4),
  ('Jodie', 'Violet', 13);


INSERT INTO countries (
  name,
  population, 
  language
)

VALUES 
  ('Indonesia', 919683, 'Albanian'),
  ('French Polynesia', 451833, 'Tswana'),
  ('Russia', 103882, 'Bengali'),
  ('Russia', 893145, 'Luxembourgish'),
  ('China', 553047, 'Bulgarian'),
  ('Indonesia', 880840, 'Croatian'),
  ('Indonesia', 341609, 'Montenegrin'),
  ('South Africa', 503223, 'Assamese');

INSERT INTO cars (
  make, 
  model, 
  year
)

VALUES 
  ('Kia', 'Rio', 2017),
  ('Toyota', 'Tacoma', 2022),
  ('Subaru', 'Impreza', 2012),
  ('Honda', 'Civic', 2020),
  ('Toyota', 'Camry', 2010);