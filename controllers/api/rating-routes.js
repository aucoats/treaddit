const router = require('express').Router();
const { Comment, Rating } = require('../../models');

router.get('/', (req, res) => {
    Rating.findAll()
    .then(dbRatingData => res.json(dbRatingData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Rating.create({
        rating: req.body.rating,
        user_id: req.session.user_id,
        trail_id: req.body.trail_id
    }).then(dbRatingData => res.json(dbRatingData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })  
});

module.exports = router; 