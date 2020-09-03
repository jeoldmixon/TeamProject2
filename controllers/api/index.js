const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const searchRoutes = require('./search-routes.js');
const searchRoutes2 = require('./search-routes2.js');

router.use('/users', userRoutes);
router.use('/search', searchRoutes);
router.use('/search2', searchRoutes2);

module.exports = router;