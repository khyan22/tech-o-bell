const router = require('express').Router();
const {
  getAllComments,
  createComment,
  deleteComment
} = require('../../controllers/comment-controller');

router
  .route('/')
  .get(getAllComments)
  .post(createComment)

router
  .route('/:id')
  .delete(deleteComment)

module.exports = router;