const req = require("express/lib/request");
const res = require("express/lib/response");

const createCommentForm = document.querySelector("#comment-form");

createCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // var starRating; 

    // if (document.querySelector("#rating-1").checked) {
    //     starRating = 1;
    // } else if (document.querySelector("#rating-2").checked) {
    //     starRating = 2;
    // } else if (document.querySelector("#rating-3").checked) {
    //     starRating = 3;
    // } else if (document.querySelector("#rating-4").checked) {
    //     starRating = 4;
    // } else if (document.querySelector("#rating-5").checked) {
    //     starRating = 5;
    // }

    // const ratingData = {
    //     rating: starRating,
    //     user_id: req.session.user_id,
    //     trail_id: req.params.id
    // }

    // const ratingRequest = {
    //     method: 'POST', 
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(ratingData)
    // }

    // const ratingData = await fetch('api/ratings', ratingRequest)
    //     .then(response => response.json())
    //     .catch(err => console.log(err));

    const commentData = document.querySelector("#addCommentText").value; 

    if (commentData === 'This trail...') {
        alert('Empty comments do not an interesting trail make');
        break;
    }

    //logic to get form data
    const formData = {
        comment_text: commentData,
        user_id: req.session.user_id,
        trail_id: req.params.id
    }

    //api call
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };

    //validate success, reset form
    const data = await fetch('api/comments', requestOptions)
    .then(response => {
        response.json()
        window.location.reload()
    })
    .catch(err => console.log(err));

    

})
