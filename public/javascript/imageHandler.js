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



function downloadTrailImage(img_ref) {
    var imgElement= document.querySelectorAll('.img-circle');
    var img_ref = imgElement.src;
    // [START storage_download_full_example]
    // Create a reference to the file we want to download
    var starsRef = storageRef.child(img_ref);
  
    // Get the download URL
    starsRef.getDownloadURL()
    .then((url) => {
      // Insert url into an <img> tag to "download"
      console.log(url);
      imgElement.src = url;
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