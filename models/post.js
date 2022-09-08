// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const postSchema = new Schema({
//   text: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// const Post = mongoose.model('Post', postSchema);

// module.exports = Post;







// const db = require('./db')

// ;(async () => {
//   try {
//     await db('docker-blog').insert({ name: 'John Doe' })
//     await db('docker-blog').insert({ name: 'Jane Doe' })
//     console.log('Added dummy users!')
//     process.exit(0)
//   } catch (err) {
//     console.log(err)
//     process.exit(1)
//   }
// })()