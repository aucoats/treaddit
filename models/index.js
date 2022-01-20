const User = require('./User');
const Trail = require('./Trail');
const Rating = require('./Rating');
const Favorite = require('./Favorite');


User.hasMany(Trail, {
    foreignKey: 'posted_by'
});

User.belongsToMany(Trail, {
    through: Rating, 
    as: 'rated_trails',
    foreignKey: 'user_id'
});

Trail.belongsToMany(User, {
    through: Rating, 
    as: 'rated_trails', 
    foreignKey: 'trail_id'
});

User.belongsToMany(Trail, {
    through: Favorite, 
    as: 'favorite_trails',
    foreignKey: 'user_id'
});

Trail.belongsToMany(User, {
    through: Favorite, 
    as: 'favorite_trails', 
    foreignKey: 'trail_id'
});

User.hasMany(Favorite, {
    foreignKey: 'user_id'
}); 

Favorite.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Rating, {
    foreignKey: 'user_id'
});

Rating.belongsTo(User, {
    foreignKey: 'user_id'
});

Trail.hasMany(Favorite, {
    foreignKey: 'trail_id'
});

Favorite.belongsTo(Trail, {
    foreignKey: 'trail_id'
});

Trail.hasMany(Rating, {
    foreignKey: 'trail_id'
});

Rating.belongsTo(Trail, {
    foreignKey: 'trail_id'
});


module.exports = { User, Trail, Rating, Favorite };
