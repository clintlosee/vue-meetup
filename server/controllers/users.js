const passport = require('passport');
const User = require('../models/users');

exports.getUsers = function(req, res) {
  User.find({}).exec((errors, users) => {
    if (errors) {
      return res.status(422).send({ errors });
    }

    return res.json(users);
  });
};

exports.getCurrentUser = function(req, res, next) {
  const { user } = req;

  if (!user) {
    return res.sendStatus(422);
  }

  //* For session auth
  // return res.json(user);
  return res.json(user.toAuthJSON());
};

exports.register = function(req, res) {
  const registerData = req.body;

  if (!registerData.email) {
    return res.status(422).json({
      errors: {
        email: 'Email is required',
        message: 'Email is required',
      },
    });
  }

  if (!registerData.password) {
    return res.status(422).json({
      errors: {
        password: 'Password is required',
        message: 'Password is required',
      },
    });
  }

  if (registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: 'Passwords do not match',
        message: 'Passwords do not match',
      },
    });
  }

  const user = new User(registerData);

  user.save((errors, savedUser) => {
    if (errors) {
      return res.status(422).json({ errors });
    }
    return res.json(savedUser);
  });
};

exports.login = function(req, res, next) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'Email is required',
        message: 'Email is required',
      },
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'Password is required',
        message: 'Password is required',
      },
    });
  }

  return passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(422).send({
        errors: {
          message: 'Invalid password or email!',
        },
      });
    }

    return res.json(user.toAuthJSON());

    //* Only for session auth!
    // req.login(user, err => {
    //   if (err) {
    //     next(err);
    //   }
    //   return res.json(user);
    // });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  return res.json({ status: 'Session destroyed' });
};
