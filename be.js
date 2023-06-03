const express = require('express');
const app = express();
const mysql = require('mysql');

// Create a connection to the database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup"
});

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));
console.log('Static files middleware initialized.');

// Render login.html on the root 
app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(__dirname + '/login.html');
});

// Handle signup form submission
app.post('/signup', function(req, res) {
  const { username, password, cpassword, email } = req.body;

  // Insert data into the database
  const sql = "INSERT INTO signup (username, password, cpassword, email) VALUES (?, ?, ?, ?)";
  const values = [username, password, cpassword, email];

  con.query(sql, values, function(error, result) {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred during signup. Please try again.');
    } else {
      res.redirect('/login.html');
    }
  });
});

app.post('/login', function(req, res) {
  const { username, password } = req.body;

  // Check if the username and password exist in the database
  const sql = `SELECT * FROM signup WHERE username = ? AND password = ?`;
  const values = [username, password];

  con.query(sql, values, function(error, result) {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred during login. Please try again.');
    } else {
      console.log('Query result:', result);

      if (result.length === 1) {
        // Redirect to the main page
        res.redirect('main.html');
      } else {
        console.log('User not recognized');
        res.send('User not recognized');
      }
    }
  });
});





// Start the server after establishing the database connection
con.connect(function(error) {
  if (error) {
    console.error('Database connection error:', error);
    return;
  }

  app.listen(7000, function() {
    console.log('Server is running on port 7000');
  });
});
