const router = require('express').Router();
const { Favorite } = require('../../models');

router.get('/', (req, res) => {
    if(req.session.user_id){
        Favorite.findAll(
        {where:{ user_id: req.session.user_id}}
    )
    .then(favoriteData => {
        res.json(favoriteData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    } else {
        res.json([]);
    }
});

router.post('/', (req, res) => {
    if(req.session.user_id){
        Favorite.upsert({
            favorite: req.body.favorite,
            user_id: req.session.user_id,
            trail_id: req.body.trail_id
        })
        .then(favoriteData => res.json(favoriteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    } else {
        const err = {message: "You must be logged in to select a favorite"}
        res.json(err)
    }
});


module.exports = router;