// const knex = require('knex')

// module.exports = knex({
//   client: 'postgres',
//   connection: {
//     host: 'postgres',
//     user: 'habrpguser',
//     password: 'pgpwd4habr',
//     database: 'habrdb',
//     port: 5432
//   },
// })


// var pg = require('pg');
// var conString = "postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";

// var client = new pg.Client(conString);
// client.connect();

// var pg = require('pg');
// let conString = "postgres://habrpguser:pgpwd4habr@localhost:5432/habrdb";
// let db = new pg.Client(conString);

// const db = async () => {
//   try {
//     let conString = "postgres://habrpguser:pgpwd4habr@localhost:5432/habrdb";
//     let client = new pg.Client(conString);
//     client.connect();
//     let query = await client.query("SELECT * FROM posts");
//     console.log('DB ready:', query);
//     return query;
//     // query.on('row', function(row) {
//     //   console.log(row);
//     // });

//     // console.log('query.row: ', query.rows);
  
  
//     // query.on('end', function() {
//     //     client.end();
//     // });

//   } catch (err) {
//     console.log(err)
//     process.exit(1)
//   }
// };


// const db = () => {
//     const { Client } = require('pg')
//     const client = new Client("postgres://habrpguser:pgpwd4habr@localhost:5432/habrdb")
//     client.connect()
//     client
//     .query("SELECT * FROM posts")
//     .then(res => {
//         console.log('DB res.rows ', res.rows[0])
//         return res.rows
//     })
// }

// console.log('DB:',  db())

// client
//     .query("SELECT * FROM posts")
//     .then(res => console.log('res.rows:',res.rows[0]))
//     .catch(e => console.error(e.stack))

// module.exports = db;


// const { Client } = require('pg')
// const client = new Client("postgres://habrpguser:pgpwd4habr@localhost:5432/habrdb")
// const db = () => {
//     client.connect()
//     client
//         .query("SELECT * FROM posts")
//         .then(res => console.log('res.rows:', res.rows[0]))
//         .catch(e => console.error(e.stack)
// }
