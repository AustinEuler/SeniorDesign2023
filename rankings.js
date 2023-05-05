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

// function to process user's answers to questionnaire
function processQuestionnaireAnswers(userAnswers) {
    // schools to rank
    const schoolsToRank = ['Clark Atlanta', 'Morehouse', 'Spelman', 'Morris Brown'];
  
    // query to get school rankings based on user's answers
    const query = `
      SELECT school, (
        ${schoolsToRank.map((school, index) => {
          return `question${index+1} = '${userAnswers[`question${index+1}`]}'`
        }).join(' + ')}
      ) AS score
      FROM new_schools
      WHERE school IN (${schoolsToRank.map(school => `'${school}'`).join(', ')})
      ORDER BY score DESC
    `;
  
    // connect to database and run query
    db.getConnection((err, connection) => {
      if (err) throw err;
      
      connection.query(query, (error, results) => {
        if (error) throw error;
        
        // save rankings to user's profile or do other actions as needed
        // ...
        
        // release database connection
        connection.release();
      });
    });
  }
  

  



  
  



