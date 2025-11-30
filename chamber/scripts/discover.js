import businesses from 'data/businesses.json' assert { type: 'json' };

// Mobile navigation - FIXED VERSION
function setupMobileNav() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const primaryNav = document.getElementById('primary-nav');
    
    console.log('Hamburger button:', hamburgerBtn);
    console.log('Primary nav:', primaryNav);
    
    if (hamburgerBtn && primaryNav) {
        hamburgerBtn.addEventListener('click', () => {
            console.log('Hamburger clicked! Current display:', primaryNav.style.display);
            primaryNav.classList.toggle('show');
            // Update button text
            hamburgerBtn.textContent = primaryNav.classList.contains('show') ? '✕' : '☰';
        });
        
        // Close menu when clicking on links (mobile only)
        const navLinks = primaryNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 641) {
                    primaryNav.classList.remove('show');
                    hamburgerBtn.textContent = '☰';
                }
            });
        });
    } else {
        console.error('Navigation elements not found!');
    }
}

// localStorage for visit tracking
function displayVisitMessage() {
    const visitMessage = document.getElementById('visit-message');
    if (!visitMessage) {
        console.log('Visit message element not found');
        return;
    }
    
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();
    
    if (!lastVisit) {
        visitMessage.innerHTML = '<p>Welcome! Let us know if you have any questions.</p>';
    } else {
        const daysBetween = Math.floor((currentVisit - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        
        if (daysBetween < 1) {
            visitMessage.innerHTML = '<p>Back so soon! Awesome!</p>';
        } else if (daysBetween === 1) {
            visitMessage.innerHTML = '<p>You last visited 1 day ago.</p>';
        } else {
            visitMessage.innerHTML = `<p>You last visited ${daysBetween} days ago.</p>`;
        }
    }
    
    localStorage.setItem('lastVisit', currentVisit.toString());
}

// Build business cards from JSON data
function buildBusinessCards() {
    const container = document.querySelector('.business-cards');
    if (!container) {
        console.log('Business cards container not found');
        return;
    }
    
    console.log('Building business cards from:', businesses);
    
    businesses.forEach((business) => {
        const card = document.createElement('article');
        card.className = 'business-card';
        card.innerHTML = `
            <h2>${business.name}</h2>
            <figure>
                <img src="${business.image}" alt="${business.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${business.address}</address>
            <p>${business.description}</p>
            <button class="learn-more">Learn More</button>
        `;
        container.appendChild(card);
    });
}

// Initialize footer dates
function initializeFooter() {
    const currentYear = document.getElementById('currentyear');
    const lastModified = document.getElementById('last-modified');
    
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing scripts...');
    setupMobileNav();
    displayVisitMessage();
    buildBusinessCards();
    initializeFooter();
});