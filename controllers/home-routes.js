const router = require('express').Router();
const sequelize = require('../config/connection');
const { Trail, User, Comment } = require('../models');
const storageRef = require('./api/trail-routes');
const downloadTrailImage = require('./api/trail-routes');

router.get('/', (req, res) => {
    console.log(req.session);

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
    });
/*
    Trail.findAll({
        attributes: [
            'id',
            'name',
            'length',
            'dog_friendly',
            'bike_friendly',
            'difficulty',
            'description',
        ]
    }) .then(dbTrailData => {
       const trails = dbTrailData.map(trail => trail.get({ plain: true }));
       res.render('homepage', {trails});
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
*/

});

router.get('/:id', (req, res) => {
    const trail = {
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
            id: 2,
            comment_text: "This trail has a beautiful view."
        }
        ],
        rating: 3
    };
  
    res.render('comment', { trail });
  });

const exphbs = require('express-handlebars');
const helpers = require('../utils/helpers')
const hbs = exphbs.create({ helpers });

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

hbs.handlebars.registerHelper('multiof3', function(id) {
    var remainder = id % 3;
    
    if(remainder == 0) {
        return true;
    } else { 
        return false;
    }
});

/* Create a handle to get the value of rating, and send the mount of stars back */

module.exports = router; 