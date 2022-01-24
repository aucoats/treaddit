const sequelize = require('../config/connection');
const faker = require('@faker-js/faker');
const { User, Trail, Rating } = require('../models');

const ratingData = [
    {
        rating: Math.floor(Math.random() * 6) + 1,
        user_id: 1,
        trail_id: 1
    },
    
]
id: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    autoIncrement: true,
    primaryKey: true
}, 
rating: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    validate: {
        min: 1, 
        max: 5
    }
},
user_id: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: {
        model: 'user', 
        key: 'id'
    }
},
trail_id: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: {
        model: 'trail',
        key: 'id'
    }
}