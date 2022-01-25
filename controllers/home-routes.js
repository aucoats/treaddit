const router = require('express').Router();
const sequelize = require('../config/connection');
const Sequelize = require('sequelize');
const { Trail, User } = require('../models');
const storageRef = require('./api/trail-routes');
const downloadTrailImage = require('./api/trail-routes');

router.get('/', (req, res) => {
    console.log(req.session);

    Trail.findAll({
        attributes: [
            'id',
            'name',
            'length',
            'dog_friendly',
            'bike_friendly',
            'difficulty',
            'description',
            'img_ref'
        ],
        // group: 'id',
        // include: [
        //     {
        //         model: Comment,
        //         attributes: ['id', 'comment_text', 'trail_id', 'user_id', 'created_at'],
        //         include: {
        //             model: User,
        //             attributes: ['username']
        //         }
        //     },
        //     {
        //         model: Rating,
        //         attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']]
        //     }
            // {
            //     model: User,
            //     attributes: ['username']
            // }
        // ]
    })
    .then(dbTrailData =>  {
        const trails = dbTrailData.map(trail => trail.get({ plain: true }));

        // trails.push(img_src);
        // console.log('dbTrailData:', dbTrailData)
        // console.log('img_url:', img_url)
        // dbTrailData.trail.dataValues.push(img_url);
        // retrieve image from DB 
        // create storage reference
        // pull image from reference 
        res.render('homepage', {
            trails,
        });
    })
    // .then(async function imageConvert(dbTrailData) {
    //     var img_ref = dbTrailData[0].dataValues.img_ref;
    //     await downloadTrailImage(img_ref).then(response => {
    //         const img_src = response;
    //         if (document.querySelector(".img-circle")) {
    //             var imgElement = document.querySelector(".img-circle");
    //             imgElement.src=img_url;
    //         } 
    //         return img_src;
    //     })
    // })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router; 