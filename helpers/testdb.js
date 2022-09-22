
// const db = require('../models/db')

// ;(async () => {
//   try {
//     await db.schema.dropTableIfExists('posts')
//     await db.schema.withSchema('public').createTable('posts', (table) => {
//       table.increments()
//       table.string('name')
//     })
//     console.log('Created posts table!')
//     process.exit(0)
//   } catch (err) {
//     console.log(err)
//     process.exit(1)
//   }
// })()



// const db = require('./db')

// ;(async () => {
//   try {
//     await db('habrdb').insert({ post: 'John Doe' })
//     await db('habrdb').insert({ name: 'Jane Doe' })
//     console.log('Added dummy users!')
//     process.exit(0)
//   } catch (err) {
//     console.log(err)
//     process.exit(1)
//   }
// })()


// var pg = require('pg');

// ;(async () => {
//   try {

//     let conString = "postgres://habrpguser:pgpwd4habr@localhost:5432/habrdb";
    
//     let client = new pg.Client(conString);
//     client.connect();

//     let query = await client.query("SELECT * FROM posts");
//     console.log('Data came back from the DB:', query);
//     // query.on('row', function(row) {
//     //   console.log(row);
//     // });

//     console.log('query.row: ', query.rows);
  
  
//     // query.on('end', function() {
//     //     client.end();
//     // });

//   } catch (err) {
//     console.log(err)
//     process.exit(1)
//   }
// })();








