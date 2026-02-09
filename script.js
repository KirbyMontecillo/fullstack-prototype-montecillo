// Get elements
const homeSection = document.getElementById('homeSection');
const registerSection = document.getElementById('registerSection');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const getStartedBtn = document.getElementById('getStartedBtn');
const cancelRegisterBtn = document.getElementById('cancelRegisterBtn');

// Show Register Section
registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    homeSection.style.display = 'none';
    registerSection.style.display = 'block';
});

// Show Home Section (Cancel button)
cancelRegisterBtn.addEventListener('click', () => {
    registerSection.style.display = 'none';
    homeSection.style.display = 'block';
});

// Get Started button (can also go to register)
getStartedBtn.addEventListener('click', () => {
    homeSection.style.display = 'none';
    registerSection.style.display = 'block';
});