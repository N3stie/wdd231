// main.js - Main entry point with ES Modules
import { loadServices } from './services.js';
import { initContactForm } from './contact.js';
import { saveUserPreference, getUserPreference } from './utils.js';

// Initialize hamburger menu
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            // Animate hamburger to X
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && !e.target.closest('.hamburger')) {
                navMenu.classList.remove('show');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Set active navigation link
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Filter services by category
function initServiceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Save preference to localStorage
            saveUserPreference('serviceFilter', button.dataset.filter);
            
            // Filter services
            const filter = button.dataset.filter;
            const services = document.querySelectorAll('.service-card');
            
            services.forEach(service => {
                const category = service.dataset.category;
                if (filter === 'all' || category === filter) {
                    service.style.display = 'block';
                    setTimeout(() => {
                        service.style.opacity = '1';
                        service.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    service.style.opacity = '0';
                    service.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        service.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.close-modal');
    
    // Close modal on X click
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Paws & Play initialized');
    
    // Initialize hamburger menu
    initHamburgerMenu();
    
    // Set active navigation
    setActiveNav();
    
    // Initialize service filters if on services page
    if (window.location.pathname.includes('services.html')) {
        initServiceFilters();
        
        // Load saved filter preference
        const savedFilter = getUserPreference('serviceFilter');
        if (savedFilter) {
            const button = document.querySelector(`.filter-btn[data-filter="${savedFilter}"]`);
            if (button) button.click();
        }
        
        // Load services dynamically
        loadServices();
    }
    
    // Initialize modal if exists
    initModal();
    
    // Initialize contact form if on contact page
    if (window.location.pathname.includes('contact.html')) {
        initContactForm();
    }
    
    // Add fade-in animation to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
});

// Export for other modules if needed
export { initModal };