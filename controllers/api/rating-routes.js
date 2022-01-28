const router = require('express').Router();
const { Comment, Rating } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
    Rating.findAll()
    .then(dbRatingData => res.json(dbRatingData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
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

router.put('/', withAuth, (req, res) => {
    Rating.update((
        {
            rating: req.body.rating,
        },
        {
        where: {
            user_id: req.session.user_id,
            trail_id: req.body.trail_id, 
        }
    }))
    .then(dbTrailData => {
        if(!dbTrailData) {
            res.status(404).json({ message: 'No Rating found with this id' });
            return;
        }
        res.json(dbTrailData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router; 