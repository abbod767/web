// Navigation Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.main-nav');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // Mobile Navigation Toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    nav.querySelector('.nav-container').prepend(mobileMenuBtn);

    mobileMenuBtn.addEventListener('click', () => {
        nav.querySelector('.nav-links').classList.toggle('nav-active');
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Form Validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Add form validation to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            alert('الرجاء ملء جميع الحقول المطلوبة');
        }
    });
});

// Animations on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
};

document.addEventListener('DOMContentLoaded', animateOnScroll);

// Dynamic Copyright Year
document.addEventListener('DOMContentLoaded', function() {
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2025', new Date().getFullYear());
    }
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Search Tabs
    const searchTabs = document.querySelectorAll('.search-tab');
    searchTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            searchTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Date Picker Enhancement
    const dateInputs = document.querySelectorAll('.date-picker');
    dateInputs.forEach(input => {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        input.setAttribute('min', today);
        
        // Add change event to ensure checkout date is after checkin
        if (dateInputs[0] === input) {
            input.addEventListener('change', () => {
                dateInputs[1].setAttribute('min', input.value);
                if (dateInputs[1].value && dateInputs[1].value < input.value) {
                    dateInputs[1].value = input.value;
                }
            });
        }
    });

    // Guest Picker Functionality
    const guestPicker = document.querySelector('.guest-picker');
    if (guestPicker) {
        guestPicker.addEventListener('click', () => {
            const popup = document.createElement('div');
            popup.className = 'guest-popup';
            popup.innerHTML = `
                
            `;
            
            document.body.appendChild(popup);
            
            // Position the popup
            const rect = guestPicker.getBoundingClientRect();
            popup.style.top = `${rect.bottom + window.scrollY}px`;
            popup.style.left = `${rect.left + window.scrollX}px`;
            
            // Handle counter buttons
            popup.addEventListener('click', (e) => {
                if (e.target.classList.contains('counter-btn')) {
                    const action = e.target.dataset.action;
                    const countEl = e.target.parentElement.querySelector('.count');
                    let count = parseInt(countEl.textContent);
                    
                    if (action === 'increase') {
                        count++;
                    } else if (action === 'decrease' && count > 0) {
                        count--;
                    }
                    
                    countEl.textContent = count;
                }
                
                if (e.target.classList.contains('apply-btn')) {
                    const adults = popup.querySelector('.guest-type:nth-child(1) .count').textContent;
                    const rooms = popup.querySelector('.guest-type:nth-child(3) .count').textContent;
                    guestPicker.querySelector('span').textContent = `${adults} بالغين، ${rooms} غرفة`;
                    popup.remove();
                }
            });
            
            // Close popup when clicking outside
            document.addEventListener('click', function closePopup(e) {
                if (!popup.contains(e.target) && !guestPicker.contains(e.target)) {
                    popup.remove();
                    document.removeEventListener('click', closePopup);
                }
            });
        });
    }

    // Search Form Submit
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your search logic here
            console.log('Search submitted');
        });
    }
});

// Package Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.packages-slider');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');

    if (slider && prevBtn && nextBtn) {
        const scrollAmount = 300; // Width of one card

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Show/hide scroll buttons based on scroll position
        slider.addEventListener('scroll', () => {
            const isAtStart = slider.scrollLeft === 0;
            const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1;

            prevBtn.style.opacity = isAtStart ? '0.5' : '1';
            prevBtn.style.cursor = isAtStart ? 'not-allowed' : 'pointer';
            
            nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
            nextBtn.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
        });

        // Initialize button states
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';
    }

    // Add hover effect to package cards
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            packageCards.forEach(c => c.style.opacity = '0.7');
            card.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            packageCards.forEach(c => c.style.opacity = '1');
        });
    });

    // Handle package booking buttons
    const bookButtons = document.querySelectorAll('.package-card .btn-primary');
    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.package-card');
            const packageTitle = card.querySelector('h3').textContent;
            const packagePrice = card.querySelector('.amount').textContent;
            
            // You can implement your booking logic here
            console.log(`Booking package: ${packageTitle} at ${packagePrice} SAR`);
            
            // For now, just redirect to the booking page
            window.location.href = 'pages/booking.html';
        });
    });
});

// Date Management
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ar-SA', options);
};

// Initialize date pickers with today and tomorrow as default values
document.addEventListener('DOMContentLoaded', function() {
    // Date picker initialization
    const checkInInput = document.querySelector('.search-input input[type="date"]:first-of-type');
    const checkOutInput = document.querySelector('.search-input input[type="date"]:last-of-type');
    
    if (checkInInput && checkOutInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        checkInInput.valueAsDate = today;
        checkOutInput.valueAsDate = tomorrow;

        // Ensure checkout date is always after checkin date
        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            const checkOutDate = new Date(checkOutInput.value);
            
            if (checkOutDate <= checkInDate) {
                const newCheckOutDate = new Date(checkInDate);
                newCheckOutDate.setDate(newCheckOutDate.getDate() + 1);
                checkOutInput.valueAsDate = newCheckOutDate;
            }
        });
    }

    // Guest picker functionality
    const guestPicker = document.querySelector('.guest-picker');
    const guestPopup = document.createElement('div');
    guestPopup.className = 'guest-popup';
    guestPopup.innerHTML = `
        <div class="guest-popup-content">
            <div class="guest-type">
                <div>
                    <h4>البالغين</h4>
                    <p>12+ سنة</p>
                </div>
                <div class="guest-counter">
                    <button class="counter-btn" data-action="decrease">-</button>
                    <span class="count" data-type="adults">2</span>
                    <button class="counter-btn" data-action="increase">+</button>
                </div>
            </div>
            <div class="guest-type">
                <div>
                    <h4>الأطفال</h4>
                    <p>2-11 سنة</p>
                </div>
                <div class="guest-counter">
                    <button class="counter-btn" data-action="decrease">-</button>
                    <span class="count" data-type="children">0</span>
                    <button class="counter-btn" data-action="increase">+</button>
                </div>
            </div>
            <div class="guest-type">
                <div>
                    <h4>الغرف</h4>
                </div>
                <div class="guest-counter">
                    <button class="counter-btn" data-action="decrease">-</button>
                    <span class="count" data-type="rooms">1</span>
                    <button class="counter-btn" data-action="increase">+</button>
                </div>
            </div>
            <button class="btn btn-primary apply-btn">تطبيق</button>
        </div>
    `;

    if (guestPicker) {
        document.body.appendChild(guestPopup);
        
        const updateGuestDisplay = () => {
            const adults = parseInt(guestPopup.querySelector('[data-type="adults"]').textContent);
            const children = parseInt(guestPopup.querySelector('[data-type="children"]').textContent);
            const rooms = parseInt(guestPopup.querySelector('[data-type="rooms"]').textContent);
            
            const guestText = `${adults} بالغ${adults > 2 ? '' : 'ين'}${children ? `، ${children} طفل` : ''}، ${rooms} غرفة`;
            guestPicker.querySelector('span').textContent = guestText;
        };

        // Toggle guest popup
        guestPicker.addEventListener('click', (e) => {
            e.stopPropagation();
            guestPopup.style.display = guestPopup.style.display === 'block' ? 'none' : 'block';
            const rect = guestPicker.getBoundingClientRect();
            guestPopup.style.top = `${rect.bottom + window.scrollY}px`;
            guestPopup.style.left = `${rect.left + window.scrollX}px`;
        });

        // Handle counter buttons
        guestPopup.addEventListener('click', (e) => {
            if (e.target.classList.contains('counter-btn')) {
                const action = e.target.dataset.action;
                const countElement = e.target.parentNode.querySelector('.count');
                let count = parseInt(countElement.textContent);
                
                if (action === 'increase') {
                    if (countElement.dataset.type === 'adults' && count < 8) count++;
                    if (countElement.dataset.type === 'children' && count < 6) count++;
                    if (countElement.dataset.type === 'rooms' && count < 4) count++;
                } else if (action === 'decrease') {
                    if (countElement.dataset.type === 'adults' && count > 1) count--;
                    if (countElement.dataset.type === 'children' && count > 0) count--;
                    if (countElement.dataset.type === 'rooms' && count > 1) count--;
                }
                
                countElement.textContent = count;
                updateGuestDisplay();
            }
        });

        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!guestPicker.contains(e.target) && !guestPopup.contains(e.target)) {
                guestPopup.style.display = 'none';
            }
        });

        // Apply button
        guestPopup.querySelector('.apply-btn').addEventListener('click', () => {
            updateGuestDisplay();
            guestPopup.style.display = 'none';
        });
    }

    // Search tabs functionality
    const searchTabs = document.querySelectorAll('.search-tab');
    searchTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            searchTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Category navigation
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Destination cards hover effect
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            destinationCards.forEach(c => {
                if (c !== card) c.style.opacity = '0.7';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            destinationCards.forEach(c => c.style.opacity = '1');
        });
    });

    // Deal cards functionality
    const dealCards = document.querySelectorAll('.deal-card');
    dealCards.forEach(card => {
        card.addEventListener('click', () => {
            // Navigate to deal detail page
            // window.location.href = `/deals/${card.dataset.dealId}`;
        });
    });

    // Search form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const destination = searchForm.querySelector('input[placeholder="ادخل اسم المنتجع أو المدينة"]').value;
            const checkIn = checkInInput.value;
            const checkOut = checkOutInput.value;
            const guests = guestPicker.querySelector('span').textContent;

            console.log('Search Parameters:', {
                destination,
                checkIn,
                checkOut,
                guests
            });

            // Implement search functionality here
            // window.location.href = `/search?destination=${encodeURIComponent(destination)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${encodeURIComponent(guests)}`;
        });
    }
});

// Dark Mode Functionality
function setDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Check dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        setDarkMode(true);
    }
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});
