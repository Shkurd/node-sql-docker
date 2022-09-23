
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();

// app.set('view engine', 'ejs');
const PORT = 5000;

// const db = 'mongodb+srv://shkurd:Euro0077@cluster0.ks55s68.mongodb.net/node-blog?retryWrites=true&w=majority' // - так будет писать в базу данных 'node-blog'

// mongoose
//   .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
//   .then((res)=>{
//     console.log('DB response: ', res)
//   })
//   .catch((error) =>{
//     console.log('error: ', error)
//   })

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`my app listening port ${PORT}`);
});



// const { Client } = require('pg')
// const client = new Client("postgres://habrpguser:pgpwd4habr@localhost:5432/habrdb");

// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static('styles'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';
  console.log('Main route working')
  res.render(createPath('index'), { title });
});


app.use(postRoutes);
app.use(postApiRoutes);
// app.use(contactRoutes);

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});