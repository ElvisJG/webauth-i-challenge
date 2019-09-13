const router = require('express').Router();
const bcrypt = require('bcrypt');

const Users = require('../users/users-model.js');

// Creates a user using the information sent inside the body of the request.
// Hash the password before saving the user to the database.

//  http://localhost:4000/api/auth/register
//	"username": "Super Fast Request Man",
//	"password": "QuickestRequestsInTheW3St"
router.post('/register', (req, res) => {
  const user = req.body;
  // Logging to see the password mutation with before BCRYPT
  console.log('Password Before Encryption', user.password);
  // Asynchronous hashing the password supplied by the user
  user.password = bcrypt.hashSync(user.password, 12);
  // Logging to see the password after the BCRYPT mutation
  console.log('Password After Encryption', user.password);

  Users.add(user)
    .then(savedUser => {
      req.session.user = savedUser;
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

// http://localhost:4000/api/auth/login
// Header username: SuperFastRequestMan
// Header password: QuickestRequestsInTheW3St
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome Back ${user.username}` });
      } else {
        res.status(401).json({ message: 'You shall not pass! 🧙‍' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// http://localhost:4000/api/auth/logout
// Browser is the keeper of the cookies
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({
          message: "You can checkout but you can't leave"
        });
      } else {
        res.end();
      }
    });
  }
});

module.exports = router;
