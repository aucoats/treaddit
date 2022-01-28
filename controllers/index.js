const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const favoritesRoutes = require('./favorites-routes.js');
const mytrailsRoutes = require('./mytrails-routes.js');
const commentRoutes = require('./comment-routes.js');


const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/mytrails', mytrailsRoutes);
router.use('/comment', commentRoutes);

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end(); 
});

module.exports = router;