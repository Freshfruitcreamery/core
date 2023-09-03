const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const cloudinary = require('./utils/cloudinaryMediaProvider');

const app = express();

require('dotenv').config();

app.set('trust proxy', 1);

// Activating session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

// bodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * All auth routes
 */
app.get('/', (req, res) => res.send('Core API'));
app.use('/buyer', require('./routes/buyers/index'));
app.use('/admin', require('./routes/admins/index'));
app.post('/upload', async (req, res, next) => {
  try {
    const response = await cloudinary.upload(req);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

app.all('*', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => console.log(err, req, res));

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
