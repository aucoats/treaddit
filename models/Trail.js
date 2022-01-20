const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trail extends Model {};

Trail.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true
        },
        name: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        }, 
        length: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
        },
        dog_friendly: {
            type: DataTypes.BOOLEAN, 
            allowNull: true, 
        },
        difficulty: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        posted_by: {
            type: DataTypes.STRING, 
            allowNull: true, 
            references: {
                model: 'user', 
                key: 'id'
            }
        }
    }
)

module.exports = Trail; 
