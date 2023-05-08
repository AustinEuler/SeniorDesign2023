const express = require("express")
const app = express()
const mysql = require("mysql")
const bcrypt = require('bcrypt');
const db = mysql.createPool({
   host: "localhost",       //This is your localhost 
   user: "root",         // username
   password: "password",  // password 
   database: "HBCUmatch",      // Database name
   port: "33061"             // port name
})
db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
   
}); 

const createAccount = (req, res, db, bcrypt) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const sex = req.body.sex;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password: ' + err.message);
      res.status(500).send('Error creating user account');
      return;
    }

    const sql = 'INSERT INTO login_table (email, name, password, sex) VALUES (?, ?, ?, ?)';
    const values = [email, name, hashedPassword, sex];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating user account: ' + err.message);
        res.status(500).send('Error creating user account');
        return;
      }

      console.log('New user account created with id ' + result.insertId);

      res.status(200).send('User account created successfully');
    });
  });
};

const login = (req, res, db, bcrypt) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = 'SELECT * FROM login_table WHERE email = ?';
  const values = [email];

  db.query(sql, values, (err, rows) => {
    if (err) {
      console.error('Error verifying user account: ' + err.message);
      res.status(500).send('Error verifying user account');
      return;
    }

    if (rows.length === 0) {
      res.status(401).send('Incorrect email or password');
      return;
    }

    const hashedPassword = rows[0].password;

    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        console.error('Error comparing passwords: ' + err.message);
        res.status(500).send('Error verifying user account');
        return;
      }

      if (result === false) {
        res.status(401).send('Incorrect email or password');
        return;
      }

      res.status(200).send('Login successful');
    });
  });
};

module.exports = {
  createAccount,
  login
};


// Define the tester createAccount function
function createAccountTester() {
  const email = 'test@example.com';
  const name = 'John Doe';
  const password = 'password123';
  const sex = 'male';

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password: ' + err.message);
      return;
    }

    const sql = 'INSERT INTO login_table (email, name, password, sex) VALUES (?, ?, ?, ?)';
    const values = [email, name, hashedPassword, sex];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error creating user account: ' + err.message);
      } else {
        console.log('User account created successfully');
      }
    });
  });
}

// Call the tester function to create a user account
//createAccountTester();


      

