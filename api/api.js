const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

//Create a connection pool so an active thread of connection is available. 
const pool = mysql.createPool({
    connectionLimit : 10,
    host: '127.0.0.1',
    port: 33060,
    user: 'palash',
    password: 'palash',
    database: 'Parking'
})

app.get('/', (req, res) => {
    res.send('API Running on port 4000')
});

//Endpoint to GET all the cars in the parkedCars table. 
app.get('/cars', (req, res) => {
    const showParkedCars = "Select * from Parking.parkedCars";
    pool.query(showParkedCars, (err, result) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({ "data": result });
        }
    });
});

//Endpoint to POST car in the db.
app.post('/park', (req, res) => {    
    //Destructre the newCar Object from the request. 
    const { name, phoneNumber, regNumber } = req.body.newCar;
    const addParkedCars = `INSERT INTO parkedCars (name, phoneNumber, regNumber)
    VALUES ('${name}','${phoneNumber}', '${regNumber}')`;
    pool.query(addParkedCars, (err, result) => {
        if(err) {
            return res.send(`Error while Getting Parking Lot Data ${err}`);
        }
        else {
            return res.send(`Parking Lot Data Returned.`);
        }
    });
});

//Endpoint to DELETE cars from the db. 
app.post('/leave', (req, res) => {    
    const regNumber = req.body.regNumber;
    console.log(regNumber);
    const addParkedCars = `Delete From parkedCars where regNumber='${regNumber}'`;
    pool.query(addParkedCars, (err, result) => {
        if(err) {
            return res.send(`Error while Leaving Parking Lot ${err}`);
        }
        else {
            return res.send(`Car Left.`);
        }
    });
});

//Port the app is listening for requests. 
app.listen(4000);
console.log("API is Running on port 4000");
