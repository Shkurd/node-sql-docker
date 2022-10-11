const createPath = require('../helpers/create-path');
const pool = require('../helpers/db');

const getContacts = (req, res) => {
  const title = 'Contacts';
  const username = req?.user?.username || null;
  let contacts = null
  pool.query("SELECT * FROM contacts")
  .then((response) => {
    contacts = response.rows;
  })
  .then(() => res.render(createPath('contacts'), { contacts, title, username }))
  .catch(e => console.error(e.stack))
};

module.exports = {
  getContacts,
};