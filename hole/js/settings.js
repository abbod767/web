// DOM Elements
const settingsMenu = document.querySelector('.settings-menu');
const settingsSections = document.querySelectorAll('.settings-section');
const darkModeToggle = document.getElementById('darkModeToggle');
const userDisplayNames = document.querySelectorAll('.user-display-name');
const userEmail = document.querySelector('.user-email');

// Initialize Settings
function initializeSettings() {
    // Load user data
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        userDisplayNames.forEach(display => {
            display.textContent = user.username;
        });
    } else {
        window.location.href = '/index.html';
    }

    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
    }
}

// Handle Settings Menu Navigation
settingsMenu.addEventListener('click', (e) => {
    const menuItem = e.target.closest('li');
    if (!menuItem || menuItem.id === 'logoutBtn') return;

    // Update active menu item
    document.querySelectorAll('.settings-menu li').forEach(item => {
        item.classList.remove('active');
    });
    menuItem.classList.add('active');

    // Show corresponding section
    const sectionId = menuItem.dataset.section;
    settingsSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });
});

// Handle Dark Mode Toggle
if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', null);
        }
    });
}

// Initialize settings on page load
document.addEventListener('DOMContentLoaded', initializeSettings);
