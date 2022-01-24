const router = require('express').Router();
const sequelize = require('../config/connection');
const { Trail, User } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    Trail.findAll({
        attributes: [
            'id',
            'name',
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

/*    res.render('homepage', {
        id: 1,
        name: "California Trail",
        length: 5,
        dog_friendly: false,
        bike_friendly: true,
        difficulty: "Moderate",
        description: "This is a description example. This is a description example. This is a description example.",
    });
*/
});


module.exports = router; 