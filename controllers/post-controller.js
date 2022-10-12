
const createPath = require('../helpers/create-path');
const pool = require('../helpers/db');
const fs = require('fs');
const path = require('path');

const getPost = async (req, res) => {
  const title = 'Post';
  const username = req?.user?.username || null;
  let post = null
  pool.query(`SELECT * FROM posts WHERE post_id=${req.params.id}`)
  .then((response) => {
    post = response.rows[0];
    if (!post) {
      res.redirect('/error')
    }
  })
  .then(() => res.render(createPath('post'), { post, title, username }))
  .catch(e => console.error(e.stack))
}

const deletePost = (req, res) => {
  const { id } = req.params;
  const clearId = parseInt(id.toString().replace(/[^0-9\.]+/g, ''))
  pool.query(`SELECT * FROM posts WHERE post_id=${clearId}`)
  .then((response) => {
    if(response) {
      pool.query(`DELETE FROM posts WHERE post_id=${clearId}`)
      // pool.query(`DELETE FROM posts WHERE post_id=quote_literal(${id})`) так не работает = error: operator does not exist: integer = text
      .then(() =>  res.sendStatus(200))
      .catch(e => console.error(e.stack))
    }
    const imglink = response.rows[0].post_imglink;
    if(imglink !== "/images/no-image.png") {
      fs.unlink(path.resolve()+'/public'+imglink, (err) => {
        if (err) {
            throw err;
        }
        console.log(`File ${imglink} was deleted.`);
    });
    }
  })
  .catch(e => console.error(e.stack))
}

const getEditPost = (req, res) => {
  const title = 'Edit post';
  const username = req?.user?.username || null;
  let post = null
  pool.query(`SELECT * FROM posts WHERE post_id=${req.params.id}`)
  .then((response) => {
    post = response.rows[0];
    if (!post) {
      res.redirect('/error')
    }
  })
  .then(() => res.render(createPath('edit-post'), { post, title, username }))
  .catch(e => console.error(e.stack))
}

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  if (req.files?.imgfile) {
    let newFileName = 'no-image.png';
    let uploadPath = '/images/';
    newFileName = (Date.now().toString().replace(/:/g, '-'))+req.files.imgfile.name;
    uploadPath = '/uploads/'; // путь читать будет из корневой папки "public/uploads" (слово "public" не нужно указывать) будет дублировать по настройкам компоузера. 
    req.files.imgfile.mv('/app/public/uploads/'+newFileName, function(err) { //путь внутри контейнера самого докера - '/app/uploads/' (не этой рабочей директории)
      if (err) {
        console.log('err: ', err)
        return res.status(500).send(err);
      }
    });

    pool.query(`UPDATE posts SET post_title = '${title}', post_author = '${author}', post_text = '${text}', post_imglink = '${uploadPath+newFileName}' WHERE post_id=${id}`)
    .then(() => res.redirect('/posts'))
    .catch(e => console.error(e.stack))
    
  } else {
    pool.query(`UPDATE posts SET post_title = '${title}', post_author = '${author}', post_text = '${text}' WHERE post_id=${id}`)
    .then(() => res.redirect(`/posts/${id}`))
    .catch(e => console.error(e.stack))
  }
}

const getPosts = (req, res) => {
  const title = 'Posts';
  const username = req?.user?.username || null;
    let posts = null
    pool.query("SELECT * FROM posts ORDER BY post_id DESC")
    .then((response) => {
      posts = response.rows;
    })
    .then(() => res.render(createPath('posts'), { posts, title, username }))
    .catch(e => console.error(e.stack))
}

const getAddPost = (req, res) => {
  const title = 'Add Post';
  const username = req?.user?.username || null;
  res.render(createPath('add-post'), { title, username });
}

const addPost = (req, res) => {
  const { title, author, text } = req.body;

  let newFileName = 'no-image.png';
  let uploadPath = '/images/';
  if (req.files?.imgfile) {
    newFileName = (Date.now().toString().replace(/:/g, '-'))+req.files.imgfile.name;
    uploadPath = '/uploads/'; // путь читать будет из корневой папки "public/uploads" (слово "public" не нужно указывать) будет дублировать по настройкам компоузера. 
    req.files.imgfile.mv('/app/public/uploads/'+newFileName, function(err) { // путь читать будет из корневой папки "public/uploads" (слово "public" не нужно указывать) будет дублировать по настройкам компоузера.
      if (err) {
        console.log('err: ', err)
        return res.status(500).send(err);
      }
    });
  }
 
  pool.query(`INSERT INTO posts (post_title, post_author, post_text , post_imglink) VALUES ('${title}', '${author}', '${text}', '${uploadPath+newFileName}');`)
  .then(() => res.redirect('/posts'))
  .catch(e => console.error(e.stack))
}

module.exports = {
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  getAddPost,
  addPost,
};

