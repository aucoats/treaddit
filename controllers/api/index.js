const router = require('express').Router();

const userRoutes = require('./user-routes');
const trailRoutes = require('./trail-routes');
const commentRoutes = require('./comment-routes');
<<<<<<< HEAD
=======
const favoriteRoutes = require('./favorite-routes');
>>>>>>> f2eed8a3a739b38474232955c6d8bb2835c30663

router.use('/users', userRoutes);
router.use('/trails', trailRoutes);
router.use('/comments', commentRoutes);
<<<<<<< HEAD
=======
router.use('/favorites', favoriteRoutes);
>>>>>>> f2eed8a3a739b38474232955c6d8bb2835c30663

module.exports = router; 