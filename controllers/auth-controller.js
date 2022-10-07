const createPath = require('../helpers/create-path');
const pool = require('../helpers/db');
const CryptoJS = require("crypto-js");

const exist = (req, res) => {
  const title = 'Exist';
  res
  .status(404)
  .render(createPath('exist'), { title });
};


const registration = (req, res) => {
  const title = 'Registration';
  res
  .status(404)
  .render(createPath('registration'), { title });
};

const registrationPost = (req, res) => {
  let {username, password} = req.body
  let contacts = null

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

const login = (req, res) => {
    const title = 'Login';
    let contacts = null
    // pool.query("SELECT * FROM contacts")
    // .then((response) => {
    //   contacts = response.rows;
    // })
    // .then(() => res.render(createPath('login'), { contacts, title }))
    // .catch(e => console.error(e.stack))
    res
    .status(404)
    .render(createPath('login'), { title });
  };



module.exports = {
    registration,
    registrationPost,
    login,
    exist
};