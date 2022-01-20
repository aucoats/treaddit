const router = require('express').Router();

const userRoutes = require('./user-routes');
const trailRoutes = require('./trail-routes');

router.use('/users', userRoutes);
router.use('/trails', trailRoutes);

module.exports = router; 