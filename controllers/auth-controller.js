const createPath = require('../helpers/create-path');
const pool = require('../helpers/db');
const CryptoJS = require("crypto-js");
const passport = require('passport');

const getExist = (req, res) => {
  const title = 'Exist';
  const username = req?.user?.username || null;
  res
  .status(404)
  .render(createPath('exist'), { title, username });
};


const getRegistration = (req, res) => {
  const title = 'Registration';
  const username = req?.user?.username || null;
  let errors = [];
  res
  .status(404)
  .render(createPath('registration'), { title, errors, username });
};

const registrationPost = (req, res) => {
  const {username, password} = req.body
  const title = 'Registration';
  let errors = [];

  if (!username.trim() || !password.trim()) {
    errors.push({ msg: 'Please enter all fields' });
    if (errors.length) {
      createPath('registration'), { 
        title, 
        errors
      };
    }
    req.flash('success_msg', 'You are logged out');
    res.render(createPath('registration'), { title, errors });
    return
  }

  pool.query(`SELECT * FROM users WHERE user_name='${username}'`)
  .then((response) => {
    let user = response.rows[0]
    if(user){
      res.redirect('/exist');
    } else {
        let cipherpassword = CryptoJS.AES.encrypt(password, 'my-secret-key').toString();
        pool.query(`INSERT INTO users (user_name, user_password) VALUES ('${username}', '${cipherpassword}');`)
        .then(() => res.redirect('/login'))
        .catch(e => console.error(e.stack))
    }
  })
  .catch(e => console.error(e.stack));
};

const getLogin = (req, res) => {
    const title = 'Login';
    const username = req?.user?.username || null;
    res
    .status(404)
    .render(createPath('login'), { title, username });
  };


// Login
const loginPost =  (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};

// Logout
const logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });

};

module.exports = {
    getRegistration,
    registrationPost,
    getLogin,
    loginPost,
    logout,
    getExist
};