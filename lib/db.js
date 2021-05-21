const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'sociomoose',
  password: ''
});
connection.connect();

module.exports = connection;