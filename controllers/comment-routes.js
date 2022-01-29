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
                attributes: ['rating'],
            }
            // {
            //     model: Rating,
            //     attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']]
            // },
        ],
    }).then(dbTrailData => {
        const trail = dbTrailData.get({ plain: true });
        console.log('trail:', trail)
        res.render('comment', {trail, loggedIn: req.session.loggedIn}); //user logged off can view, user loggedin can add/rate
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

module.exports = router; 