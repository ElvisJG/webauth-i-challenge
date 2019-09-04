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

// Creates a user using the information sent inside the body of the request.
// Hash the password before saving the user to the database.
server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// If the user is logged in, respond with an array of all the users contained in the database.
// If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.
server.post('/api/register', (req, res) => {});

// Use the credentials sent inside the body to authenticate the user.
// On successful login, create a new session for the user and send back
// a 'Logged in' message and a cookie that contains the user id.
// If login fails, respond with the correct status code and the message: 'You shall not pass!'
server.post('/api/login', (req, res) => {});

// Write a piece of global middleware that ensures a user is logged in when accessing any route prefixed
// by /api/restricted/. For instance, /api/restricted/something, /api/restricted/other,
// and /api/restricted/a should all be protected by the middleware; only logged in users should be able
// to access these routes.
function restrict(req, res, next) {}

module.exports = server;
