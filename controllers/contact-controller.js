const createPath = require('../helpers/create-path');
const pool = require('../helpers/db');

const getContacts = (req, res) => {
  const title = 'Contacts';
  let contacts = null
  pool.query("SELECT * FROM contacts")
  .then((response) => {
    contacts = response.rows;
  })
  .then(() => res.render(createPath('contacts'), { contacts, title }))
  .catch(e => console.error(e.stack))
};

module.exports = {
  getContacts,
};