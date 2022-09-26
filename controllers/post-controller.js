
const createPath = require('../helpers/create-path');
const pool = require('../helpers/db')
const { Pool } = require('pg')

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath('error'), { title: 'Error' });
};

const getPost = async (req, res) => {
  const title = 'Post';
  let post = null
  pool.query(`SELECT * FROM posts WHERE post_id=${req.params.id}`)
  .then((response) => {
    post = response.rows[0];
    console.log('post response: ', post)
    console.log('post response post_date: ', post.post_date)
  })
  .then(() => res.render(createPath('post'), { post, title }))
  .catch(e => console.error(e.stack))

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
  // Post
  //   .findById(req.params.id)
  //   .then(post => res.render(createPath('edit-post'), { post, title }))
  //   .catch((error) => handleError(res, error));

  let post = null
  pool.query(`SELECT * FROM posts WHERE post_id=${req.params.id}`)
  .then((response) => {
    post = response.rows[0];
  })
  .then(() => res.render(createPath('edit-post'), { post, title }))
  .catch(e => console.error(e.stack))



}

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  // Post
  //   .findByIdAndUpdate(req.params.id, { title, author, text })
  //   .then((result) => res.redirect(`/posts/${id}`))
  //   .catch((error) => handleError(res, error));



}

const getPosts = (req, res) => {
  const title = 'Posts';
  // const pool = new Pool(dbСredits)
    let posts = null
    pool.query("SELECT * FROM posts")
    .then((response) => {
      posts = response.rows;
    })
    .then(() => res.render(createPath('posts'), { posts, title }))
    .catch(e => console.error(e.stack))
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
  getPost,
  // deletePost,
  getEditPost,
  editPost,
  getPosts,
  getAddPost,
  addPost,
};

