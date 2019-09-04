const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcrypt');

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// If the user is logged in, respond with an array of all the users contained in the database.
// If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.
server.get('/api/users', restrict, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// Creates a user using the information sent inside the body of the request.
// Hash the password before saving the user to the database.
server.post('/api/register', (req, res) => {
  const user = req.body;
  // Logging to see the password mutation with before BCRYPT
  console.log('Password Before Encryption', user.password);
  // Asynchronous hashing the password supplied by the user
  user.password = bcrypt.hashSync(user.password, 12);
  // Logging to see the password after the BCRYPT mutation
  console.log('Password After Encryption', user.password);

  Users.add(user)
    .then(savedUser => {
      res.status(201).json(savedUser);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Use the credentials sent inside the body to authenticate the user.
// On successful login, create a new session for the user and send back
// a 'Logged in' message and a cookie that contains the user id.
// If login fails, respond with the correct status code and the message: 'You shall not pass!'
server.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome Back ${user.username}` });
      } else {
        res.status(401).json({ message: 'You shall not pass! 🧙‍' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Write a piece of global middleware that ensures a user is logged in when accessing any route prefixed
// by /api/restricted/. For instance, /api/restricted/something, /api/restricted/other,
// and /api/restricted/a should all be protected by the middleware; only logged in users should be able
// to access these routes.
function restrict(req, res, next) {
  // Read the username and password from headers, client side is responsible
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res
            .status(401)
            .json({ message: 'Whoa There Cowboy, Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Unexpected Error' });
      });
  } else {
    res.status(400).json({ message: 'No credentials provided, partner' });
  }
}

module.exports = server;
