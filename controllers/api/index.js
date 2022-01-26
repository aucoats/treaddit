const router = require('express').Router();

const userRoutes = require('./user-routes');
const trailRoutes = require('./trail-routes');
const commentRoutes = require('./comment-routes');
const favoriteRoutes = require('./favorite-routes');
<<<<<<< HEAD

=======
>>>>>>> feature/handlebars

router.use('/users', userRoutes);
router.use('/trails', trailRoutes);
router.use('/comments', commentRoutes);
router.use('/favorites', favoriteRoutes);
<<<<<<< HEAD

=======
>>>>>>> feature/handlebars

module.exports = router; 