const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const connectSessionKnex = require('connect-session-knex');
// const bcrypt = require('bcrypt'); no longer needed here

// const Users = require('../users/users-model.js'); destructured routes
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const db = require('../database/dbConfig.js');

const server = express();

const KnexSessionStore = connectSessionKnex(session);

const sessionConfig = {
  name: 'Star Labs',
  // This should not be hard coded in, use an environment variable
  secret: 'The Flash is Actually Barry Allen',
  cookie: {
    maxAge: 1000 * 60 * 60,
    // Set to true in a real world example
    secure: false,
    httpOnly: true // can't access via JS, set this to true unless specified
  },
  resave: false,
  // saveUninitialized is set to false, legal precedence regarding cookies
  saveUninitialized: false,
  // where do we store our sessions?
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;
