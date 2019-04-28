DROP DATABASE Parking;
CREATE DATABASE IF NOT EXISTS Parking;
CREATE TABLE Parking.parkedCars(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50),
	phoneNumber VARCHAR(30),
	regNumber VARCHAR(30) NOT NULL,
	createdAt datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
); 
INSERT INTO Parking.parkedCars (name, phoneNumber, regNumber)
VALUES ('Palash Gore', '485-677-0605', 'TY7T-882'),
       ('Don Corleone', '677-677-5555', 'T89T-882');
       
DELETE FROM Parking.parkedCars;