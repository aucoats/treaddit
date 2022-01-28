const sequelize = require('../config/connection');
const { User, Trail } = require('../models');

const trailData = [
    {
        name: 'South Kaibab Trail, Grand Canyon National Park',
        length: 3,
        dog_friendly: true,
        bike_friendly: true,
        difficulty: "Difficult",
        img_ref: "/img/example.jpg",
        description: "This trail descends a series of steep, exposed switchbacks, allowing you to grasp the magnitude of the canyon as you stare into its depths.",
        posted_by: 1,
    },
    {
        name: "Ocean Trail, Acadia National Park",
        length: 4.4,
        dog_friendly: false,
        bike_friendly: false,
        difficulty: 'Easy',
        img_ref: "/img/example.jpg",
        description: "This family-friendly beach stroll is great for hikers of any level. ",
        posted_by: 1,
    },
    {
        name: "Mohonk Labyrinth and Lemon Squeeze, New York",
        length: 5.5,
        dog_friendly: true,
        bike_friendly: true,
        difficulty: "Moderate",
        img_ref: "/img/example.jpg",
        description: "You’ll follow trails through the grounds, passing gardens and gazebos for a couple of miles before arriving at the Labyrinth – a rocky scramble that twists and turns through a maze of boulders.",
        posted_by: 1,
    },
    {
        name: "Vesper Peak, North Cascades",
        length: 8,
        dog_friendly: false,
        bike_friendly: false,
        difficulty: "Difficult",
        img_ref: "/img/example.jpg",
        description: "The hike starts in a dense, mossy forest and takes you over a stream crossing. From here, it quickly opens up into a beautiful basin with towering peaks on either side.",
        posted_by: 1,
    },
    {
        name: "Clouds Rest, Yosemite National Park",
        length: 14.5,
        dog_friendly: false,
        bike_friendly: false,
        difficulty: "Moderate",
        img_ref: "/img/example.jpg",
        description: "The Clouds Rest Trail starts at high-elevation along Tioga Pass at the Sunrise Lakes Trailhead. Within minutes of leaving the trailhead, you encounter the Tenaya Lake outlet.",
        posted_by: 1,
    }
]

const seedTrails = () => Trail.bulkCreate(trailData);

module.exports = seedTrails; 
