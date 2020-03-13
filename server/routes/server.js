var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "flyze"
});

connection.connect((err) => {
  (err) ? console.log(err) : console.log("Connected!");
});

router.get('/', (req, res) => {
  var sql = 'select pnr_id, name, age, dep_location, dep_date_time,ari_location, ari_date_time, terminal, status from passanger_info WHERE pnr_id = ?';
  connection.query(sql, [req.query.id], (err, result, fields) => {
    (err) ? res.send(err) :  res.json(result);
  });
});

router.get('/test', (req, res) => {
  var sql = 'select pnr_id, name, age, status from passanger_info';
  connection.query(sql, (err, result, fields) => {
    (err) ? res.send(err) :  res.json(result);
  });
});

module.exports = router;

