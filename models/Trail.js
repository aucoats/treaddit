const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const firebase = require('firebase');
const multer  = require('multer');
const upload = multer();
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
// const storageRef = require('../controllers/api/trail-routes');
// const downloadTrailImage = require('../controllers/api/trail-routes');


class Trail extends Model {
    // static uploadTrailImage = (trailImage) => {
    //     var imageRef = storageRef.child(`/trails/${trailImage.originalname}`)
    //     var metaData = {
    //         contentType: 'image/jpeg'
    //     }
    //     return imageRef.put(trailImage.buffer, metaData).then((snapshot) => {
    //         console.log('Uploaded a blob or file!');
    //         console.log(snapshot);
    
    //         // snapshot._delegate.metadata.fullPath is to store in Trails DB
    
    
    //       });
    // }
    
    static downloadTrailImage(img_ref) {
      
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
    
};


Trail.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
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
        bike_friendly: {
            type: DataTypes.BOOLEAN, 
            allowNull: true,             
        },
        difficulty: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        description: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        img_ref: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER, 
            allowNull: true, 
            references: {
                model: 'user', 
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true, 
        underscored: true, 
        modelName: 'trail'
    }
)

module.exports = Trail, firebase; 
