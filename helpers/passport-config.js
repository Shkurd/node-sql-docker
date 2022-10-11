const LocalStrategy = require('passport-local').Strategy
const CryptoJS = require("crypto-js");
const pool = require('../helpers/db');

function initialize(passport) {

  passport.use(new LocalStrategy(function verify(username, password, cb) {
    pool.query(`SELECT * FROM users WHERE user_name='${username}'`)
    .then((response) => {
      let user = response.rows[0]
      let userClone = { ...user }
      if(userClone.user_name == username){
        var bytes = CryptoJS.AES.decrypt(userClone.user_password, 'my-secret-key');
        var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword === password) {
          return cb(null, userClone)
        } else {
          return cb(null, false, { message: 'Password incorrect' })
        }
      } else {
        console.log('something wrong with passport-config.js')
        return cb(null, false, { message: 'Username incorrect' })
      }
    })
    .catch(e => console.error(e.stack));

  }));
  
  passport.serializeUser(function(user, cb) {
    console.log('serializeUser', user)
    process.nextTick(function() {
      return cb(null, {
        id: user.user_name,
        username: user.user_name
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    console.log('deserializeUser', user)
    process.nextTick(function() {
      return cb(null, user);
    });
  });
}

module.exports = initialize
