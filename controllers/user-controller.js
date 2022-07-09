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