const { Pool } = require('pg')

 const dbСredits = {
    host: 'postgres',
    port: 5432,
    database: 'shkurdovdb',
    user: 'shkurdovuser',
    password: 'pgpwd4shkurdov',
    max: 50,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 10000
}
const pool = new Pool(dbСredits);
module.exports = pool;
