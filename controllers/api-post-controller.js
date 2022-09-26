const pool= require('../helpers/db')

const handleError = (res, error) => {
  res.status(500).send(error.message);
}

const getPosts = (req, res) => {
    pool.query("SELECT * FROM posts")
    .then((response) => {
      posts = response.rows;
    })
    .then(() => res.status(200).json(posts))
    .catch(e => console.error(e.stack))
}

const addPost = (req, res) => {
  const {title, author, text } = req.body;
  pool.query(`INSERT INTO posts (post_title, post_author, post_text) VALUES ('${title}', '${author}', '${text}');`)
  .then(() => res.status(200).json({title, author, text}))
  .catch(e => console.error(e.stack))
}

const getPost = (req, res) => {
  let post = null
  pool.query(`SELECT * FROM posts WHERE post_id=${req.params.id}`)
  .then((response) => {
    post = response.rows[0];
  })
  .then(() => res.status(200).json(post))
  .catch(e => console.error(e.stack))
}

const deletePost = (req, res) => {
  const { id } = req.params;
  Post
  .findByIdAndDelete(id)
  .then((post) => res.status(200).json(id))
  .catch((error) => handleError(res, error));
}

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  
  pool.query(`UPDATE posts SET post_title = '${title}', post_author = '${author}', post_text = '${text}' WHERE post_id=${id}`)
  .then(() => res.json(post))
  .catch(e => console.error(e.stack))
}

module.exports = {
  getPosts,
  addPost,
  getPost, 
  deletePost,
  editPost,
};