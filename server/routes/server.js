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
  var sql = 'select "passenger" userType, id, pnr_id, name, age, dep_location, dep_date_time,ari_location, ari_date_time, terminal, flight_id, status, seat_no, mobile_no from passanger_info WHERE pnr_id = ?';
  connection.query(sql, [req.query.id], (err, result, fields) => {
    (err) ? res.send(err) :  res.json(result);
  });
});

router.get('/airHostessLogin', (req, res) => {
  var sql = 'SELECT "airhostees" userType, flight_id from flight_info WHERE flight_id = ? AND Password = ?';
  connection.query(sql,  [req.query.id, req.query.pass], (err, result, fields) => {
    (err) ? res.send(err) :  res.json(result);
  });
});

router.get('/order', (req, res) => {
  console.log(req.query);
 var sql = 'INSERT INTO order_info (p_id, name, type_of_serv, flight_id, seat_no, items, item_count, status) VALUES (?,?,?,?,?,?,?,?)';
 connection.query(sql,  [req.query.pId, req.query.name, req.query.type, req.query.flightId, req.query.seatNo, req.query.items, 1, 'Ordered' ], (err, result, fields) => {
    (err) ? res.send(err) :  res.json(req.query);
  });
});

router.get('/dashboard', (req, res) => {
  var sql = 'SELECT id, name, seat_no, items, item_count, type_of_serv, total_amount, status from order_info WHERE flight_id = ? AND status NOT IN (?, ?)';
  connection.query(sql,  [req.query.flightId, 'delivered', 'canceled'], (err, result, fields) => {
    (err) ? res.send(err) :  res.json(result);
  });
});

router.get('/orderAction', (req, res) => {
  var sql = 'UPDATE order_info SET status = ? WHERE id = ?';
  connection.query(sql,  [req.query.actionType, req.query.id], (err, result, fields) => {
    (err) ? res.send(err) :  res.json(result);
  });
});


module.exports = router;

