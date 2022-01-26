const router = require('express').Router();
const sequelize = require('../config/connection');
const Sequelize = require('sequelize');
const { Trail, User, Comment, Rating } = require('../models');
const storageRef = require('./api/trail-routes');
const downloadTrailImage = require('./api/trail-routes');
const exphbs = require('express-handlebars');
const helpers = require('../utils/helpers');
const { download } = require('express/lib/response');
const hbs = exphbs.create({ helpers });

/* helper functiont display bootstrap/pill background color */
hbs.handlebars.registerHelper('difficultyLevel', function (difficulty) {
    if(difficulty == "Easy"){
        return "success"
    }
    if(difficulty == "Moderate"){
        return "warning"
    }
    if(difficulty == "Difficult"){
        return "danger"
    }
});

/* helper functiont to render bootstrap rows of three for the trails iterated through */
hbs.handlebars.registerHelper('multiof4', function(id) {
    var remainder = id % 4;
    
    if (id == 1){
        return true;
    } else {
        if (remainder == 0) {
            return true;
        } else {
            return false;
        }
    }
});

/* helper functiont to render bootstrap rows of three for the trails iterated through */
hbs.handlebars.registerHelper('multiof3', function(id) {
    var remainder = id % 3;
    
    if(remainder == 0) {
        return true;
    } else { 
        return false;
    }
});

/* Loading all trails to homepage on render */
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
        group: 'id',
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'trail_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Rating,
                attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']]
            }
            // {
            //     model: User,
            //     attributes: ['username']
            // }
        ]
    })
    .then(dbTrailData => {
        if(!dbTrailData) {
            res.status(404).json({message: 'No trail found'})
            return;
        }
        console.log('dbTrailData:', dbTrailData)
        const trails = dbTrailData.map(trail => trail.get({ plain: true }));
        console.log('trails:', trails)
        res.render('homepage', {trails, loggedIn: req.session.loggedIn});

    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

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
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'trail_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Rating,
                attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']]
            },
            // {
            //     model: User,
            //     attributes: ['username']
            // }
        ]
    }).then(dbTrailData => {
        console.log('dbTrailData:', dbTrailData)
        // const { img_url } = downloadTrailImage(`${dbTrailData[0].dataValues.img_ref}`);
        // var img_ref = dbTrailData[0].dataValues.img_ref;
        // img_url = router.use('/', (req, res) => {
        //     console.log(downloadTrailImage(img_ref))
        //     return downloadTrailImage(img_ref);
        // })
        
        // console.log('img_url:', img_url)
        const trail = dbTrailData.get({ plain: true });
        
        console.log(trail);

        res.render('comment', {trail, loggedIn: req.session.loggedIn});
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});
/* Create a handle to get the value of rating, and send the mount of stars back */

module.exports = router; 

/*
Rylee's test IGNORE
res.render('homepage', {
    id: 1,
    name: "South Kaibab Trail",
    length: 3,
    dog_friendly: true,
    bike_friendly: true,
    difficulty: "Difficult",
    description: "This trail descends a series of steep, exposed switchbacks, allowing you to grasp the magnitude of the canyon as you stare into its depths.",
    posted_by: 1,
    comment: [
        { 
        id: 1,
        comment_text: "I love this trail!"
    },{
        id: 1,
        comment_text: "This trail has a beautiful view."
    }
    ],
    rating: 3
*/
