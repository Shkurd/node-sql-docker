const LocalStrategy = require('passport-local').Strategy
const CryptoJS = require("crypto-js");
const pool = require('../helpers/db');

function initialize(passport) {

  passport.use(new LocalStrategy(function verify(username, password, cb) {
    console.log('base username', username)
    console.log('base password', password)
    pool.query(`SELECT * FROM users WHERE user_name='${username}'`)
    .then((response) => {
      let user = response.rows[0]
      console.log('myuser', user)
      if(user.user_name === username){
        console.log('user === username')
        var bytes = CryptoJS.AES.decrypt(user.user_password, 'my-secret-key');
        var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword === password) {
          console.log('originalPassword === password')
          return cb(null, user)
        } else {
          return cb(null, false, { message: 'Password incorrect' })
        }
      } else {
        console.log('something wrong with passport')
      }
    })
    .catch(e => console.error(e.stack));

  }));
  
  // passport.serializeUser(function(user, done) {
  //   done(null, user.id);
  // });

  // passport.deserializeUser(function(id, done) {
  //   User.findById(id, function(err, user) {
  //     done(err, user);
  //   });
  // });

  passport.serializeUser(function(user, cb) {
    console.log('serializeUser', user)
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
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


// module.exports = function(passport) {
//   passport.use(
//     new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
//       // Match user
//       User.findOne({
//         email: email
//       }).then(user => {
//         if (!user) {
//           return done(null, false, { message: 'That email is not registered' });
//         }

//         // Match password
//         bcrypt.compare(password, user.password, (err, isMatch) => {
//           if (err) throw err;
//           if (isMatch) {
//             return done(null, user);
//           } else {
//             return done(null, false, { message: 'Password incorrect' });
//           }
//         });
//       });
//     })
//   );

//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });
// };