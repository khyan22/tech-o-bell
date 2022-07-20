const { Post, Comment, User } = require('../models');

const postController = {
  getAllPost(req, res) {
    Post.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'post_title',
        'post_body',
        'created_at'
      ],
      includes: [
        {
          model: Comment,
          attributes: ['id', 'comment_body', 'user_id', 'post_id', 'created_at']
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  },

  getSinglePost(req, res) {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_title',
        'post_body',
        'created_at'
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'Post not found.' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createPost(req, res) {
    Post.create({
      post_title: req.body.post_title,
      post_body: req.body.post_body,
      user_id: req.body.user_id
    })
      .then(dbPostData =>  res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deletePost(req, res) {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'Post not found.' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updatePost(req, res) {
    Post.update(
      {
        post_title: req.body.post_title,
        post_body: req.body.post_body 
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'Post not found.' });
          return;
        }
        res.json(dbPostData)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

module.exports = postController;