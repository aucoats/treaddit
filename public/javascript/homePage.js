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
const createImgRef = createTrailForm.querySelector('#file_submit');

createTrailForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    var formData = new FormData()
    formData.append('file', createImgRef.files[0])
    formData.append('name', createTrailName.value)
    formData.append('length', createTrailLength.value)
    formData.append('dog_friendly', createDogFriendly.value === 'on')
    formData.append('bike_friendly', createBikeFriendly.value === 'on')
    formData.append('difficulty', createDifficulty.value)
    formData.append('description', createDescription.value)

    //api call

    fetch('/api/trails', {
        method: 'POST', 
        body: formData
    })

    document.getElementById('create_trail_form').reset()

    //close modal
    console.log(data);
    closeAllModals();
    window.location.reload();
});

// logout function
async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
const logoutBtn = document.querySelector('#logout-btn')
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}

//function to close modals
const loginModal = document.getElementById('loginModal');
const createTrailModal = document.getElementById('addTrailModal');
const modals = document.querySelectorAll('.modal');

function closeAllModals () {
    modals.forEach( (modal) =>{
        modal.classList.remove('in');
    })
};

//add favorite trail

const favButton = document.querySelectorAll('.btn.favBtn');

favButton.forEach( (favorite) =>{

    favorite.addEventListener('click', async (e) => {
    e.preventDefault();

    const spanQuery = favorite.querySelector('span')
    console.log(spanQuery)
    const favData = {
        favorite: true,
        trail_id: favorite.id
    }
    console.log(favorite.id)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(favData)
    };

    const data = await fetch('api/favorites', requestOptions)
    .then(response => response.json())
    .catch(err => console.log(err));
    console.log(data);
    });

});

//get favorites

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("/api/favorites", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

//update favorite DB

//change button image
