const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'passwoord', 
  database: 'db_name',
});
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL DB');
});
module.exports = connection;
