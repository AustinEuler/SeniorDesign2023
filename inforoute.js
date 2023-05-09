const express = require("express");
const app = express();
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "HBCUmatch",
  port: "33061"
});


app.get("/clark-atlanta", (req, res) => {
    const sql = "SELECT * FROM schools_info WHERE name = 'Clark Atlanta University'";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.render("clark-atlanta.ejs", { school: result[0] });
    });
  });

  app.get("/morehouse", (req, res) => {
    const sql = "SELECT * FROM schools_info WHERE name = 'Morehouse College'";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.render("morehouse.ejs", { school: result[0] });
    });
  });

  app.get("/spelman", (req, res) => {
    const sql = "SELECT * FROM schools_info WHERE name = 'spelman'";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.render("spelman.ejs", { school: result[0] });
    });
  });

  app.get("/morris-brown", (req, res) => {
    const sql = "SELECT * FROM schools_info WHERE name = 'Morris Brown College'";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.render("morris-brown.ejs", { school: result[0] });
    });
  });
  
  

app.listen(3000, () => {
	console.log('Server running on port 3000');
});


