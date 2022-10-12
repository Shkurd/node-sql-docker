
const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const authRoutes = require('./routes/auth-routes');
const createPath = require('./helpers/create-path');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('./helpers/passport-config');
initializePassport(passport);

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use(express.cookieParser('keyboard cat'));
// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
  // cookie: { maxAge: 60000 }
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash())
// Global variables
// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';
  console.log('Main route working')
  const username = req?.user?.username || null;
  res.render(createPath('index'), { title, username });
});

app.use(postRoutes);
app.use(postApiRoutes);
app.use(contactRoutes);
app.use(authRoutes);

app.use((req, res) => {
  const title = 'Error Page';
  const username = req?.user?.username || null;
  res
    .status(404)
    .render(createPath('error'), { title, username });
});