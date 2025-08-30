// Japan Student Living Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initMobileNavigation();
    initSmoothScrolling();
    initFormHandling();
    initSearchFunctionality();
    initScrollEffects();
    initPropertyCards();
    initCTAButtons();
}

// Mobile Navigation - Fixed
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't prevent default for navigation
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Fixed Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 70;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fixed CTA Button functionality
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.nav__cta, .btn--primary');
    
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Find Your Apartment') || button.textContent.includes('Start Your Journey')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 70;
                    const targetPosition = contactSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Focus on the first form field
                    setTimeout(() => {
                        const firstInput = contactSection.querySelector('input[type="text"]');
                        if (firstInput) {
                            firstInput.focus();
                        }
                    }, 500);
                }
            });
        }
    });
}

// Fixed Form Handling and Validation
function initFormHandling() {
    // Contact Form
    const contactForm = document.querySelector('.inquiry-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }

    // Search Form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSearchFormSubmission(this);
        });
    }

    // Fix select dropdown issues
    const selects = document.querySelectorAll('select.form-control');
    selects.forEach(select => {
        select.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        select.addEventListener('change', function() {
            this.classList.add('has-value');
        });
    });
}

function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Validate form
    const name = formData.get('name');
    const email = formData.get('email');
    
    if (!name || name.trim() === '') {
        showNotification('Please enter your full name.', 'error');
        resetButton(submitButton, originalText);
        return;
    }
    
    if (!email || email.trim() === '') {
        showNotification('Please enter your email address.', 'error');
        resetButton(submitButton, originalText);
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        resetButton(submitButton, originalText);
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for your inquiry! We will contact you within 24 hours.', 'success');
        form.reset();
        resetButton(submitButton, originalText);
        
        // Track successful submission
        trackEvent('contact_form_submit', {
            preferredLocation: formData.get('preferred-location'),
            hasMessage: !!formData.get('message')
        });
    }, 1500);
}

function resetButton(button, originalText) {
    button.textContent = originalText;
    button.disabled = false;
}

function handleSearchFormSubmission(form) {
    const formData = new FormData(form);
    const location = formData.get('location');
    const budget = formData.get('budget');
    const roomType = formData.get('room-type');
    
    // Build search query
    const searchParams = {
        location: location || '',
        budget: budget || '',
        roomType: roomType || ''
    };
    
    // Show search is happening
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Searching...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Filter properties based on search criteria
        filterProperties(searchParams);
        
        // Scroll to properties section
        const propertiesSection = document.querySelector('#properties');
        if (propertiesSection) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 70;
            const targetPosition = propertiesSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Show results message
        const hasFilters = location || budget || roomType;
        if (hasFilters) {
            showNotification('Search results filtered based on your criteria.', 'success');
        } else {
            showNotification('Showing all available properties.', 'info');
        }
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Track search
        trackEvent('property_search', searchParams);
    }, 1000);
}

// Fixed Search Functionality
function initSearchFunctionality() {
    // Property data for filtering
    const properties = [
        {
            id: 1,
            name: "Shibuya Premium Studio",
            location: "shibuya",
            price: 85000,
            type: "studio",
            element: null
        },
        {
            id: 2,
            name: "Shinjuku Student Loft",
            location: "shinjuku",
            price: 95000,
            type: "1k",
            element: null
        },
        {
            id: 3,
            name: "Harajuku Cozy Room",
            location: "harajuku",
            price: 78000,
            type: "studio",
            element: null
        }
    ];
    
    // Store property elements
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach((card, index) => {
        if (properties[index]) {
            properties[index].element = card;
        }
    });
    
    // Store properties globally for filtering
    window.propertyData = properties;
}

function filterProperties(searchParams) {
    const properties = window.propertyData || [];
    let visibleCount = 0;
    
    properties.forEach(property => {
        if (!property.element) return;
        
        let shouldShow = true;
        
        // Filter by location
        if (searchParams.location && searchParams.location !== property.location) {
            shouldShow = false;
        }
        
        // Filter by budget range
        if (searchParams.budget) {
            const budgetRange = searchParams.budget.split('-');
            const minBudget = parseInt(budgetRange[0]);
            const maxBudget = parseInt(budgetRange[1]);
            
            if (property.price < minBudget || property.price > maxBudget) {
                shouldShow = false;
            }
        }
        
        // Filter by room type
        if (searchParams.roomType && searchParams.roomType !== property.type) {
            shouldShow = false;
        }
        
        // Show/hide property card with animation
        if (shouldShow) {
            property.element.style.display = 'block';
            property.element.style.opacity = '0';
            setTimeout(() => {
                property.element.style.opacity = '1';
            }, 100);
            visibleCount++;
        } else {
            property.element.style.display = 'none';
        }
    });
    
    // Show message if no results
    if (visibleCount === 0) {
        showNotification('No properties match your search criteria. Try adjusting your filters.', 'info');
        // Reset all properties to show
        properties.forEach(property => {
            if (property.element) {
                property.element.style.display = 'block';
                property.element.style.opacity = '1';
            }
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(252, 252, 249, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(252, 252, 249, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Fixed Property Card Interactions
function initPropertyCards() {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach((card, index) => {
        const viewButton = card.querySelector('.property-card__btn');
        
        if (viewButton) {
            viewButton.addEventListener('click', function(e) {
                e.preventDefault();
                const propertyName = card.querySelector('.property-card__title').textContent;
                const propertyLocation = card.querySelector('.property-card__location').textContent;
                const propertyPrice = card.querySelector('.property-card__price').textContent;
                
                showPropertyDetails(propertyName, propertyLocation, propertyPrice);
                
                // Track property view
                trackEvent('property_view_details', {
                    propertyName: propertyName,
                    position: index + 1
                });
            });
        }
    });
}

function showPropertyDetails(propertyName, location, price) {
    showNotification(`🏠 ${propertyName} in ${location} - ${price}. Interested? Contact us below for viewing and application details!`, 'info');
    
    // Scroll to contact form after a short delay
    setTimeout(() => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 70;
            const targetPosition = contactSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Pre-fill the message field
            setTimeout(() => {
                const messageField = contactSection.querySelector('#message');
                if (messageField) {
                    messageField.value = `I'm interested in ${propertyName} in ${location}. Please provide more details and schedule a viewing.`;
                    messageField.focus();
                }
            }, 500);
        }
    }, 2000);
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fixed Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Set notification content
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" type="button">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const baseStyles = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        z-index: 1100;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        font-family: var(--font-family-base);
    `;
    
    notification.style.cssText = baseStyles;
    
    // Add type-specific styles
    if (type === 'success') {
        notification.style.borderColor = 'var(--color-success)';
        notification.style.backgroundColor = 'rgba(33, 128, 141, 0.05)';
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--color-error)';
        notification.style.backgroundColor = 'rgba(192, 21, 47, 0.05)';
    } else if (type === 'info') {
        notification.style.borderColor = 'var(--color-info)';
        notification.style.backgroundColor = 'rgba(98, 108, 113, 0.05)';
    }
    
    // Add animation styles if not already present
    ensureNotificationStyles();
    
    // Add to document
    document.body.appendChild(notification);
    
    // Handle close button
    const closeButton = notification.querySelector('.notification__close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            removeNotification(notification);
        });
    }
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            removeNotification(notification);
        }
    }, 6000);
}

function ensureNotificationStyles() {
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification__content {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: var(--space-12);
            }
            
            .notification__message {
                color: var(--color-text);
                font-size: var(--font-size-sm);
                line-height: 1.4;
                flex: 1;
            }
            
            .notification__close {
                background: none;
                border: none;
                font-size: var(--font-size-lg);
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s;
                flex-shrink: 0;
            }
            
            .notification__close:hover {
                background-color: var(--color-secondary);
                color: var(--color-text);
            }
        `;
        document.head.appendChild(style);
    }
}

function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Analytics tracking
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // In a real implementation, send to analytics service
}

// Initialize enhanced form interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add floating label effect to form inputs
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('.form-control');
        const label = group.querySelector('.form-label');
        
        if (input && label) {
            // Add focus/blur handlers for better UX
            input.addEventListener('focus', function() {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
            
            input.addEventListener('input', function() {
                if (input.value) {
                    group.classList.add('has-value');
                } else {
                    group.classList.remove('has-value');
                }
            });
            
            // Check initial state
            if (input.value) {
                group.classList.add('focused', 'has-value');
            }
        }
    });
});

// Enhanced card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.property-card, .district-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});