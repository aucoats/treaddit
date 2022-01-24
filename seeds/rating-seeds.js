const sequelize = require('../config/connection');
const faker = require('@faker-js/faker');
const { User, Trail, Rating } = require('../models');

const ratingData = [
    {
        rating: Math.floor(Math.random() * 6) + 1,
        user_id: 1,
        trail_id: 1
    },
    {
        rating: Math.floor(Math.random() * 6) + 1,
        user_id: 2,
        trail_id: 1
    },
    {
        rating: Math.floor(Math.random() * 6) + 1,
        user_id: 3,
        trail_id: 1
    },
    {
        rating: Math.floor(Math.random() * 6) + 1,
        user_id: 4,
        trail_id: 1
    },
    {
        rating: Math.floor(Math.random() * 6) + 1,
        user_id: 5,
        trail_id: 1
    },
]

const seedRatings = () => Rating.bulkCreate(ratingData);

module.exports = seedRatings;