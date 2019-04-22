CREATE DATABASE [IF NOT EXISTS] Parking;

DROP TABLE Parking.parkedCars;

CREATE TABLE Parking.parkedCars(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	phone_number VARCHAR(30),
	reg_number VARCHAR(30),
	created_at datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
); 


INSERT INTO Parking.parkedCars (name, phone_number, reg_number)
VALUES ('Palash Gore', 485-677-0605, 'TY7T-882'),
       ('Don Corleone', 677-677-5555, 'T89T-882');