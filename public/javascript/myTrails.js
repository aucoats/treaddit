const { response } = require("express");

//add delete trail api fetch
const deleteTrail = document.querySelector("#destroyTrailBtn");

deleteTrail.addEventListener( 'click', async (e) => {
    var traidID = document.querySelector("#destroyTrailBtn").value;
    await fetch(`/api/trails/${traidID}`, {
        method: 'DELETE'
    })
    .then(
        window.location.reload()
        )
});

//add update user trail code
//create trail
const updateTrailForm = document.getElementById('update_trail_form');
const updateTrailName = updateTrailForm.querySelector('#trail_name');
const updateTrailLength = updateTrailForm.querySelector('#trail_length');
const updateDogFriendly = updateTrailForm.querySelector('#dog_friendly');
const updateBikeFriendly = updateTrailForm.querySelector('#bike_friendly');
const updateDifficulty = updateTrailForm.querySelector('#update_diff');
const updateDescription = updateTrailForm.querySelector('#description');
const updateBtn = updateTrailForm.querySelector('#updateBtn');


updateTrailForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    var formData = new FormData()
    formData.append('name', updateTrailName.value)
    formData.append('length', updateTrailLength.value)
    formData.append('dog_friendly', updateDogFriendly.value === 'on')
    formData.append('bike_friendly', updateBikeFriendly.value === 'on')
    formData.append('difficulty', updateDifficulty.value)
    formData.append('description', updateDescription.value)

    //api call
    await fetch(`/api/trails/${updateBtn.value}`, {
        method: 'PUT', 
        body: formData
    })
    .then(
      //close modal
      console.log(data),
      window.location.reload()
      )
});
