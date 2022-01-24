const sequelize = require('../config/connection');
const faker = require('@faker-js/faker');
const { User, Trail, Comment } = require('../models');

const commentData = [
    {
        comment_text: faker.datatype.string(),
        user_id: 1,
        trail_id: 1, 
    },
    {
        comment_text: faker.datatype.string(),
        user_id: 2,
        trail_id: 2
    },
    {
        comment_text: faker.datatype.string(),
        user_id: 3,
        trail_id: 3
    },
    {
        comment_text: faker.datatype.string(),
        user_id: 4,
        trail_id: 4
    },
    {
        comment_text: faker.datatype.string(),
        user_id: 5,
        trail_id: 5
    }

]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;