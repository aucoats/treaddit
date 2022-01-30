const router = require('express').Router();
const sequelize = require('../config/connection');
const Sequelize = require('sequelize');
const { Trail, User, Comment, Rating, Favorite } = require('../models');
const storageRef = require('./api/trail-routes');
const downloadTrailImage = require('./api/trail-routes');
const exphbs = require('express-handlebars');
const helpers = require('../utils/helpers');
const { download } = require('express/lib/response');
const hbs = exphbs.create({ helpers });

router.get('/', (req, res) => {
    if(req.session.user_id){
        Favorite.findAll({
            where:{ user_id: req.session.user_id, favorite: true},
            group: ['id'],
            include: [
                {
                    model: Trail,
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
                }
            ]
        }
    )
    .then(favoriteData => {
        const favorites = favoriteData.map(fave => fave.get({ plain: true }));
       const trails = favorites.map(fave =>  fave.trail);
       console.log(trails)
        res.status(200).render('favorites', {trails, loggedIn: req.session.loggedIn})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    } else {
        res.json([]);
    }
});

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

/* Create a handle to get the value of rating, and send the mount of stars back */

module.exports = router;