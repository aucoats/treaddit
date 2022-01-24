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
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data
    })
    .catch(err => console.log(err));

    document.getElementById('login_form').reset()

    // function to update the DOM
    console.log(data);
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

    //validate success -- need to figure out error handling
    const data = await fetch('api/users', requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data
    })
    .catch(err => console.log(err));

    document.getElementById('create_user_form').reset()

    // function to update the DOM
    console.log(data);
});