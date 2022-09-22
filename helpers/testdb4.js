const { Pool, Client } = require('pg')
const poolData = {
    host: 'localhost',
    port: 5432,
    database: 'habrdb',
    user: 'habrpguser',
    password: 'pgpwd4habr',
    max: 50,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }
// const pool = new Pool("postgres://habrpguser:pgpwd4habr@localhost:5432/habrdb")
const pool = new Pool(poolData)
// pool.connect();
pool
    .query("SELECT * FROM posts")
    .then(res => console.log('pool res.rows:',res.rows[1]))
    .catch(e => console.error(e.stack))