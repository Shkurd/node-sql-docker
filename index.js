
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();

app.set('view engine', 'ejs');
const PORT = 8080;

const db = 'mongodb+srv://shkurd:Euro0077@cluster0.ks55s68.mongodb.net/node-blog?retryWrites=true&w=majority' // - так будет писать в базу данных 'node-blog'

mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res)=>{
    console.log('DB response: ', res)
  })
  .catch((error) =>{
    console.log('error: ', error)
  })

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.urlencoded({ extended: false }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.use(postRoutes);
app.use(postApiRoutes);
app.use(contactRoutes);

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});