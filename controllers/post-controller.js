
// const fs = require('../fs');
// const mv = promisify(fs.rename);
const createPath = require('../helpers/create-path');
const pool = require('../helpers/db');


// const multer  = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
  
//   filename: function (req, file, cb) {
//     cb(null, Date.now()+ "-" + file.originalname)
//   }
// })

// const upload = multer({ storage: storage })
// console.log('upload1: ', upload);


// const handleError = (res, error) => {
//   console.log(error);
//   res.render(createPath('error'), { title: 'Error' });
// };


// var fileUpload = require('express-fileupload');





const getPost = async (req, res) => {
  const title = 'Post';
  let post = null
  pool.query(`SELECT * FROM posts WHERE post_id=${req.params.id}`)
  .then((response) => {
    post = response.rows[0];
  })
  .then(() => res.render(createPath('post'), { post, title }))
  .catch(e => console.error(e.stack))

}

const deletePost = (req, res) => {
  const { id } = req.params;
  pool.query(`DELETE FROM posts WHERE post_id=${id}`)
  .then(() =>  res.sendStatus(200))
  .catch(e => console.error(e.stack))
}

const getEditPost = (req, res) => {
  const title = 'Edit post';

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
  pool.query(`UPDATE posts SET post_title = '${title}', post_author = '${author}', post_text = '${text}' WHERE post_id=${id}`)
  .then(() => res.redirect(`/posts/${id}`))
  .catch(e => console.error(e.stack))

}

const getPosts = (req, res) => {
  const title = 'Posts';
    let posts = null
    pool.query("SELECT * FROM posts ORDER BY post_id DESC")
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
  // res.setHeader('content-type', 'text/html;charset=utf-8');
  const { title, author, text } = req.body;

  let newFileName = 'no-image.png';
  let uploadPath = '/images/';
  if (req.files?.imgfile) {
    console.log('req.files: ', req.files)
    newFileName = (Date.now().toString().replace(/:/g, '-'))+req.files.imgfile.name;
    uploadPath = '/uploads/'; //путь внутри контейнера самого докера - '/app/uploads/' (не этой рабочей дериктории), а сюда в корневую папку public/uploads (слово public можно не нужно указывать) будет дублировать по настройкам компоузера. 
    req.files.imgfile.mv('/app/uploads/'+newFileName, function(err) {
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

