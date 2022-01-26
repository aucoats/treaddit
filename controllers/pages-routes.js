const router = require('express').Router();
const sequelize = require('../config/connection');
const Sequelize = require('sequelize');
const { Trail, User, Comment, Rating } = require('../models');
const storageRef = require('./api/trail-routes');
const downloadTrailImage = require('./api/trail-routes');

/* Render the comments for the trail selected and send user to comment page*/
router.get('/:id', (req, res) => {
    Trail.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'length',
            'dog_friendly',
            'bike_friendly',
            'difficulty',
            'img_ref',
            'description',
        ]
    }) .then(dbTrailData => {
        
        // const { img_url } = downloadTrailImage(`${dbTrailData[0].dataValues.img_ref}`);
        // var img_ref = dbTrailData[0].dataValues.img_ref;
        // img_url = router.use('/', (req, res) => {
        //     console.log(downloadTrailImage(img_ref))
        //     return downloadTrailImage(img_ref);
        // })
       
        // console.log('img_url:', img_url)
        const trail = dbTrailData.get({ plain: true });
        

        res.render('comment', {trail});
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

router.get('/users/:id', (req, res) => {
        // pass data to template
        res.render('usertrails');
});

router.get('/favorites/:id', (req, res) => {
    // pass data to template
    res.render('favorites');
});


module.exports = router;