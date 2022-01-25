const sequelize = require('../config/connection');

const seedUsers = require('./user-seeds');
const seedTrails = require('./trail-seeds');
// const seedRatings = require('./rating-seeds');
// const seedFavorites = require('./favorite-seeds');
// const seedComments = require('./comment-seeds');



const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedUsers();
    console.log('--------------');
    await seedTrails();
    console.log('--------------');
    // await seedRatings();
    console.log('--------------');
    // await seedFavorites();
    console.log('--------------');
    // await seedComments();
    process.exit(0);
};
  
seedAll();