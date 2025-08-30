// Enhanced Japan Student Living Website JavaScript - Fixed Navigation
// Multi-page SPA with animations and interactive features

// Application State
const AppState = {
    currentPage: 'home',
    isLoading: false,
    animations: {
        observers: [],
        counters: new Map(),
        testimonialIndex: 0,
        testimonialTimer: null
    },
    properties: [
        {
            id: 1,
            name: "Shibuya Premium Studio",
            location: "shibuya",
            district: "Shibuya",
            price: 85000,
            type: "studio",
            size: "25m²",
            floor: 8,
            availability: "Available Now",
            features: ["Fully Furnished", "High-Speed WiFi", "Air Conditioning", "24/7 Security", "Kitchen", "Washing Machine"],
            transport: ["2 min to Shibuya Station", "Direct access to JR Lines", "5 min to Harajuku"],
            universities: ["Kokugakuin University", "United Nations University"],
            amenities: ["Convenience Store", "Supermarket", "Restaurants", "Gym", "Library"],
            description: "Modern studio apartment in the heart of Shibuya, perfect for students who want to be at the center of Tokyo's vibrant culture.",
            rating: 4.8,
            reviews: 24
        },
        {
            id: 2,
            name: "Shinjuku Student Loft",
            location: "shinjuku",
            district: "Shinjuku", 
            price: 95000,
            type: "1k",
            size: "30m²",
            floor: 12,
            availability: "Available Dec 1",
            features: ["Loft Design", "Full Kitchen", "Washing Machine", "Air Conditioning", "High Ceilings", "City View"],
            transport: ["5 min to Shinjuku Station", "Access to all major lines", "Direct to Shibuya"],
            universities: ["Waseda University", "Tokyo Medical University"],
            amenities: ["Shopping Mall", "Restaurants", "Banks", "Post Office", "Pharmacy"],
            description: "Spacious loft-style apartment with modern amenities in Shinjuku's bustling business district.",
            rating: 4.9,
            reviews: 31
        },
        {
            id: 3,
            name: "Harajuku Cozy Room",
            location: "harajuku",
            district: "Harajuku",
            price: 78000,
            type: "studio",
            size: "22m²",
            floor: 6,
            availability: "Available Now",
            features: ["Designer Interior", "Smart Home Tech", "Gym Access", "Study Area", "High-Speed Internet"],
            transport: ["3 min to Harajuku Station", "1 stop to Shibuya", "Walking to Omotesando"],
            universities: ["Meiji University Campus", "Language Schools"],
            amenities: ["Trendy Cafes", "Fashion Boutiques", "Art Galleries", "Takeshita Street"],
            description: "Stylish studio in trendy Harajuku, perfect for creative students who love fashion and culture.",
            rating: 4.7,
            reviews: 18
        },
        {
            id: 4,
            name: "Ikebukuro Modern Flat",
            location: "ikebukuro",
            district: "Ikebukuro",
            price: 82000,
            type: "1k",
            size: "28m²",
            floor: 10,
            availability: "Available Jan 15",
            features: ["Modern Appliances", "Balcony", "Storage Space", "Parking Available", "Pet Friendly"],
            transport: ["7 min to Ikebukuro Station", "Direct to major universities", "Express lines available"],
            universities: ["Rikkyo University", "Tokyo University of Social Welfare"],
            amenities: ["Sunshine City", "Aquarium", "Planetarium", "Department Stores"],
            description: "Contemporary apartment with great transport links and entertainment options in vibrant Ikebukuro.",
            rating: 4.6,
            reviews: 22
        },
        {
            id: 5,
            name: "Ueno Cultural Hub",
            location: "ueno",
            district: "Ueno",
            price: 75000,
            type: "studio",
            size: "24m²",
            floor: 5,
            availability: "Available Now",
            features: ["Traditional Elements", "Modern Comfort", "Garden View", "Quiet Area", "Study Corner"],
            transport: ["10 min to Ueno Station", "Access to museums", "Direct to universities"],
            universities: ["Tokyo University of the Arts", "Tokyo Medical and Dental University"],
            amenities: ["Museums", "Ueno Park", "Zoo", "Traditional Restaurants"],
            description: "Peaceful studio near cultural attractions, ideal for students interested in arts and traditional Japanese culture.",
            rating: 4.8,
            reviews: 16
        },
        {
            id: 6,
            name: "Akihabara Tech Loft",
            location: "akihabara",
            district: "Akihabara",
            price: 88000,
            type: "1k",
            size: "26m²",
            floor: 14,
            availability: "Available Feb 1",
            features: ["High-Tech Setup", "Gaming Corner", "Fast Internet", "Smart Appliances", "Tech Support"],
            transport: ["5 min to Akihabara Station", "Tech district center", "Multiple train lines"],
            universities: ["Tokyo Denki University", "Digital Hollywood University"],
            amenities: ["Electronics Stores", "Gaming Centers", "Anime Culture", "Tech Cafes"],
            description: "Perfect for tech-savvy students in the heart of Japan's electronics and pop culture district.",
            rating: 4.9,
            reviews: 27
        }
    ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - Initializing Japan Student Living app...');
    initializeApp();
});

function initializeApp() {
    showLoadingScreen();
    
    // Initialize all components with delay
    setTimeout(() => {
        hideLoadingScreen();
        
        // Initialize core functionality
        initNavigation();
        initMobileMenu();
        initBackToTop();
        initScrollEffects();
        initScrollAnimations();
        initCounterAnimations();
        initTestimonialsCarousel();
        initFAQAccordion();
        initPropertyFilters();
        initPropertyModals();
        initContactForm();
        initSearchForm();
        
        // Populate properties grid
        populatePropertiesGrid();
        
        // Set initial page
        const hash = window.location.hash.slice(1) || 'home';
        navigateToPage(hash, false);
        
        console.log('✅ Japan Student Living app initialized successfully');
        
        // Test navigation after initialization
        setTimeout(() => {
            testNavigation();
        }, 500);
        
    }, 1500);
}

function testNavigation() {
    console.log('🔧 Testing navigation system...');
    
    // Test if navigation links exist and have proper attributes
    const navLinks = document.querySelectorAll('.nav__link');
    console.log(`Found ${navLinks.length} navigation links:`, Array.from(navLinks).map(link => ({
        text: link.textContent,
        href: link.getAttribute('href'),
        dataPage: link.getAttribute('data-page'),
        dataNavigate: link.getAttribute('data-navigate')
    })));
    
    const pages = document.querySelectorAll('.page');
    console.log(`Found ${pages.length} pages:`, Array.from(pages).map(page => page.id));
}

// Loading Screen Functions
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
        console.log('📱 Loading screen shown');
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
        console.log('📱 Loading screen hidden');
    }
}

// FIXED Navigation System
function initNavigation() {
    console.log('🧭 Initializing navigation system...');
    
    // Remove any existing listeners to prevent duplicates
    const existingHandler = window.navigationHandler;
    if (existingHandler) {
        document.removeEventListener('click', existingHandler);
    }
    
    // Create the navigation handler
    window.navigationHandler = function(e) {
        const target = e.target;
        const link = target.closest('a[href^="#"], [data-navigate], [data-page], .nav__link, .nav__brand');
        
        if (link) {
            e.preventDefault();
            
            let targetPage = null;
            
            // Determine target page
            if (link.classList.contains('nav__brand')) {
                targetPage = 'home';
            } else if (link.hasAttribute('data-navigate')) {
                targetPage = link.getAttribute('data-navigate');
            } else if (link.hasAttribute('data-page')) {
                targetPage = link.getAttribute('data-page');
            } else if (link.getAttribute('href')) {
                const href = link.getAttribute('href');
                if (href.startsWith('#') && href.length > 1) {
                    targetPage = href.slice(1);
                }
            }
            
            console.log(`🔗 Navigation clicked: ${link.textContent.trim()} -> ${targetPage}`);
            
            if (targetPage && targetPage !== '#' && targetPage !== '') {
                navigateToPage(targetPage);
                return true;
            }
        }
        
        // Handle buttons
        const button = target.closest('button');
        if (button) {
            handleButtonClick(button, e);
            return true;
        }
        
        return false;
    };
    
    // Add the navigation event listener
    document.addEventListener('click', window.navigationHandler);
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        const page = e.state?.page || window.location.hash.slice(1) || 'home';
        console.log(`🔙 Popstate: ${page}`);
        navigateToPage(page, false);
    });
    
    // Explicitly bind navigation links
    setTimeout(() => {
        bindNavigationLinks();
    }, 100);
    
    console.log('✅ Navigation system initialized');
}

function bindNavigationLinks() {
    // Main navigation links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const page = href ? href.slice(1) : null;
        
        if (page) {
            link.setAttribute('data-page', page);
            link.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Direct nav click: ${page}`);
                navigateToPage(page);
            });
        }
    });
    
    // Footer links
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        const page = href ? href.slice(1) : null;
        
        if (page) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Footer nav click: ${page}`);
                navigateToPage(page);
            });
        }
    });
    
    // Brand/logo click
    const brand = document.querySelector('.nav__brand');
    if (brand) {
        brand.style.cursor = 'pointer';
        brand.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Logo clicked -> home');
            navigateToPage('home');
        });
    }
    
    console.log('🔗 Navigation links bound successfully');
}

function navigateToPage(pageId, updateHistory = true) {
    console.log(`🧭 Navigating to: ${pageId}`);
    
    if (AppState.isLoading) {
        console.log('❌ Navigation blocked - already loading');
        return;
    }
    
    if (AppState.currentPage === pageId) {
        console.log('ℹ️ Already on page:', pageId);
        return;
    }
    
    AppState.isLoading = true;
    
    // Check if target page exists
    const targetPage = document.getElementById(pageId);
    if (!targetPage) {
        console.error(`❌ Page not found: ${pageId}`);
        AppState.isLoading = false;
        return;
    }
    
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    targetPage.classList.add('active');
    
    // Update navigation state
    updateNavigationState(pageId);
    
    // Update URL and history
    if (updateHistory) {
        history.pushState({ page: pageId }, '', `#${pageId}`);
    }
    
    // Update current page
    AppState.currentPage = pageId;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu
    closeMobileMenu();
    
    // Trigger page-specific animations and setup
    setTimeout(() => {
        triggerPageAnimations(pageId);
        AppState.isLoading = false;
    }, 100);
    
    console.log(`✅ Successfully navigated to: ${pageId}`);
}

function updateNavigationState(activePageId) {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page') || link.getAttribute('href')?.slice(1);
        if (linkPage === activePageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    console.log(`🎯 Navigation state updated for: ${activePageId}`);
}

// Handle Button Clicks
function handleButtonClick(button, event) {
    event.preventDefault();
    
    const classList = button.classList;
    const textContent = button.textContent.trim();
    
    console.log(`🔲 Button clicked: ${textContent}`);
    
    // Property detail buttons
    if (button.hasAttribute('data-property-id')) {
        const propertyId = parseInt(button.getAttribute('data-property-id'));
        showPropertyModal(propertyId);
        return;
    }
    
    // CTA buttons - Navigate to contact
    if (classList.contains('nav__cta') || textContent.includes('Find Your Apartment')) {
        console.log('CTA button clicked -> contact');
        navigateToPage('contact');
        setTimeout(() => {
            const nameField = document.getElementById('name');
            if (nameField) nameField.focus();
        }, 500);
        return;
    }
    
    // View All Properties button
    if (textContent.includes('View All Properties')) {
        console.log('View All Properties clicked -> properties');
        navigateToPage('properties');
        return;
    }
    
    // Back to top
    if (button.id === 'back-to-top') {
        console.log('Back to top clicked');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    // Search form submission
    if (button.type === 'submit' && button.closest('.search-form')) {
        console.log('Search form submitted');
        handleSearchFormSubmission(button.closest('form'));
        return;
    }
    
    // Contact form submission
    if (button.type === 'submit' && button.closest('#contact-form')) {
        console.log('Contact form submitted');
        handleContactFormSubmission(button.closest('form'));
        return;
    }
    
    // Property filters
    if (button.type === 'submit' && button.closest('#property-filters')) {
        console.log('Property filters applied');
        applyPropertyFilters();
        return;
    }
    
    // FAQ accordion
    if (classList.contains('faq-question')) {
        const faqItem = button.closest('.faq-item');
        const wasActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!wasActive) {
            faqItem.classList.add('active');
        }
        return;
    }
    
    // Modal close
    if (classList.contains('modal-close')) {
        closePropertyModal();
        return;
    }
    
    // Carousel controls
    if (classList.contains('carousel-btn')) {
        if (classList.contains('next')) {
            nextTestimonial();
        } else if (classList.contains('prev')) {
            prevTestimonial();
        }
        return;
    }
    
    // Reset filters button
    if (textContent.includes('Reset Filters')) {
        resetPropertyFilters();
        return;
    }
    
    console.log(`⚠️ Unhandled button: ${textContent}`);
}

// Mobile Menu
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
    
    console.log('📱 Mobile menu initialized');
}

function toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle?.classList.toggle('active');
    navMenu?.classList.toggle('active');
}

function closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle?.classList.remove('active');
    navMenu?.classList.remove('active');
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }
    
    console.log('⬆️ Back to top initialized');
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    console.log('📜 Scroll effects initialized');
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .slide-in-left, .slide-in-right, .floating'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
    
    AppState.animations.observers.push(observer);
    console.log('🎬 Scroll animations initialized');
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    AppState.animations.observers.push(counterObserver);
    console.log('🔢 Counter animations initialized');
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
    
    AppState.animations.counters.set(element, timer);
}

// Testimonials Carousel
function initTestimonialsCarousel() {
    const carousel = document.getElementById('testimonials-carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    
    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i === index) {
                slide.classList.add('active');
            } else if (i === AppState.animations.testimonialIndex) {
                slide.classList.add('prev');
            }
        });
        
        // Update dots
        const dots = dotsContainer?.querySelectorAll('.dot');
        dots?.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        AppState.animations.testimonialIndex = index;
    }
    
    // Global functions for carousel controls
    window.nextTestimonial = function() {
        goToSlide(AppState.animations.testimonialIndex + 1);
    };
    
    window.prevTestimonial = function() {
        goToSlide(AppState.animations.testimonialIndex - 1);
    };
    
    // Auto-advance
    function startAutoAdvance() {
        AppState.animations.testimonialTimer = setInterval(window.nextTestimonial, 5000);
    }
    
    function stopAutoAdvance() {
        if (AppState.animations.testimonialTimer) {
            clearInterval(AppState.animations.testimonialTimer);
            AppState.animations.testimonialTimer = null;
        }
    }
    
    startAutoAdvance();
    
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);
    
    console.log('🎠 Testimonials carousel initialized');
}

// FAQ Accordion
function initFAQAccordion() {
    console.log('❓ FAQ accordion initialized');
}

// Property Filters
function initPropertyFilters() {
    const priceMinSlider = document.getElementById('price-min');
    const priceMaxSlider = document.getElementById('price-max');
    const minValue = document.getElementById('min-value');
    const maxValue = document.getElementById('max-value');
    
    if (priceMinSlider && priceMaxSlider) {
        function updatePriceValues() {
            const min = parseInt(priceMinSlider.value);
            const max = parseInt(priceMaxSlider.value);
            
            if (min >= max) {
                priceMinSlider.value = max - 10000;
            }
            
            if (minValue) minValue.textContent = `¥${parseInt(priceMinSlider.value).toLocaleString()}`;
            if (maxValue) maxValue.textContent = `¥${parseInt(priceMaxSlider.value).toLocaleString()}`;
        }
        
        priceMinSlider.addEventListener('input', updatePriceValues);
        priceMaxSlider.addEventListener('input', updatePriceValues);
        updatePriceValues();
    }
    
    console.log('🔍 Property filters initialized');
}

function applyPropertyFilters() {
    const filterForm = document.getElementById('property-filters');
    if (!filterForm) return;
    
    const formData = new FormData(filterForm);
    const filters = {
        district: formData.get('district') || '',
        minPrice: parseInt(document.getElementById('price-min')?.value || 0),
        maxPrice: parseInt(document.getElementById('price-max')?.value || 200000)
    };
    
    const filteredProperties = AppState.properties.filter(property => {
        const districtMatch = !filters.district || property.location === filters.district;
        const priceMatch = property.price >= filters.minPrice && property.price <= filters.maxPrice;
        return districtMatch && priceMatch;
    });
    
    renderProperties(filteredProperties);
    
    const count = filteredProperties.length;
    showNotification(`Found ${count} propert${count === 1 ? 'y' : 'ies'} matching your criteria`, 'success');
}

function resetPropertyFilters() {
    const filterForm = document.getElementById('property-filters');
    if (filterForm) {
        filterForm.reset();
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        const minValue = document.getElementById('min-value');
        const maxValue = document.getElementById('max-value');
        
        if (priceMin) priceMin.value = 70000;
        if (priceMax) priceMax.value = 100000;
        if (minValue) minValue.textContent = '¥70,000';
        if (maxValue) maxValue.textContent = '¥100,000';
    }
    renderProperties(AppState.properties);
    showNotification('Filters reset. Showing all properties.', 'info');
}

// Property Grid
function populatePropertiesGrid() {
    renderProperties(AppState.properties);
    console.log('🏠 Properties grid populated');
}

function renderProperties(properties) {
    const grid = document.getElementById('properties-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (properties.length === 0) {
        grid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria</p>
                <button class="btn btn--primary">Reset Filters</button>
            </div>
        `;
        return;
    }
    
    properties.forEach((property, index) => {
        const propertyCard = createPropertyCard(property, index);
        grid.appendChild(propertyCard);
    });
}

function createPropertyCard(property, index) {
    const card = document.createElement('div');
    card.className = 'property-card floating';
    card.setAttribute('data-delay', (index * 100).toString());
    
    card.innerHTML = `
        <div class="property-card__image">
            <div class="property-badge">${property.availability}</div>
            <div class="placeholder-image">🏢</div>
        </div>
        <div class="property-card__content">
            <h3 class="property-card__title">${property.name}</h3>
            <p class="property-card__location">${property.district}, Tokyo</p>
            <div class="property-card__price">¥${property.price.toLocaleString()}/month</div>
            <div class="property-card__details">
                <span class="property-detail">${property.type.toUpperCase()} • ${property.size}</span>
            </div>
            <div class="property-card__features">
                ${property.features.slice(0, 3).map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <div class="property-card__transport">🚇 ${property.transport[0]}</div>
            <button class="btn btn--outline property-card__btn" data-property-id="${property.id}">View Details</button>
        </div>
    `;
    
    return card;
}

// Property Modals
function initPropertyModals() {
    const modal = document.getElementById('property-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    
    modalOverlay?.addEventListener('click', closePropertyModal);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closePropertyModal();
        }
    });
    
    console.log('🖼️ Property modals initialized');
}

function showPropertyModal(propertyId) {
    console.log(`🏠 Showing property modal for ID: ${propertyId}`);
    
    const property = AppState.properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const modal = document.getElementById('property-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = createPropertyDetailContent(property);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    trackEvent('property_modal_view', { propertyId, propertyName: property.name });
}

function closePropertyModal() {
    const modal = document.getElementById('property-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function createPropertyDetailContent(property) {
    return `
        <div class="property-detail" style="padding: 2rem;">
            <div class="property-detail__header" style="margin-bottom: 2rem; text-align: center;">
                <h2 style="margin-bottom: 0.5rem;">${property.name}</h2>
                <div class="property-price" style="font-size: 1.5rem; color: var(--color-primary); font-weight: bold; margin-bottom: 0.5rem;">¥${property.price.toLocaleString()}/month</div>
                <div class="property-location" style="color: var(--color-text-secondary);">${property.district}, Tokyo</div>
            </div>
            
            <div class="property-detail__content">
                <div class="property-specs" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div class="spec-item"><strong>Type:</strong> ${property.type.toUpperCase()}</div>
                    <div class="spec-item"><strong>Size:</strong> ${property.size}</div>
                    <div class="spec-item"><strong>Floor:</strong> ${property.floor}F</div>
                    <div class="spec-item"><strong>Availability:</strong> ${property.availability}</div>
                    <div class="spec-item"><strong>Rating:</strong> ⭐ ${property.rating} (${property.reviews} reviews)</div>
                </div>
                
                <div class="property-description" style="margin-bottom: 2rem;">
                    <h3>Description</h3>
                    <p>${property.description}</p>
                </div>
                
                <div class="property-features" style="margin-bottom: 2rem;">
                    <h3>Features</h3>
                    <div class="features-grid" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${property.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                </div>
                
                <div class="property-transport" style="margin-bottom: 2rem;">
                    <h3>Transportation</h3>
                    <ul>
                        ${property.transport.map(item => `<li>🚇 ${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="property-universities" style="margin-bottom: 2rem;">
                    <h3>Nearby Universities</h3>
                    <ul>
                        ${property.universities.map(uni => `<li>🎓 ${uni}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="property-amenities" style="margin-bottom: 2rem;">
                    <h3>Local Amenities</h3>
                    <div class="amenities-grid" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${property.amenities.map(amenity => `<span class="amenity-tag" style="background: var(--color-bg-4); color: var(--color-text); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">${amenity}</span>`).join('')}
                    </div>
                </div>
                
                <div class="property-actions" style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn btn--primary" onclick="inquireAboutProperty(${property.id})">Inquire Now</button>
                    <button class="btn btn--outline" onclick="scheduleViewing(${property.id})">Schedule Viewing</button>
                </div>
            </div>
        </div>
    `;
}

// Global property action functions
window.inquireAboutProperty = function(propertyId) {
    const property = AppState.properties.find(p => p.id === propertyId);
    closePropertyModal();
    navigateToPage('contact');
    
    setTimeout(() => {
        const messageField = document.getElementById('message');
        if (messageField && property) {
            messageField.value = `I'm interested in ${property.name} in ${property.district}. Please provide more information and availability details.`;
            messageField.focus();
        }
    }, 500);
    
    trackEvent('property_inquiry', { propertyId, propertyName: property?.name });
};

window.scheduleViewing = function(propertyId) {
    const property = AppState.properties.find(p => p.id === propertyId);
    showNotification(`📅 Viewing scheduled for ${property?.name}. We'll contact you within 24 hours to confirm.`, 'success');
    closePropertyModal();
    
    trackEvent('property_viewing_scheduled', { propertyId, propertyName: property?.name });
};

// Search Form
function initSearchForm() {
    console.log('🔍 Search form initialized');
}

function handleSearchFormSubmission(form) {
    console.log('🔍 Handling search form submission');
    
    const formData = new FormData(form);
    const searchParams = {
        location: formData.get('location'),
        budget: formData.get('budget'),
        roomType: formData.get('room-type')
    };
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Searching...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        let filteredProperties = AppState.properties;
        
        if (searchParams.location) {
            filteredProperties = filteredProperties.filter(p => p.location === searchParams.location);
        }
        
        if (searchParams.roomType) {
            filteredProperties = filteredProperties.filter(p => p.type === searchParams.roomType);
        }
        
        if (searchParams.budget) {
            const [min, max] = searchParams.budget.split('-').map(Number);
            filteredProperties = filteredProperties.filter(p => p.price >= min && p.price <= max);
        }
        
        navigateToPage('properties');
        
        setTimeout(() => {
            renderProperties(filteredProperties);
            const count = filteredProperties.length;
            showNotification(`Found ${count} propert${count === 1 ? 'y' : 'ies'} matching your search`, 'success');
        }, 300);
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        trackEvent('property_search', searchParams);
    }, 1000);
}

// Contact Form
function initContactForm() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('.form-control');
        
        if (input) {
            input.addEventListener('focus', () => group.classList.add('focused'));
            input.addEventListener('blur', () => {
                if (!input.value) group.classList.remove('focused');
            });
            input.addEventListener('input', () => {
                group.classList.toggle('has-value', !!input.value);
            });
        }
    });
    
    console.log('📧 Contact form initialized');
}

function handleContactFormSubmission(form) {
    console.log('📧 Handling contact form submission');
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    
    if (!name) {
        showNotification('Please enter your full name.', 'error');
        return;
    }
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your inquiry! We will contact you within 24 hours.', 'success');
        form.reset();
        
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('focused', 'has-value');
        });
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        trackEvent('contact_form_submit', {
            preferredLocation: formData.get('preferred-location'),
            nationality: formData.get('nationality'),
            hasMessage: !!formData.get('message')
        });
    }, 2000);
}

// Page Animations
function triggerPageAnimations(pageId) {
    const page = document.getElementById(pageId);
    if (!page) return;
    
    const animatedElements = page.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .slide-in-left, .slide-in-right');
    
    animatedElements.forEach((element, index) => {
        element.style.animation = 'none';
        element.style.opacity = '0';
        element.style.transform = getInitialTransform(element);
        
        setTimeout(() => {
            element.style.animation = '';
            element.style.animationDelay = `${index * 100}ms`;
        }, 50);
    });
    
    // Page-specific setup
    if (pageId === 'properties' && document.getElementById('properties-grid').children.length === 0) {
        populatePropertiesGrid();
    }
    
    if (pageId === 'community') {
        initTestimonialsCarousel();
    }
}

function getInitialTransform(element) {
    if (element.classList.contains('fade-in-up')) return 'translateY(30px)';
    if (element.classList.contains('fade-in-left')) return 'translateX(-30px)';
    if (element.classList.contains('fade-in-right')) return 'translateX(30px)';
    if (element.classList.contains('slide-in-left')) return 'translateX(-100px)';
    if (element.classList.contains('slide-in-right')) return 'translateX(100px)';
    return 'none';
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function trackEvent(eventName, properties = {}) {
    console.log(`📊 Event tracked: ${eventName}`, properties);
}

// Notification System
function showNotification(message, type = 'info') {
    const existing = document.querySelectorAll('.notification');
    existing.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-base)',
        padding: 'var(--space-16)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '1100',
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease-out'
    });
    
    const colors = {
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)'
    };
    
    notification.style.borderColor = colors[type] || colors.info;
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
    
    setTimeout(() => removeNotification(notification), 5000);
}

function removeNotification(notification) {
    if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    }
}

// Add notification styles
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-12);
        }
        .notification__message {
            color: var(--color-text);
            font-size: var(--font-size-sm);
            line-height: 1.4;
        }
        .notification__close {
            background: none;
            border: none;
            font-size: var(--font-size-lg);
            cursor: pointer;
            color: var(--color-text-secondary);
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
        }
        .notification__close:hover {
            background: var(--color-secondary);
            color: var(--color-text);
        }
    `;
    document.head.appendChild(style);
}

console.log('🎉 Japan Student Living Enhanced App Ready! 🏠✨');