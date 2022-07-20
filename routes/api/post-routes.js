const router = require('express').Router();
const withAuth = require('../../utils/auth'); 
const {
  getAllPost,
  getSinglePost,
  createPost,
  deletePost,
  updatePost
} = require('../../controllers/post-controller');

router
  .route('/')
  .get(getAllPost)
  .post(createPost)

router
  .route('/:id')
  .get(getSinglePost)
  .put(updatePost)
  .delete(deletePost)

module.exports = router;