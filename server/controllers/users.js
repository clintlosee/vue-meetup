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

  return res.json(user);
};

exports.register = function(req, res) {
  const registerData = req.body;

  if (!registerData.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!registerData.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  if (registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: 'do not match',
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
        email: 'is required',
      },
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
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
          authentication: 'Ooops, something went wrong!',
        },
      });
    }

    req.login(user, err => {
      if (err) {
        next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  return res.json({ status: 'Session destroyed' });
};
