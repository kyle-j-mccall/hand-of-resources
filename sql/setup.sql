-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS books2;
DROP TABLE IF EXISTS shows;


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

CREATE TABLE books2 (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR,
  author VARCHAR,
  released DATE 
);
CREATE TABLE shows (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR,
  seasons INT,
  genre VARCHAR 
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

INSERT INTO books2 (
  title,
  author,
  released
)

VALUES 
  ('Business-focused', 'Riki Jessopp', '8/9/2022'),
  ('Expanded', 'Alvan Tesyro', '10/25/2022'),
  ('Stand-alone', 'Rolfe Kob', '4/10/2022'),
  ('Phased', 'Sissy Bonn', '5/8/2022'),
  ('Optional', 'Rayner Alebrooke', '10/18/2022');

INSERT INTO shows (
  title,
  seasons,
  genre
)

VALUES 
  ('Breaking Bad', 7, 'Drama'),
  ('The Office', 9, 'Comedy'),
  ('Devs', 1, 'Psychological Thriller'),
  ('Game Of Thrones', 7, 'Fantasy'),
  ('Queens Gambit', 1, 'Drama');