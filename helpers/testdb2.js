const { Client } = require('pg')
const client = new Client("postgres://habrpguser:pgpwd4habr@localhost:5432/habrdb")
client.connect()
client.query("SELECT * FROM posts", (err, response) => {
  console.log(err ? err.stack : "res.rows ", response.rows)
  client.end()
})