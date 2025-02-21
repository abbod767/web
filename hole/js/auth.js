// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const userMenu = document.querySelector('.user-menu');
const userNameDisplay = document.querySelector('.user-name');
const settingsBtn = document.querySelector('.settings-btn');
const logoutBtn = document.getElementById('logoutBtn');

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        showUserMenu(userData.username);
    }
}

// Show/Hide Login Modal with animation
function showModal() {
    loginModal.style.display = 'block';
    // Trigger reflow
    loginModal.offsetHeight;
    loginModal.classList.add('show');
}

function hideModal() {
    loginModal.classList.remove('show');
    setTimeout(() => {
        loginModal.style.display = 'none';
    }, 300); // Match the CSS transition duration
}

// Event Listeners
if (loginBtn) {
    loginBtn.addEventListener('click', showModal);
}

if (closeBtn) {
    closeBtn.addEventListener('click', hideModal);
}

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        hideModal();
    }
});

// Handle Login Form
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation (in real app, this would connect to a backend)
        if (username && password) {
            const userData = { username };
            localStorage.setItem('user', JSON.stringify(userData));
            showUserMenu(username);
            hideModal();
        }
    });
}

// Show User Menu
function showUserMenu(username) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (userMenu) {
        userMenu.classList.remove('hidden');
        userNameDisplay.textContent = username;
    }
}

// Settings Button Click
if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
        window.location.href = '/pages/settings.html';
    });
}

// Handle Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = '/index.html';
    });
}

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', checkAuth);
