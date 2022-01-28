//add delete trail api fetch
async function deleteTrail(event) {
    event.preventDefault();
    await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
  }
  
  document.querySelector('#destroyTrailBtn').addEventListener('click', deleteTrail);

//add update user trail code