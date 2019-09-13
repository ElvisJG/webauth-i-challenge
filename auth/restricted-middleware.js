// const bcrypt = require('bcrypt');

// const Users = require('../users/users-model.js');

// Write a piece of global middleware that ensures a user is logged in when accessing any route prefixed
// by /api/restricted/. For instance, /api/restricted/something, /api/restricted/other,
// and /api/restricted/a should all be protected by the middleware; only logged in users should be able
// to access these routes.
module.exports = function restrict(req, res, next) {
  // Read the username and password from headers, client side is responsible (headers)
  // We shouldn't be grabbing username and password from a header
  // We should simply use a cookie/JW
  //   const { username, password } = req.headers;

  //   if (username && password) {
  //     Users.findBy({ username })
  //       .first()
  //       .then(user => {
  //         if (user && bcrypt.compareSync(password, user.password)) {
  //           next();
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Whoa There Cowboy, Invalid Credentials' });
  }
  //       })
  //       .catch(error => {
  //         res.status(500).json({ message: 'Unexpected Error' });
  //       });
  //   } else {
  //     res.status(400).json({ message: 'No credentials provided, partner' });
  //   }
};
