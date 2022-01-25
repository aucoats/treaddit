const sequelize = require('../config/connection');
const { User, Trail } = require('../models');

const trailData = [
    {
        name: 'South Kaibab Trail, Grand Canyon National Park',
        length: 3,
        dog_friendly: true,
        bike_friendly: true,
        difficulty: "Difficult",
        description: "Hiking the South Kaibab Trail is one of the best ways to experience the Grand Canyon. This trail descends a series of steep, exposed switchbacks, allowing you to grasp the magnitude of the canyon as you stare into its depths. Incredible views greet you right from the canyon rim, but they continue to evolve and expand with every step down the trail.",
        posted_by: 1,
    },
    {
        name: "Ocean Trail, Acadia National Park",
        length: 4.4,
        dog_friendly: false,
        bike_friendly: false,
        difficulty: 'Easy',
        description: "This family-friendly beach stroll is great for hikers of any level. The Ocean Trail provides inspiring views of the rocky Northeastern coastline, allowing you to experience the roaring of the water as it tumbles through Thunder Head. ",
        posted_by: 1,
    },
    {
        name: "Mohonk Labyrinth and Lemon Squeeze, New York",
        length: 5.5,
        dog_friendly: true,
        bike_friendly: true,
        difficulty: "Moderate",
        description: "This trail starts at the Mohonk Mountain House, a historic resort with miles of hiking trails. You’ll follow trails through the grounds, passing gardens and gazebos for a couple of miles before arriving at the Labyrinth – a rocky scramble that twists and turns through a maze of boulders.",
        posted_by: 1,
    },
    {
        name: "Vesper Peak, North Cascades",
        length: 8,
        dog_friendly: false,
        bike_friendly: false,
        difficulty: "Difficult",
        description: "The hike starts in a dense, mossy forest and takes you over a stream crossing. From here, it quickly opens up into a beautiful basin with towering peaks on either side, leaving you wondering how you’ll ever climb up and over the near-vertical walls. ",
        posted_by: 1,
    },
    {
        name: "Clouds Rest, Yosemite National Park",
        length: 14.5,
        dog_friendly: false,
        bike_friendly: false,
        difficulty: "Moderate",
        description: "The Clouds Rest Trail starts at high-elevation along Tioga Pass at the Sunrise Lakes Trailhead. Within minutes of leaving the trailhead, you encounter the Tenaya Lake outlet. Early in the season, you will have to ford this river, but later in the season, there is a set of rocks to provide a relatively dry crossing. After a deceivingly flat start to the hike, you climb a series of steep switchbacks that lead you to a fork with the Sunrise Lakes trail.",
        posted_by: 1,
    }
]

const seedTrails = () => Trail.bulkCreate(trailData);

module.exports = seedTrails; 
