var express = require("express");
var cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");

var app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});

app.get("/", function (req, res, next) {
  connection.query("SELECT * FROM Customers", function (err, results) {
    if (err) {
      console.error("Error get data customer:", err);
      res.status(500).json({ error: "Error get data customer" });
    } else {
      console.log("Get data successful");
      res.json(results);
    }
  });
});

app.get("/:CustomerID", function (req, res, next) {
  const CustomerID = req.params.CustomerID;
  connection.query(
    "SELECT * FROM Customers WHERE CustomerID = ?",
    [CustomerID],
    function (err, results) {
      if (err) {
        console.error("Error get data customer:", err);
        res.status(500).json({ error: "Error get data customer" });
      } else {
        console.log("Get data successful");
        res.json(results);
      }
    }
  );
});

app.post("/add/Customer", function (req, res, next) {
  connection.query(
    "INSERT INTO `Customers`(`CustomerID`, `FirstName`, `LastName`) VALUES (?,?,?)",
    [req.body.CustomerID, req.body.FirstName, req.body.LastName],
    function (err, results) {
      if (err) {
        console.error("Error inserting customer:", err);
        res.status(500).json({ error: "Error inserting customer" });
      } else {
        console.log("Insert successful");
        res.json(results);
      }
    }
  );
});

app.put("/update/Customer", function (req, res, next) {
  connection.query(
    "UPDATE `Customers` SET `FirstName` = ?, `LastName` = ? WHERE CustomerID = ?",
    [req.body.FirstName, req.body.LastName, req.body.CustomerID],
    function (err, results) {
      if (err) {
        console.error("Error update customer:", err);
        res.status(500).json({ error: "Error update customer" });
      } else {
        console.log("Update successful");
        res.json(results);
      }
    }
  );
});

app.delete("/remove/:CustomerID", function (req, res, next) {
  const CustomerID = req.params.CustomerID;
  connection.query(
    "DELETE FROM `customers` WHERE CustomerID = ?",
    [CustomerID],
    function (err, results) {
      if (err) {
        console.error("Error remove customer:", err);
        res.status(500).json({ error: "Error remove customer" });
      } else {
        console.log("Remove " + CustomerID + " successful");
        res.json(results);
      }
    }
  );
});

app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});
