// services.js - Service data fetching and display
import { saveUserPreference } from './utils.js';

// Fetch services from JSON file
export async function loadServices() {
    const container = document.getElementById('services-container');
    if (!container) return;
    
    try {
        console.log('Fetching services data...');
        
        // Async fetch with try/catch block (REQUIRED FOR VIDEO DEMO)
        const response = await fetch('data/services.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const services = await response.json();
        console.log(`Successfully loaded ${services.length} services`);
        
        // Display services
        displayServices(services);
        
        // Save to localStorage
        localStorage.setItem('servicesData', JSON.stringify(services));
        localStorage.setItem('lastServiceFetch', new Date().toISOString());
        
        // Add event listeners for details buttons
        setTimeout(() => {
            initServiceDetails(services);
        }, 100);
        
    } catch (error) {
        console.error('Error loading services:', error);
        container.innerHTML = `
            <div class="error-message">
                <p>⚠️ Unable to load services at the moment.</p>
                <p>Please try again later or contact support.</p>
                <button onclick="location.reload()" class="btn">Retry</button>
            </div>
        `;
        
        // Try to load from localStorage as fallback
        const cachedData = localStorage.getItem('servicesData');
        if (cachedData) {
            console.log('Loading from cache...');
            displayServices(JSON.parse(cachedData));
        }
    }
}

// Display services using template literals and array methods
function displayServices(services) {
    const container = document.getElementById('services-container');
    if (!container || !services.length) return;
    
    console.log(`Displaying ${services.length} services`);
    
    // Using array method: map (REQUIRED)
    const servicesHTML = services.map(service => {
        // Template literal with multiple lines (REQUIRED)
        return `
            <div class="service-card fade-in" 
                 data-id="${service.id}" 
                 data-category="${service.category.toLowerCase()}">
                <h3>${service.icon} ${service.name}</h3>
                <p><strong>⏱️ Duration:</strong> ${service.duration}</p>
                <p><strong>💰 Price:</strong> ${service.price}</p>
                <p><strong>🏷️ Category:</strong> ${service.category}</p>
                <p><strong>🐕 Max Dogs:</strong> ${service.maxDogs}</p>
                ${service.popular ? '<span class="popular-badge">🔥 Popular</span>' : ''}
                <button class="btn details-btn" data-id="${service.id}">
                    View Details
                </button>
            </div>
        `;
    }).join(''); // Array method: join (REQUIRED)
    
    // DOM manipulation (REQUIRED)
    container.innerHTML = servicesHTML;
    
    // Add CSS for popular badge
    const style = document.createElement('style');
    style.textContent = `
        .popular-badge {
            display: inline-block;
            background: #ff6b6b;
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            margin-top: 0.5rem;
        }
        .error-message {
            text-align: center;
            padding: 2rem;
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 10px;
            color: #856404;
        }
    `;
    document.head.appendChild(style);
}

// Initialize service details modal
function initServiceDetails(services) {
    const detailButtons = document.querySelectorAll('.details-btn');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const serviceId = parseInt(e.target.dataset.id);
            const service = services.find(s => s.id === serviceId);
            
            if (service) {
                showServiceDetails(service);
                
                // Save to localStorage (REQUIRED)
                saveUserPreference('lastViewedService', serviceId.toString());
                saveUserPreference('lastViewedServiceName', service.name);
            }
        });
    });
}

// Show service details in modal
function showServiceDetails(service) {
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalContent) return;
    
    // Using template literal for complex HTML (REQUIRED)
    modalContent.innerHTML = `
        <h2>${service.icon} ${service.name}</h2>
        <p class="text-muted">${service.description}</p>
        
        <div class="service-details">
            <div class="detail-item">
                <strong>⏱️ Duration:</strong> ${service.duration}
            </div>
            <div class="detail-item">
                <strong>💰 Price:</strong> ${service.price}
            </div>
            <div class="detail-item">
                <strong>🏷️ Category:</strong> ${service.category}
            </div>
            <div class="detail-item">
                <strong>🐕 Suitable for Puppies:</strong> ${service.forPuppies ? 'Yes ✅' : 'No'}
            </div>
            <div class="detail-item">
                <strong>🐾 Max Dogs:</strong> ${service.maxDogs}
            </div>
            <div class="detail-item">
                <strong>⭐ Popular:</strong> ${service.popular ? 'Yes 🔥' : 'No'}
            </div>
        </div>
        
        <h3 class="mt-2">Features:</h3>
        <ul>
            ${service.features ? service.features.map(feature => 
                `<li>${feature}</li>`
            ).join('') : '<li>No specific features listed</li>'}
        </ul>
        
        <div class="modal-actions mt-3">
            <button onclick="window.location.href='contact.html?service=${encodeURIComponent(service.name)}'" 
                    class="btn">
                Book This Service
            </button>
        </div>
    `;
    
    // Add some CSS for details
    const detailsStyle = document.createElement('style');
    detailsStyle.textContent = `
        .service-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 1.5rem 0;
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 10px;
        }
        .detail-item {
            padding: 0.5rem;
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        @media (max-width: 768px) {
            .service-details {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(detailsStyle);
    
    // Show modal
    modal.classList.add('active');
}

// Export for main.js
export { showServiceDetails };