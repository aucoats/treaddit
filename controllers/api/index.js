const router = require('express').Router();

const userRoutes = require('./user-routes');
const trailRoutes = require('./trail-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/trails', trailRoutes);
router.use('/comments', commentRoutes);

module.exports = router; 