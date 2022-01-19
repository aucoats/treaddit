const sequelize = require('../config/connection');
const { User, Trail } = require('../models');

const userdata = [
    {
        username: 'Austin Test',
        email: 'testing@gmail.com',
        password: 'password123'
    }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers; 