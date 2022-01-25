const imgElement = document.querySelector(".img-circle")
const img_ref = imgElement.src;

async function downloadTrailImage(img_ref) {
  
    // [START storage_download_full_example]
    // Create a reference to the file we want to download
    var starsRef = storageRef.child(img_ref);
  
    // Get the download URL
    await starsRef.getDownloadURL()
    .then((url) => {
      // Insert url into an <img> tag to "download"
        console.log(url);
        imgElement.src=url;
        
    
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

downloadTrailImage(img_ref);