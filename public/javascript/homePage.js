//login
const loginForm = document.getElementById('login_form');
const loginEmail = loginForm.querySelector('#login_email');
const loginPassword = loginForm.querySelector('#login_password');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
   
    //logic to get form data
    const formData = {
        email: loginEmail.value,
        password: loginPassword.value
    }
    //api call
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };

    //validate success -- need to figure out error handling
    const data = await fetch('api/users/login', requestOptions)
    .then(response => response)
    .catch(err => console.log(err));

    const resolvedData  = await data.json();
    alert(resolvedData.message);

    //error handling
    if(data.status && data.status !== 200 ) {
        loginForm.reset();
    } else {
    //close modal
    closeAllModals();
    window.location.reload();
    };
});


//create user
const createUserForm = document.getElementById('create_user_form');
const createUsername = createUserForm.querySelector('#create_username');
const createEmail = createUserForm.querySelector('#create_email');
const createPassword = createUserForm.querySelector('#create_password');

createUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
   
    //logic to get form data
    const formData = {
        username: createUsername.value,
        email: createEmail.value,
        password: createPassword.value
    }
    //api call
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };
    console.log(requestOptions);
    //validate success -- need to figure out error handling
    const data = await fetch('api/users', requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data
    })
    .catch(err => console.log(err));

    document.getElementById('create_user_form').reset()

    //close modal
    closeAllModals();
    window.location.reload();
});

//create trail
const createTrailForm = document.getElementById('create_trail_form');
const createTrailName = createTrailForm.querySelector('#trail_name');
const createTrailLength = createTrailForm.querySelector('#trail_length');
const createDogFriendly = createTrailForm.querySelector('#dog_friendly');
const createBikeFriendly = createTrailForm.querySelector('#bike_friendly');
const createDifficulty = createTrailForm.querySelector('#difficulty');
const createDescription = createTrailForm.querySelector('#description');

createTrailForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    //logic to get form data
    const formData = {
        name: createTrailName.value,
        length: createTrailLength.value,
        dog_friendly: createDogFriendly.value === 'on',
        bike_friendly: createBikeFriendly.value === 'on',
        difficulty: createDifficulty.value,
        description: createDescription.value
    }
    //api call
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };

    //validate success, reset form
    const data = await fetch('api/trails', requestOptions)
    .then(response => response.json())
    
    .catch(err => console.log(err));

    document.getElementById('create_trail_form').reset()

    //close modal
    console.log(data);
    closeAllModals();
    window.location.reload();
});

//function to close modals
const loginModal = document.getElementById('loginModal');
const createTrailModal = document.getElementById('addTrailModal');
const modals = document.querySelectorAll('.modal');

function closeAllModals () {
    modals.forEach( (modal) =>{
        modal.classList.remove('in');
    })
};

//Add Rating
const createRatingForm = document.getElementById('createRatingForm');
const ratingValue = createUserForm.querySelector('.star-rating__input');

createRatingForm.addEventListener('radio', async (e) => {
    e.preventDefault();
   
    //logic to get form data
    const formData = {
        rating: ratingValue.value,
    }
    //api call
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };
    console.log(requestOptions);
    //validate success -- need to figure out error handling
    const data = await fetch('api/rating/:id', requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data
    })
    .catch(err => console.log(err));
    console.log(data);
});