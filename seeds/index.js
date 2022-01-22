const sequelize = require('../config/connection');

const seedUsers = require('./user-seeds');
const seedTrails = require('./trail-seeds');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedUsers();
    await seedTrails();
    process.exit(0);
};
  
seedAll();