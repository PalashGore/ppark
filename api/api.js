const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

const pool = mysql.createPool({
    connectionLimit : 10,
    host: '127.0.0.1',
    port: 3306,
    user: 'palash',
    password: 'palash',
    database: 'Parking'
})

app.get('/', (req, res) => {
    res.send('API Running on port 4000')
});

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

app.post('/park', (req, res) => {    
    const { name, phoneNumber, regNumber } = req.body.newCar;
    const addParkedCars = `INSERT INTO Parking.parkedCars (name, phoneNumber, regNumber)
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

app.post('/leave', (req, res) => {    
    const regNumber = req.body.regNumber;
    console.log(regNumber);
    const addParkedCars = `Delete From Parking.parkedCars where regNumber='${regNumber}'`;
    pool.query(addParkedCars, (err, result) => {
        if(err) {
            return res.send(`Error while Leaving Parking Lot ${err}`);
        }
        else {
            return res.send(`Car Left.`);
        }
    });
});

let port = process.env.PORT;

if (port == null || port == "") {
  port = 4000;
}

app.listen(port);

console.log("API is Running on port 4000");