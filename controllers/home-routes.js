const router = require('express').Router();
const sequelize = require('../config/connection');
const { Trail, User } = require('../models');

router.get('/', (req, res) => {
    Trail.findAll({
        attributes: [
            'id',
            'name',
            'length',
            'dog_friendly',
            'bike_friendly',
            'difficulty'
        ]
    })
    .then(dbTrailData => {
        //pass trails through homepage template
        //const trails = dbTrailData.map(trail => trail.get({plain: true}));
        res.render('homepage', dbTrailData[0].get({plain: true}));
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router; 