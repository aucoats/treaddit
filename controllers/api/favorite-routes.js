const router = require('express').Router();
const { Favorite } = require('../../models');

router.get('/', (req, res) => {
    Favorite.findAll()
    .then(favoriteData => res.json(favoriteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Favorite.create({
        favorite: req.body.favorite,
        user_id: req.session.user_id,
        trail_id: req.body.trail_id
    })
    .then(favoriteData => res.json(favoriteData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;