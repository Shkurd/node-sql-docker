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
  const { title, author, text } = req.body;

  let newFileName = 'no-image.png';
  let uploadPath = '/images/';
  if (req.files?.imgfile) {
    console.log('req.files: ', req.files)
    newFileName = (Date.now().toString().replace(/:/g, '-'))+req.files.imgfile.name;
    uploadPath = '/uploads/'; //путь внутри контейнера самого докера - '/app/uploads/' (не этой рабочей директории), а сюда в корневую папку "public/uploads" (слово "public" не нужно указывать) будет дублировать по настройкам компоузера. 
    req.files.imgfile.mv('/app/uploads/'+newFileName, function(err) {
      if (err) {
        console.log('err: ', err)
        return res.status(500).send(err);
      }
    });
  }

  let imgpath = uploadPath+newFileName;

  pool.query(`INSERT INTO posts (post_title, post_author, post_text , post_imglink) VALUES ('${title}', '${author}', '${text}', '${uploadPath+newFileName}');`)
  .then(() => res.status(200).json({title, author, text, imgpath}))
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
  pool.query(`DELETE FROM posts WHERE post_id=${id}`)
  .then(() => res.json(id))
  .catch(e => console.error(e.stack))
}

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  
  // pool.query(`UPDATE posts SET post_title = '${title}', post_author = '${author}', post_text = '${text}' WHERE post_id=${id}`)
  // .then(() => res.json(post))
  // .catch(e => console.error(e.stack))

  if (req.files?.imgfile) {
    let newFileName = 'no-image.png';
    let uploadPath = '/images/';
    console.log('req.files: ', req.files)
    newFileName = (Date.now().toString().replace(/:/g, '-'))+req.files.imgfile.name;
    uploadPath = '/uploads/'; //путь внутри контейнера самого докера - '/app/uploads/' (не этой рабочей директории), а сюда в корневую папку "public/uploads" (слово "public" можно не нужно указывать) будет дублировать по настройкам компоузера. 
    req.files.imgfile.mv('/app/uploads/'+newFileName, function(err) {
      if (err) {
        console.log('err: ', err)
        return res.status(500).send(err);
      }
    });

    // pool.query(`INSERT INTO posts (post_title, post_author, post_text , post_imglink) VALUES ('${title}', '${author}', '${text}', '${uploadPath+newFileName}');`)
    pool.query(`UPDATE posts SET post_title = '${title}', post_author = '${author}', post_text = '${text}', post_imglink = '${uploadPath+newFileName}' WHERE post_id=${id}`)
    .then(() => res.json(post))
    .catch(e => console.error(e.stack))
    
  } else {
    pool.query(`UPDATE posts SET post_title = '${title}', post_author = '${author}', post_text = '${text}' WHERE post_id=${id}`)
    .then(() => res.json(post))
    .catch(e => console.error(e.stack))
  }
}

module.exports = {
  getPosts,
  addPost,
  getPost, 
  deletePost,
  editPost,
};