const router = require('express').Router();

const userRoutes = require('./user-routes');
const trailRoutes = require('./trail-routes');
const commentRoutes = require('./comment-routes');
const favoriteRoutes = require('./favorite-routes');
const ratingRoutes = require('./rating-routes');

router.use('/users', userRoutes);
router.use('/trails', trailRoutes);
router.use('/comments', commentRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/ratings', ratingRoutes);

module.exports = router; 