const express = require('express');

const {
  ensureAuthenticated,
  // forwardAuthenticated
 } = require('../helpers/auth');

const {
  getPost, 
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  getAddPost,
  addPost
} = require('../controllers/post-controller');

const router = express.Router();

router.get('/posts/:id', getPost);
router.delete('/posts/:id', deletePost);
router.get('/edit/:id', ensureAuthenticated, getEditPost);
router.put('/edit/:id', ensureAuthenticated, editPost);
router.get('/posts', getPosts);
router.get('/add-post', ensureAuthenticated, getAddPost);
router.post('/add-post', ensureAuthenticated, addPost);

module.exports = router;