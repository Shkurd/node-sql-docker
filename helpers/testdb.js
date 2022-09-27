const { Pool, Client } = require('pg')
const poolData = {
    host: '0.0.0.0',
    port: 5432,
    database: 'shkurdovdb',
    user: 'shkurdovuser',
    password: 'pgpwd4shkurdov',
    max: 50,
    // idleTimeoutMillis: 0,
    // connectionTimeoutMillis: 0
  }
const pool = new Pool(poolData)
pool
    .query("SELECT * FROM posts")
    // .query(`SELECT * FROM posts WHERE post_id=2`)
    .then(res => console.log('pool res.rows:', res.rows[0]))
    .catch(e => console.error(e.stack))