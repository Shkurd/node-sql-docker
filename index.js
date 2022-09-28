
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');
var fileUpload = require('express-fileupload');

const app = express();

app.set('view engine', 'ejs');
const PORT = 5000;

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`my app listening port ${PORT}`);
});


// app.use(cors());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(express.static('public'));
// app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';
  console.log('Main route working')
  res.render(createPath('index'), { title });
});


const DIR = `${process.env.UPLOAD_PATH}`
app.post('/add-post', function(req, res) {
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  // sampleFile = req.files.imgfile;
  uploadPath = __dirname + '/uploads/' + req.files.imgfile.name;

  // Use the mv() method to place the file somewhere on your server
  req.files.imgfile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
    console.log('uploadPath', uploadPath)
    console.log('req.files.imgfile ', req.files.imgfile)
    res.send('File uploaded!');
  });
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