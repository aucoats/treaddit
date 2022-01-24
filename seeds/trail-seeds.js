const sequelize = require('../config/connection');
const faker = require('@faker-js/faker');
const { User, Trail } = require('../models');

const trailData = [
    {
        name: `${faker.address.county()}${faker.animal.type()}`,
        length: `${faker.datatype.number()}`,
        dog_friendly: `${faker.datatype.boolean()}`,
        bike_friendly: faker.datatype.boolean(),
        difficulty: faker.helpers.randomize([1, 2, 3, 4, 5]),
        description: `${faker.datatype.string()}`,
        posted_by: 1,
    },
    {
        name: `${faker.address.county()}${faker.animal.type()}`,
        length: `${faker.datatype.number()}`,
        dog_friendly: `${faker.datatype.boolean()}`,
        bike_friendly: faker.datatype.boolean(),
        difficulty: faker.helpers.randomize([1, 2, 3, 4, 5]),
        description: `${faker.datatype.string()}`,
        posted_by: 1,
    },
    {
        name: `${faker.address.county()}${faker.animal.type()}`,
        length: `${faker.datatype.number()}`,
        dog_friendly: `${faker.datatype.boolean()}`,
        bike_friendly: faker.datatype.boolean(),
        difficulty: faker.helpers.randomize([1, 2, 3, 4, 5]),
        description: `${faker.datatype.string()}`,
        posted_by: 1,
    },
    {
        name: `${faker.address.county()}${faker.animal.type()}`,
        length: `${faker.datatype.number()}`,
        dog_friendly: `${faker.datatype.boolean()}`,
        bike_friendly: faker.datatype.boolean(),
        difficulty: faker.helpers.randomize([1, 2, 3, 4, 5]),
        description: `${faker.datatype.string()}`,
        posted_by: 1,
    },
    {
        name: `${faker.address.county()}${faker.animal.type()}`,
        length: `${faker.datatype.number()}`,
        dog_friendly: `${faker.datatype.boolean()}`,
        bike_friendly: faker.datatype.boolean(),
        difficulty: faker.helpers.randomize([1, 2, 3, 4, 5]),
        description: `${faker.datatype.string()}`,
        posted_by: 1,
    }
]

const seedTrails = () => Trail.bulkCreate(trailData);

module.exports = seedTrails; 
