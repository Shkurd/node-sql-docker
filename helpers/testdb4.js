const { Pool, Client } = require('pg')
const poolData = {
    host: '0.0.0.0',
    port: 5432,
    database: 'habrdb',
    user: 'habrpguser',
    password: 'pgpwd4habr',
    max: 50,
    // idleTimeoutMillis: 0,
    // connectionTimeoutMillis: 0
  }
// const pool = new Pool("postgres://habrpguser:pgpwd4habr@postgresdb:5432/habrdb")
const pool = new Pool(poolData)
// pool.connect();
pool
    .query("SELECT * FROM posts")
    .then(res => console.log('pool res.rows:',res.rows[1]))
    .catch(e => console.error(e.stack))