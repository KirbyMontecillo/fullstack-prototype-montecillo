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
const departmentsSection = document.getElementById('departmentsSection');
const accountsSection = document.getElementById('accountsSection');
const departmentsLink = document.getElementById('departmentsLink');
const accountsLink = document.getElementById('accountsLink');
const addDepartmentBtn = document.getElementById('addDepartmentBtn');
const addAccountBtn = document.getElementById('addAccountBtn');
const departmentFormSection = document.getElementById('departmentFormSection');
const accountFormSection = document.getElementById('accountFormSection');
const cancelDepartmentBtn = document.getElementById('cancelDepartmentBtn');
const cancelAccountBtn = document.getElementById('cancelAccountBtn');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');

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

// Departments link click
departmentsLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    departmentsSection.style.display = 'block';
    loadDepartments();
});

// Accounts link click
accountsLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    accountsSection.style.display = 'block';
    loadAccounts();
});

// Add Department button
addDepartmentBtn.addEventListener('click', () => {
    departmentFormSection.style.display = 'block';
    document.getElementById('departmentFormTitle').textContent = 'Add Department';
    document.getElementById('departmentForm').reset();
});

// Cancel Department form
cancelDepartmentBtn.addEventListener('click', () => {
    departmentFormSection.style.display = 'none';
});

// Add Account button
addAccountBtn.addEventListener('click', () => {
    accountFormSection.style.display = 'block';
    document.getElementById('accountFormTitle').textContent = 'Add Account';
    document.getElementById('accountForm').reset();
});

// Cancel Account form
cancelAccountBtn.addEventListener('click', () => {
    accountFormSection.style.display = 'none';
});

// Load departments from localStorage
function loadDepartments() {
    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    const tbody = document.getElementById('departmentsTableBody');
    
    if (departments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="text-center text-muted">No departments.</td></tr>';
    } else {
        tbody.innerHTML = departments.map(dept => `
            <tr>
                <td>${dept.name}</td>
                <td>${dept.description}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editDepartment('${dept.name}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteDepartment('${dept.name}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }
}

// Load accounts from localStorage
function loadAccounts() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.getElementById('accountsTableBody');
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No accounts.</td></tr>';
    } else {
        tbody.innerHTML = users.map(user => `
            <tr>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.role || 'User'}</td>
                <td>${user.verified ? '✅' : '❌'}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editAccount('${user.email}')">Edit</button>
                    <button class="btn btn-sm btn-warning" onclick="resetAccountPassword('${user.email}')">Reset Password</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAccount('${user.email}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }
}

// Handle department form submit
document.getElementById('departmentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const department = {
        name: document.getElementById('deptName').value,
        description: document.getElementById('deptDescription').value
    };
    
    let departments = JSON.parse(localStorage.getItem('departments')) || [];
    departments.push(department);
    localStorage.setItem('departments', JSON.stringify(departments));
    
    departmentFormSection.style.display = 'none';
    loadDepartments();
});

// Handle account form submit
document.getElementById('accountForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const account = {
        firstName: document.getElementById('accFirstName').value,
        lastName: document.getElementById('accLastName').value,
        email: document.getElementById('accEmail').value,
        password: document.getElementById('accPassword').value,
        role: document.getElementById('accRole').value,
        verified: document.getElementById('accVerified').checked
    };
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const originalEmail = document.getElementById('accountForm').dataset.originalEmail;
    
    if (originalEmail) {
        // Edit existing account
        const userIndex = users.findIndex(u => u.email === originalEmail);
        if (userIndex !== -1) {
            users[userIndex] = account;
        }
        delete document.getElementById('accountForm').dataset.originalEmail;
    } else {
        // Add new account
        users.push(account);
    }
    
    localStorage.setItem('users', JSON.stringify(users));
    accountFormSection.style.display = 'none';
    document.getElementById('accountForm').reset();
    loadAccounts();
});

// Delete department (placeholder)
function deleteDepartment(name) {
    if (confirm(`Delete department "${name}"?`)) {
        let departments = JSON.parse(localStorage.getItem('departments')) || [];
        departments = departments.filter(d => d.name !== name);
        localStorage.setItem('departments', JSON.stringify(departments));
        loadDepartments();
    }
}

// Delete account (placeholder)
function deleteAccount(email) {
    if (confirm(`Delete account "${email}"?`)) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(users));
        loadAccounts();
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
    departmentsSection.style.display = 'none';
    departmentFormSection.style.display = 'none';
    accountsSection.style.display = 'none';
    accountFormSection.style.display = 'none';
}

// Edit account
function editAccount(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);
    
    if (user) {
        accountFormSection.style.display = 'block';
        document.getElementById('accountFormTitle').textContent = 'Edit Account';
        document.getElementById('accFirstName').value = user.firstName;
        document.getElementById('accLastName').value = user.lastName;
        document.getElementById('accEmail').value = user.email;
        document.getElementById('accPassword').value = user.password;
        document.getElementById('accRole').value = user.role || 'User';
        document.getElementById('accVerified').checked = user.verified;
        
        // Store original email for updating
        document.getElementById('accountForm').dataset.originalEmail = email;
    }
}

// Reset account password
function resetAccountPassword(email) {
    const newPassword = prompt('Enter new password for ' + email + ':');
    if (newPassword) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === email);
        
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Password reset successfully!');
            loadAccounts();
        }
    }
}

// Delete account
function deleteAccount(email) {
    if (confirm(`Delete account "${email}"?`)) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(users));
        loadAccounts();
    }
}

// Reset Password button in form
resetPasswordBtn.addEventListener('click', () => {
    const email = document.getElementById('accEmail').value;
    if (email) {
        resetAccountPassword(email);
        accountFormSection.style.display = 'none';
    } else {
        alert('Please fill in the email field first.');
    }
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