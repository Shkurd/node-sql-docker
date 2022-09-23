const Post = require('../models/post');
const createPath = require('../helpers/create-path');

const db = require('../models/db')

const { Pool, Client } = require('pg')

const poolData = {
  host: 'postgres',
  port: 5432,
  database: 'habrdb',
  user: 'habrpguser',
  password: 'pgpwd4habr',
  max: 50,
  // idleTimeoutMillis: 0,
  // connectionTimeoutMillis: 0
}


const handleError = (res, error) => {
  console.log(error);
  res.render(createPath('error'), { title: 'Error' });
};

const getPost = async (req, res) => {
  // const title = 'Post';
  // Post
  //   .findById(req.params.id)
  //   .then(post => res.render(createPath('post'), { post, title }))
  //   .catch((error) => handleError(res, error));

    // const title = 'Post';
  // Post
  //   .findById(req.params.id)
  //   .then(post => res.render(createPath('post'), { post, title }))
  //   .catch((error) => handleError(res, error));
  
  // const Post = await db.select().from('post');
  // console.log(Post);
  // res.json(createPath('post'), { Post, title });
}

const deletePost = (req, res) => {
  Post
  .findByIdAndDelete(req.params.id)
  .then((result) => {
    res.sendStatus(200);
  })
  .catch((error) => handleError(res, error));
}

const getEditPost = (req, res) => {
  const title = 'Edit post';
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('edit-post'), { post, title }))
    .catch((error) => handleError(res, error));
}

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post
    .findByIdAndUpdate(req.params.id, { title, author, text })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((error) => handleError(res, error));
}

const getPosts = async (req, res) => {
  const title = 'Posts';
  // Post
  //   .find()
  //   .sort({ createdAt: -1 })
  //   .then(posts => res.render(createPath('posts'), { posts, title }))
  //   .catch((error) => handleError(res, error));
  // let posts = [
  //   {
  //     post_id: 1,
  //     post_title: 'заголовок поста 111',
  //     post_text: 'текст поста 111',
  //     post_author: 'Антон Шкурдов',
  //     post_date: '2022-09-07T21:00:00.000Z'
  //   },
  //   {
  //     post_id: 2,
  //     post_title: 'заголовок поста 222',
  //     post_text: 'текст поста 222',
  //     post_author: 'Антон Шкурдов',
  //     post_date: '2022-09-07T21:00:00.000Z'
  //   },
  //   {
  //     post_id: 3,
  //     post_title: 'заголовок поста 333',
  //     post_text: 'текст поста 333',
  //     post_author: 'Антон Шкурдов',
  //     post_date: '2022-09-07T21:00:00.000Z'
  //   }
  // ];
  // res.render(createPath('posts'), { posts, title })
  // const client = new Client("postgres://habrpguser:pgpwd4habr@localhost:5432/habrdb");

  const pool = new Pool(poolData)
    let posts = null
    console.log('123456789');
    // pool.connect();
    pool.query("SELECT * FROM posts")
    .then((response) => {
      posts = response.rows;
    })
    .then(() => res.render(createPath('posts'), { posts, title }))
    .catch(e => console.error(e.stack))
    // .finally(res.render(createPath('posts'), { posts, title }))

  // res.render(createPath('posts'), { posts, title });

  // const client = new Client("postgres://habrpguser:pgpwd4habr@postgres:5432/habrdb")
  // client.connect()
  // client
  //     .query("SELECT * FROM posts")
  //     .then(response => console.log('res.rows posts:', response.rows[0]))
  //     .catch(e => console.error(e.stack))
  //     .finally(res.render(createPath('posts'), { posts, title }))

}

const getAddPost = (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
}

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => res.redirect('/posts'))
    .catch((error) => handleError(res, error));
}

module.exports = {
  // getPost,
  // deletePost,
  // getEditPost,
  // editPost,
  getPosts,
  getAddPost,
  addPost,
};