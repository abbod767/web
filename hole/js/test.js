// Function to test all links and buttons
document.addEventListener('DOMContentLoaded', function() {
    // Test navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#') {
            console.warn('Warning: Navigation link without proper href:', link.textContent);
        }
    });

    // Test search functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        console.log('Testing search form...');
        const searchInput = searchForm.querySelector('input[type="text"]');
        const dateInputs = searchForm.querySelectorAll('input[type="date"]');
        const guestPicker = searchForm.querySelector('.guest-picker');
        
        if (!searchInput) console.error('Missing search input field');
        if (dateInputs.length !== 2) console.error('Missing date input fields');
        if (!guestPicker) console.error('Missing guest picker');
    } else {
        console.error('Search form not found');
    }

    // Test category navigation
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        if (!item.querySelector('img')) {
            console.error('Category item missing image:', item.textContent);
        }
    });

    // Test deal cards
    const dealCards = document.querySelectorAll('.deal-card');
    dealCards.forEach(card => {
        const img = card.querySelector('img');
        const price = card.querySelector('.price');
        const discount = card.querySelector('.discount');
        
        if (!img) console.error('Deal card missing image');
        if (!price) console.error('Deal card missing price');
        if (!discount) console.error('Deal card missing discount tag');
    });

    // Test package cards
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        const img = card.querySelector('img');
        const title = card.querySelector('h3');
        const price = card.querySelector('.price');
        
        if (!img) console.error('Package card missing image');
        if (!title) console.error('Package card missing title');
        if (!price) console.error('Package card missing price');
    });

    // Test app download section
    const appDownload = document.querySelector('.app-download');
    if (appDownload) {
        const qrCode = appDownload.querySelector('.qr-code img');
        const appButtons = appDownload.querySelectorAll('.app-button');
        
        if (!qrCode) console.error('Missing QR code');
        if (appButtons.length !== 2) console.error('Missing app store buttons');
    }

    // Test footer links
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        if (link.getAttribute('href') === '#') {
            console.warn('Warning: Footer link without proper href:', link.textContent);
        }
    });

    console.log('Website testing completed!');
});
