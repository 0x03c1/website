/*
==========================================
MYSQL CONNECTION
GitHub Secrets + Netlify Environment
==========================================
*/

const mysql = require("mysql2/promise");

/*
==========================================
POOL MYSQL
==========================================
*/

const pool = mysql.createPool({

    host:
        process.env.MYSQL_HOST,

    user:
        process.env.MYSQL_USER,

    password:
        process.env.MYSQL_PASSWORD,

    database:
        process.env.MYSQL_DATABASE,

    port:
        process.env.MYSQL_PORT || 3306,

    waitForConnections: true,

    connectionLimit: 5,

    queueLimit: 0

});

/*
==========================================
TEST CONNECTION
==========================================
*/

async function testConnection() {

    try {

        const connection =
            await pool.getConnection();

        console.log(
            "✅ MySQL conectado com sucesso"
        );

        connection.release();

    } catch (error) {

        console.error(
            "❌ Erro ao conectar MySQL:",
            error.message
        );

    }

}

testConnection();

/*
==========================================
EXPORT
==========================================
*/

module.exports = pool;