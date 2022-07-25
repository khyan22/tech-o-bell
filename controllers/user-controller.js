const { User, Comment, Post } = require('../models');

const userController = {
  getAllUsers(req, res) {
    User.findAll({
      attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  getSingleUser(req, res) {
    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: {exclude: ['password']},
      includes: [
        {
          model: Post,
          attributes: ['id', 'post_title', 'post_body']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_body', 'created_at']
        }
      ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  createUser(req, res) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  loginUser(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'User now found' });
        return
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true

        res.json({ user: dbUserData, message: "You're now logged in." });
      });
    });
  },

  logoutUser(req, res) {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },

  updateUser(req,res) {
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    }).then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }
      res.json(dbUserData)
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  deleteUser(req, res) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json(err);
        return;
      }
      
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
}

module.exports = userController;