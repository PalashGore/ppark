const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

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
    pool.query(showParkedCars, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            });
        }
    })
});

app.get('/park', (req, res) => {
    const { name, phoneNumber, regNumber } = req.query;
    const addParkedCars = `INSERT INTO Parking.parkedCars (name, phone_number, reg_number)
    VALUES ('${name}', ${phoneNumber}, '${regNumber}')`;
    pool.query(addParkedCars, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send('Car Parked');
        }
    });
});


app.listen(4000);