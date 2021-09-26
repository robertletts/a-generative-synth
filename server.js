const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const patchBankSchema = require('./schemas/patch-bank-schema');
const userSchema = require('./schemas/user-schema');
const mongoSanitize = require('express-mongo-sanitize');
const { defaultPatchbank } = require('./presets/default-patchbank');

/**
 * Configure environment variables / Heroku config vars
 */
dotenv.config();
const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DB;
const CLUSTER = process.env.CLUSTER;
const USER = process.env.MONGOUSER;
const SECRET = process.env.ACCESS_TOKEN_SECRET;
const SALT = process.env.SALT;

/**
 * Initalise server and middleware
 */
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(mongoSanitize());

/**
 * Establish MongoDB connection via mongoose
 */
const mongoConnection = `mongodb+srv://
${USER}:${PASSWORD}@${CLUSTER}/${DATABASE}
?retryWrites=true&w=majority
`;
mongoose.connect(mongoConnection);

/**
 * Define Mongoose models for server-side validation
 */
const PatchBank = mongoose.model('PatchBank', patchBankSchema);
const User = mongoose.model('User', userSchema);

/**
 * Ensure that <= 50 requests occur from each IP address every 5 minutes
 */
const REQUEST_ALLOWANCE_PER_IP = 50;
const REQUEST_WINDOW_LENGTH_IN_MINUTES = 5 * 60 * 1000;

app.use(
  rateLimit({
    windowMs: REQUEST_WINDOW_LENGTH_IN_MINUTES,
    max: REQUEST_ALLOWANCE_PER_IP,
  })
);

/**
 * Serve the static client build
 */
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

/**
 * Listen for http requests
 */
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

/**
 * User registration handler, using bcrypt to hash user password.
 * Also preloads account with a default patchbank
 */
app.post('/register', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, SALT);

    await User.create({
      username: username,
      password: hashedPassword,
    });

    await PatchBank.create({ ...defaultPatchbank, username: username });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

/**
 * User login handler
 * Compares hashed raw text password with that users stored hashed password
 * Generates a token to be returned to the client if successful
 */
app.post('/login', async (req, res) => {
  try {
    const { username: reqUsername, password: reqPassword } = req.body;

    const response = await User.find({ username: reqUsername });
    const [data] = response;
    const loginSuccess = await bcrypt.compare(reqPassword, data.password);

    if (loginSuccess) {
      const token = jsonWebToken.sign(reqUsername, SECRET);

      res.json({ token: token });
    } else throw new Error('login unsuccessful');
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

/**
 * Middleware to authenticate that the user has the correct json web token
 * (submitted to headers from local storage )
 */
const userAuthentication = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.sendStatus(401);

  jsonWebToken.verify(token, SECRET, (err, username) => {
    if (err) return res.sendStatus(403);
    req.username = username;
    next();
  });
};

// Use custom middleware for following data related user requests
app.use(userAuthentication);

/**
 * CRUD: 'read' patchbank functionality
 */
app.post('/load-patch-bank', async (req, res) => {
  try {
    const patches = await PatchBank.find({ username: req.username });
    res.send(patches);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

/**
 * CRUD: 'Create' patchbank functionality
 */
app.post('/patch-bank', async (req, res) => {
  try {
    const patchBank = { ...req.body, username: req.username };
    await PatchBank.create(patchBank);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

/**
 * CRUD: 'delete' patchbank functionality
 */
app.delete('/patch-bank', async (req, res) => {
  try {
    const data = req.body.name;
    await PatchBank.deleteOne({ name: data });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});
