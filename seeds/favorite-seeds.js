const sequelize = require('../config/connection');
const faker = require('@faker-js/faker');
const { User, Trail, Favorite } = require('../models');

const favData = [
    {
        favorite: faker.datatype.boolean(),
        user_id: Math.floor(Math.random() * 5) + 1,
        trail_id: Math.floor(Math.random() * 5) + 1, 
    },
    {
        favorite: faker.datatype.boolean(),
        user_id: Math.floor(Math.random() * 5) + 1,
        trail_id: Math.floor(Math.random() * 5) + 1, 
    },     
    {
        favorite: faker.datatype.boolean(),
        user_id: Math.floor(Math.random() * 5) + 1,
        trail_id: Math.floor(Math.random() * 5) + 1, 
    }, 
    {
        favorite: faker.datatype.boolean(),
        user_id: Math.floor(Math.random() * 5) + 1,
        trail_id: Math.floor(Math.random() * 5) + 1, 
    }, 
    {
        favorite: faker.datatype.boolean(),
        user_id: Math.floor(Math.random() * 5) + 1,
        trail_id: Math.floor(Math.random() * 5) + 1, 
    },    
]


const seedFavorites = () => Favorite.bulkCreate(favData);

module.exports = seedFavorites;
