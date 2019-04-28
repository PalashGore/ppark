const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

const pool = mysql.createPool({
    connectionLimit : 5,
    host: 'us-cdbr-iron-east-02.cleardb.net',
    port: 3306,
    user: 'ba27dac6d6fc62',
    password: '063c5a21',
    database: 'heroku_74f100aae70dd38'
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

const port = process.env.PORT || 4000;

app.listen(port);
console.log(`API is Running on port ${port}`);