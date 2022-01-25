const sequelize = require('../config/connection');
const { User, Trail } = require('../models');

const trailData = [
    {
        name: `Da Trail`,
        length: 5,
        dog_friendly: true,
        bike_friendly: true,
        difficulty: 3,
        description: `Description description description`,
        img_ref: "trails/project3.jpg",
        user_id: 1,
    }
]

const seedTrails = () => Trail.bulkCreate(trailData);

module.exports = seedTrails; 
