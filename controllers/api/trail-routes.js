const router = require('express').Router();
const { download } = require('express/lib/response');
const firebase = require('firebase');
const multer  = require('multer');
const upload = multer();

// image prefix to Trail filepath store ** CONCAT WITH SNAPSHOT BELOW ** 
// gs://treaddit.appspot.com/trails/project3.jpg

const { Trail, User, Comment, Rating } = require('../../models');
const sequelize = require('../../config/connection');
const Sequelize = require('sequelize');
const withAuth = require('../../utils/auth');

const firebaseConfig = {
    apiKey: "AIzaSyDyyFmd6Y7okq8KMn7JyROKxfk46gKJfC4",
    authDomain: "treaddit.firebaseapp.com",
    projectId: "treaddit",
    storageBucket: "treaddit.appspot.com",
    messagingSenderId: "964574079370",
    appId: "1:964574079370:web:7dd35ffdb6443410a78073",
    measurementId: "G-60MZQ7M7LG"
};


router.get('/', (req, res) => {
    Trail.findAll({
        attributes: [
            'id',
            'name',
            'length',
            'dog_friendly',
            'bike_friendly',
            'difficulty',
            'description',
            'img_ref'
        ],
        group: 'id',
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'trail_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Rating,
                attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']]
            }
            // {
            //     model: User,
            //     attributes: ['username']
            // }
        ]
    })
    .then(dbTrailData => {
        console.log('dbTrailData:', dbTrailData)
        console.log("dbTrailData[0].dataValues.img_ref:", dbTrailData[0].dataValues.img_ref)
          
        // var img_ref = dbTrailData[0].dataValues.img_ref;
        // await downloadTrailImage(img_ref).then(response => {
        //     dbTrailData[0].dataValues.img_ref = response;
        //     return dbTrailData;
        //     // if (document.querySelector(".img-circle")) {
        //     //     var imgElement = document.querySelector(".img-circle");
        //     //     imgElement.src=img_url;
        //     // } 
        // })

        // console.log('dbTrailData:', dbTrailData)
        // console.log('img_url:', img_url)
        // dbTrailData.trail.dataValues.push(img_url);
        // retrieve image from DB 
        // create storage reference
        // pull image from reference 
        res.json(dbTrailData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// router.get('/trailavg/:id', (req, res) => {
//     Trail.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: [
//             [Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating'],
//         ],
//         include: [
//             {
//               model: Rating,
//             }
//         ],
//         raw: true,
//         group: ['Trail.id'],
//     })
//     .then(dbTrailData => { 
//         res.json(dbTrailData);
//     });
// });

router.get('/:id', (req, res) => {
    Trail.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'length',
            'dog_friendly',
            'bike_friendly',
            'difficulty',
            'description'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'trail_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Rating,
                attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']]
            },
            // {
            //     model: User,
            //     attributes: ['username']
            // }
        ]
    })
    .then(dbTrailData => {
        if(!dbTrailData) {
            res.status(404).json({message: 'No trail found with this id'})
            return;
        }
        res.json(dbTrailData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Trail.create({
        name: req.body.name,
        length: req.body.length,
        dog_friendly: req.body.dog_friendly,
        bike_friendly: req.body.bike_friendly,
        difficulty: req.body.difficulty,
        description: req.body.description,
        img_ref: req.body.img_ref
    })
    .then(dbTrailData => res.json(dbTrailData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.post('/rating/:id', withAuth, (req, res) => {

    Rating.create({
        rating: req.body.rating,
        trail_id: req.params.id,
        user_id: req.session.user_id
    })
    .then(ratingData => res.json(ratingData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/rating/:id', withAuth, (req, res) => {
    console.log(req.body);
    Rating.update(req.body, {
        where: {
            id: req.params.id,
            user_id: req.session.user_id
        }
    })
    .then(dbTrailData => {
        if(!dbTrailData) {
            res.status(404).json({ message: 'No Rating found with this id' });
            return;
        }
        res.json(dbTrailData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


router.put('/:id', withAuth, (req, res) => {
    Trail.update(
        {
            name: req.body.name,
            length: req.body.length,
            dog_friendly: req.body.dog_friendly,
            bike_friendly: req.body.bike_friendly,
            difficulty: req.body.difficulty,
            description: req.body.description
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbTrailData => {
        if(!dbTrailData) {
            res.status(404).json({ message: 'No Trail found with this id' });
            return;
        }
        res.json(dbTrailData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Trail.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbTrailData => {
        if (!dbTrailData) {
            res.status(404).json({ message: 'No trail found with this id!' });
            return;
        }
        res.json(dbTrailData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;