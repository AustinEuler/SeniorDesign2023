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

function rankSchools(userAnswers, schoolsToRank, HBCUmatch, callback) {
    const query = `
      SELECT school, (
        ${schoolsToRank.map((school, index) => {
          return `question${index+1} = '${userAnswers[`question${index+1}`]}'`
        }).join(' + ')}
      ) AS score
      FROM ${HBCUmatch}
      WHERE school IN (${schoolsToRank.map(school => `'${school}'`).join(', ')})
      ORDER BY score DESC
    `;
  
    // connect to database and run query
    db.getConnection((err, connection) => {
      if (err) {
        return callback(err);
      }
    
      connection.query(query, (error, results) => {
        if (error) {
          connection.release();
          return callback(error);
        }
      
        // display rankings in console
        console.log('School Rankings:');
        results.forEach((result, index) => {
          console.log(`${index+1}. ${result.school}`);
        });
        
        // save rankings to user's profile or do other actions as needed
        // ...
        
        // release database connection
        connection.release();
  
        return callback(null, results);
      });
    });
  }
  



  
  



