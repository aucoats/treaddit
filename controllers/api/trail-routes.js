const router = require('express').Router();
const firebase = require('firebase');
const multer  = require('multer');
const upload = multer();

// image prefix to Trail filepath store ** CONCAT WITH SNAPSHOT BELOW ** 
// gs://treaddit.appspot.com/trails 

const { Trail, User } = require('../../models');

const firebaseConfig = {
    apiKey: "AIzaSyDyyFmd6Y7okq8KMn7JyROKxfk46gKJfC4",
    authDomain: "treaddit.firebaseapp.com",
    projectId: "treaddit",
    storageBucket: "treaddit.appspot.com",
    messagingSenderId: "964574079370",
    appId: "1:964574079370:web:7dd35ffdb6443410a78073",
    measurementId: "G-60MZQ7M7LG"
};

firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
var storageRef = storage.ref();

const uploadTrailImage = (trailImage) => {
    var imageRef = storageRef.child(`/trails/${trailImage.originalname}`)
    var metaData = {
        contentType: 'image/jpeg'
    }
    return imageRef.put(trailImage.buffer, metaData).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log(snapshot);

        // snapshot._delegate.metadata.fullPath is to store in Trails DB


      });
}

router.get('/', (req, res) => {
    Trail.findAll({
        attributes: [
            'id',
            'name',
            'length',
            'dog_friendly',
            'bike_friendly',
            'difficulty',
            'description'
        ],
        // include: [
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }
        // ]
    })
    .then((dbTrailData) => {
        // retrieve image from DB 
        // create storage reference
        // pull image from reference 
        res.json(dbTrailData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

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
                model: User,
                attributes: ['username']
            }
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

router.post('/', upload.single("file"), (req, res) => {
    console.log(req.file);
    uploadTrailImage(req.file)
    .then((result) => {
        res.json(result);
    })
    // Trail.create({
    //     name: req.body.name,
    //     length: req.body.length,
    //     dog_friendly: req.body.dog_friendly,
    //     bike_friendly: req.body.bike_friendly,
    //     difficulty: req.body.difficulty,
    //     description: req.body.description
    // })
    // .then(dbTrailData => res.json(dbTrailData))
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // });
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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