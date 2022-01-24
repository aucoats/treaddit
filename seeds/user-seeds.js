const sequelize = require('../config/connection');
const faker = require('@faker-js/faker');
const { User, Trail } = require('../models');

const userdata = [
    {
        username: 'Austin Test',
        email: 'testing@gmail.com',
        password: 'password123'
    },
    {
        username: `${faker.animal.type()}${faker.commerce.product()}`,
        email: `${faker.internet.email()}`,
        password: 'password123'
    },
    {
        username: `${faker.animal.type()}${faker.commerce.product()}`,
        email: `${faker.internet.email()}`,
        password: 'password123'

    },


];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers; 