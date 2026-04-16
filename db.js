const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'db_tienda',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error(' Error de conexión:', err);
    return;
  }
  console.log('Conectado a MySQL en localhost:3306');
});

module.exports = connection;