const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'db_tienda',
  port: 3306
});

db.connect(err => {
  if (err) {
    console.log('Error conexión BD:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});

module.exports = db;