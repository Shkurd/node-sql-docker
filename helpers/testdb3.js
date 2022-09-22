const { Client } = require('pg')
const client = new Client("postgres://habrpguser:pgpwd4habr@localhost:5432/habrdb")
client.connect()
client
    .query("SELECT * FROM posts")
    .then(res => console.log('res.rows:',res.rows[0]))
    .catch(e => console.error(e.stack))
