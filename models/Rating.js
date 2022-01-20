const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model {} 

Rating.init({
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        autoIncrement: true,
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
});

module.exports = Rating; 