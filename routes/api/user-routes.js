const router = require('express').Router();
const withAuth = require('../../utils/auth');
const {
  getAllUsers,
  getSingleUser,
  createUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller')

router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getSingleUser)
  .put(withAuth, updateUser)
  .delete(withAuth, deleteUser)

router
  .route('/login')
  .post(loginUser)

router
  .route('/logout')
  .post(logoutUser)

module.exports = router;