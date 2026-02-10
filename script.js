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
const navLoggedIn = document.getElementById('navLoggedIn');
const navNotLoggedIn = document.getElementById('navNotLoggedIn');
const usernameDisplay = document.getElementById('usernameDisplay');
const profileSection = document.getElementById('profileSection');
const employeesSection = document.getElementById('employeesSection');
const profileLink = document.getElementById('profileLink');
const employeesLink = document.getElementById('employeesLink');
const logoutLink = document.getElementById('logoutLink');
const loginForm = document.getElementById('loginForm');
const addEmployeeBtn = document.getElementById('addEmployeeBtn');
const employeeFormSection = document.getElementById('employeeFormSection');
const cancelEmployeeBtn = document.getElementById('cancelEmployeeBtn');

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
    
    // Store user data in localStorage (you can expand this later)
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

// Handle Login Form Submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password && u.verified);
    
    if (user) {
        // Store logged in user
        const loggedInUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: email.includes('admin') ? 'Admin' : 'User' // Simple role assignment
        };
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        
        // Update UI
        showLoggedInNav(loggedInUser);
        loginSection.style.display = 'none';
        profileSection.style.display = 'block';
        updateProfileDisplay(loggedInUser);
        
        loginForm.reset();
    } else {
        alert('Invalid email or password, or email not verified.');
    }
});

// Show logged in navigation
function showLoggedInNav(user) {
    navNotLoggedIn.setAttribute('style', 'display: none !important');
    navLoggedIn.setAttribute('style', 'display: block !important');
    usernameDisplay.textContent = user.firstName || 'Admin';

    // Show/hide admin links based on role
    const adminLinks = document.querySelectorAll('.role-admin');
    adminLinks.forEach(link => {
        link.style.display = user.role === 'Admin' ? 'block' : 'none';
    });
}

// Update profile display
function updateProfileDisplay(user) {
    document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileRole').textContent = user.role;
}

// Profile link click
profileLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    profileSection.style.display = 'block';
});

// Employees link click
employeesLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    employeesSection.style.display = 'block';
    loadEmployees();
});

// Logout
logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('loggedInUser');
    navLoggedIn.style.display = 'none';
    navNotLoggedIn.style.display = 'flex';
    hideAllSections();
    homeSection.style.display = 'block';
});

// Add Employee button
addEmployeeBtn.addEventListener('click', () => {
    employeeFormSection.style.display = 'block';
    document.getElementById('employeeFormTitle').textContent = 'Add Employee';
    document.getElementById('employeeForm').reset();
});

// Cancel Employee form
cancelEmployeeBtn.addEventListener('click', () => {
    employeeFormSection.style.display = 'none';
});

// Load employees from localStorage
function loadEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const tbody = document.getElementById('employeesTableBody');
    
    if (employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No employees.</td></tr>';
    } else {
        tbody.innerHTML = employees.map(emp => `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.email}</td>
                <td>${emp.position}</td>
                <td>${emp.department}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editEmployee('${emp.id}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteEmployee('${emp.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }
}

// Hide all sections helper
function hideAllSections() {
    homeSection.style.display = 'none';
    registerSection.style.display = 'none';
    verifyEmailSection.style.display = 'none';
    loginSection.style.display = 'none';
    profileSection.style.display = 'none';
    employeesSection.style.display = 'none';
    employeeFormSection.style.display = 'none';
}

// Handle employee form submit
document.getElementById('employeeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const employee = {
        id: document.getElementById('empId').value,
        email: document.getElementById('empEmail').value,
        position: document.getElementById('empPosition').value,
        department: document.getElementById('empDepartment').value,
        hireDate: document.getElementById('empHireDate').value
    };
    
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
    
    employeeFormSection.style.display = 'none';
    loadEmployees();
});


// Check if user is already logged in on page load
window.addEventListener('load', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        showLoggedInNav(loggedInUser);
        updateProfileDisplay(loggedInUser);
        hideAllSections();
        profileSection.style.display = 'block';
    }
});