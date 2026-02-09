document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const homeSection = document.getElementById('homeSection');
    const registerSection = document.getElementById('registerSection');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const cancelRegisterBtn = document.getElementById('cancelRegisterBtn');
    const registerForm = document.getElementById('registerForm');
    const verifyEmailSection = document.getElementById('verifyEmailSection');
    const loginSection = document.getElementById('loginSection');
    const verifyEmailDisplay = document.getElementById('verifyEmailDisplay');
    const simulateVerifyBtn = document.getElementById('simulateVerifyBtn');
    const goToLoginBtn = document.getElementById('goToLoginBtn');
    const verifiedAlert = document.getElementById('verifiedAlert');
    const cancelLoginBtn = document.getElementById('cancelLoginBtn');

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

    // Handle Register Form Submit
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('regEmail').value;
        
        // Store user data in localStorage
        const userData = {
            firstName: document.getElementById('regFirstName').value,
            lastName: document.getElementById('regLastName').value,
            email: email,
            password: document.getElementById('regPassword').value,
            verified: false
        };
        
        localStorage.setItem('pendingUser', JSON.stringify(userData));
        
        // Show verify email section
        registerSection.style.display = 'none';
        verifyEmailSection.style.display = 'block';
        verifyEmailDisplay.textContent = email;
        
        // Clear form
        registerForm.reset();
    });

    // Simulate Email Verification
    simulateVerifyBtn.addEventListener('click', () => {
        const userData = JSON.parse(localStorage.getItem('pendingUser'));
        userData.verified = true;
        
        // Save to users array
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem('pendingUser');
        
        // Show login section with success message
        verifyEmailSection.style.display = 'none';
        loginSection.style.display = 'block';
        verifiedAlert.style.display = 'block';
    });

    // Go to Login button
    goToLoginBtn.addEventListener('click', () => {
        verifyEmailSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Cancel Login button
    cancelLoginBtn.addEventListener('click', () => {
        loginSection.style.display = 'none';
        homeSection.style.display = 'block';
        verifiedAlert.style.display = 'none';
    });

    // Show Login Section from nav
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        homeSection.style.display = 'none';
        registerSection.style.display = 'none';
        verifyEmailSection.style.display = 'none';
        loginSection.style.display = 'block';
    });
});