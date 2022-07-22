const router = require('express').Router();
const apiRoutes = require('./api/index');
const homeRoutes = require('./home-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).send('404 error!')
});

module.exports = router;