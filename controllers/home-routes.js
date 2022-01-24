const router = require('express').Router();
const { Trail, User } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    res.render('homepage', {
        id: 1,
        name: "California Trail",
        length: 5,
        dog_friendly: false,
        bike_friendly: true,
        difficulty: "Moderate",
        description: "This is a description example. This is a description example. This is a description example.",
    });
});

module.exports = router; 