const sequelize = require('../config/connection');
const { Trail } = require('../models');
const faker = require('@faker-js/faker');

const traildata = [ 
    {
        id: 1,
        name: "California Trail",
        length: 5,
        dog_friendly: true,
        bike_friendly: true,
        difficulty: "Moderate",
        description: "Beautiful beach trail in Northern California",
        user_id: 1
    }
]

const seedTrails = () => Trail.bulkCreate(traildata);

module.exports = seedTrails; 