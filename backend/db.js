const mysql = require("mysql2/promise");

async function query(sql, params) {
  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306,
    connectTimeout: 8000
  });
  try {
    return await conn.query(sql, params);
  } finally {
    await conn.end();
  }
}

module.exports = { query };