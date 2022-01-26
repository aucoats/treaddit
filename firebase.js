// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage, ref } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDyyFmd6Y7okq8KMn7JyROKxfk46gKJfC4",
//   authDomain: "treaddit.firebaseapp.com",
//   projectId: "treaddit",
//   storageBucket: "treaddit.appspot.com",
//   messagingSenderId: "964574079370",
//   appId: "1:964574079370:web:7dd35ffdb6443410a78073",
//   measurementId: "G-60MZQ7M7LG"
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // referencces the storage service
// const storage = getStorage(firebaseApp);

// // create a storage reference from storage service
// const storageRef = ref(storage);

// // create a child reference
// const imagesRef = ref(storage, 'images');
// // imageRef now points to 'images'

// // Child references can also take paths delimited by '/'
// const spaceRef = ref(storage, 'images/space.jpg');
// // spaceRef now points to "images/space.jpg"
// // imagesRef still points to "images"

// // Parent allows us to move to the parent of a reference
// const imagesRef = spaceRef.parent;
// // imagesRef now points to 'images'

// // Root allows us to move all the way back to the top of our bucket
// const rootRef = spaceRef.root;
// // rootRef now points to the root

// // Reference's path is: 'images/space.jpg'
// // This is analogous to a file path on disk
// spaceRef.fullPath;

// // Reference's name is the last segment of the full path: 'space.jpg'
// // This is analogous to the file name
// spaceRef.name;

// // Reference's bucket is the name of the storage bucket where files are stored
// spaceRef.bucket;


// // UPLOADING A FILE
// import { getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'some-child');

// // 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
// });


// // METADATA TO ENSURE ALL FILES ARE UPLOADED AS THE SAME TYPE
// // Create file metadata including the content type
// /** @type {any} */
// const metadata = {
//     contentType: 'image/jpeg',
//   };
  
//   // Upload the file and metadata
//   const uploadTask = uploadBytes(storageRef, file, metadata);