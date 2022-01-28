// const { Json } = require("sequelize/dist/lib/utils");

const createCommentForm = document.querySelector("#comment-form");

createCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const trail_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    var starRating; 

    if (document.querySelector("#rating-1").checked) {
        starRating = 1;
    } else if (document.querySelector("#rating-2").checked) {
        starRating = 2;
    } else if (document.querySelector("#rating-3").checked) {
        starRating = 3;
    } else if (document.querySelector("#rating-4").checked) {
        starRating = 4;
    } else if (document.querySelector("#rating-5").checked) {
        starRating = 5;
    }

    const ratingData = {
        rating: starRating,
        trail_id: trail_id
    }

    const ratingRequest = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ratingData)
    }

    await fetch('api/ratings', ratingRequest)
        .then(response => response.json())
        .catch(err => console.log(err));
        // .catch(async function(err) {
        //     console.log('err:', err)
        //     if (err) {
        //         const ratingPutRequest = {
        //             method: 'PUT', 
        //             headers: { 'Content-Type': 'application/json' },
        //             body:JSON.stringify(ratingData)
        //         }

        //         await fetch('api/ratings', ratingPutRequest)
        //         .then(response => response.json())
        //         .catch(err => console.log(err));
        //     }
    

    // const resolvedRatingDataPost = await ratingDataPost.json();
    // alert(resolvedRatingDataPost.message);

    const commentData = document.querySelector("#addCommentText").value; 

    if (commentData === 'This trail...') {
        alert('Empty comments do not an interesting trail make');
        window.location.reload();
    }

    

    //logic to get form data
    const formData = {
        comment_text: commentData,
        trail_id: trail_id,
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

    const resolvedData  = await data.json();
    alert(resolvedData.message);
});
