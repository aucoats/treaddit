const router = require('express').Router();
const sequelize = require('../config/connection');
const { Trail, User } = require('../models');

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
        ]
    }) .then(dbTrailData => {
       const trails = dbTrailData.map(trail => trail.get({ plain: true }));
       res.render('homepage', {trails});
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

const exphbs = require('express-handlebars');
const helpers = require('../utils/helpers')
const hbs = exphbs.create({ helpers });

hbs.handlebars.registerHelper('difficultyLevel', function (difficulty) {
    if(difficulty == "Easy"){
        return "default"
    }
    if(difficulty == "Moderate"){
        return "warning"
    }
    if(difficulty == "Difficult"){
        return "danger"
    }
});

module.exports = router; 