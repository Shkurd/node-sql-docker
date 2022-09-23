const { Pool } = require('pg')

 const dbСredits = {
    host: 'postgres',
    port: 5432,
    database: 'habrdb',
    user: 'habrpguser',
    password: 'pgpwd4habr',
    max: 50,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 10000
}
const pool = new Pool(dbСredits);
module.exports = pool;
