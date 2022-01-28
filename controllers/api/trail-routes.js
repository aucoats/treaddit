const router = require('express').Router();
const { download } = require('express/lib/response');
const firebase = require('firebase');
const multer  = require('multer');
const upload = multer();
const { Trail, User, Comment, Rating } = require('../../models');
const sequelize = require('../../config/connection');
const Sequelize = require('sequelize');
const withAuth = require('../../utils/auth');

// image prefix to Trail filepath store ** CONCAT WITH SNAPSHOT BELOW ** 
// gs://treaddit.appspot.com/trails/project3.jpg


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

const uploadTrailImageFirebase = (trailImage) => {
    var imageRef = storageRef.child(`/trails/${trailImage.originalname}`)
    var metaData = {
        contentType: 'image/jpeg'
    }
    return imageRef.put(trailImage.buffer, metaData).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log('snapshot:', snapshot)

        // snapshot._delegate.metadata.fullPath is to store in Trails DB


      });
}



function downloadTrailImage(img_ref) {
  
    // [START storage_download_full_example]
    // Create a reference to the file we want to download
    var starsRef = storageRef.child(img_ref);
  
    // Get the download URL
    return starsRef.getDownloadURL()
    .then((url) => {
      // Insert url into an <img> tag to "download"
      console.log(url);
      return url;
    //   <img src="url"></img>
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
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
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbTrailData => { res.json(dbTrailData); })
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
            'img_ref',
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
    console.log('req.file:', req.file)
    console.log('req.body:', req.body)
    uploadTrailImageFirebase(req.file)
    .then((result) => {
        res.json(result);
        var img_ref = "/trails/" + req.file.originalname;    
        return downloadTrailImage(img_ref)
    })
    .then(url => {
    Trail.create({
        name: req.body.name,
        length: req.body.length,
        dog_friendly: req.body.dog_friendly,
        bike_friendly: req.body.bike_friendly,
        difficulty: req.body.difficulty,
        description: req.body.description,
        user_id: req.session.user_id,
        img_ref: url
    })
    // .then(dbTrailData => res.json(dbTrailData))
    .catch(err => {
        console.log(err);
        // res.status(500).json(err);
    });
})});


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