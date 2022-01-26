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
            'img_ref',
            'description',
        ]
    }) .then(dbTrailData => {
        
        // const { img_url } = downloadTrailImage(`${dbTrailData[0].dataValues.img_ref}`);
        var img_ref = dbTrailData[0].dataValues.img_ref;
        img_url = router.use('/', (req, res) => {
            console.log(downloadTrailImage(img_ref))
            return downloadTrailImage(img_ref);
        })
       
        console.log('img_url:', img_url)
        const trails = dbTrailData.map(trail => trail.get({ plain: true }));
        

        res.render('homepage', {trails});
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

const exphbs = require('express-handlebars');
const helpers = require('../utils/helpers');
const { download } = require('express/lib/response');
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

module.exports = router; 