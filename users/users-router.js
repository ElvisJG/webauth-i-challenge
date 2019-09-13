const router = require('express').Router();

const Users = require('./users-model.js');
const restrict = require('../auth/restricted-middleware.js');

// If the user is logged in, respond with an array of all the users contained in the database.
// If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'
// There is a middleware function called restrict that validates session/cookies

// http://localhost:4000/api/users
router.get('/', restrict, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
