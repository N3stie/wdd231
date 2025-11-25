// Enhanced join.js with responsive considerations
const membershipLevels = [
    // ... same membership data as before ...
];

// DOM Elements
const cardsContainer = document.querySelector('.cards-container');
const modal = document.getElementById('benefitsModal');
const joinForm = document.getElementById('joinForm');
const timestampField = document.getElementById('formTimestamp');

// Responsive breakpoint
const MOBILE_BREAKPOINT = 768;

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    initializeJoinPage();
});

function initializeJoinPage() {
    createMembershipCards();
    setupModal();
    setupForm();
    setupAnimations();
    setCurrentYear();
    setupResponsiveFeatures();
}

function setupResponsiveFeatures() {
    // Adjust card layout based on screen size
    function handleResize() {
        const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
        cardsContainer.style.gridTemplateColumns = isMobile ? 
            '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))';
    }

    // Initial check
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
}

function createMembershipCards() {
    membershipLevels.forEach((level, index) => {
        const card = document.createElement('div');
        card.className = `membership-card ${level.level.toLowerCase()} fade-in-up`;
        card.dataset.level = level.level;
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <h3>${level.name}</h3>
            <div class="price">${level.price}</div>
            <p class="description">${level.description}</p>
            <button class="benefits-btn" data-level="${level.level}">View Benefits</button>
        `;
        
        cardsContainer.appendChild(card);
    });
}

function setupModal() {
    // Enhanced modal for mobile
    function adjustModalForMobile() {
        const modalContent = document.querySelector('.modal-content');
        if (window.innerWidth <= MOBILE_BREAKPOINT) {
            modalContent.style.width = '95%';
            modalContent.style.margin = '1rem';
            modalContent.style.maxHeight = '85vh';
        } else {
            modalContent.style.width = '';
            modalContent.style.margin = '';
            modalContent.style.maxHeight = '80vh';
        }
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeBenefitsModal();
        }
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('benefits-btn')) {
            const level = e.target.dataset.level;
            showBenefitsModal(level);
            adjustModalForMobile();
        }
    });

    // Adjust modal on resize
    window.addEventListener('resize', adjustModalForMobile);
}

// ... rest of the JavaScript functions remain the same ...