// contact.js - Contact form handling
import { saveUserPreference } from './utils.js';

// Initialize contact form
export function initContactForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;
    
    console.log('Initializing contact form...');
    
    // Load saved form data from localStorage
    loadSavedFormData(form);
    
    // Handle form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Save form data as user types
    form.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
            saveFormData(form);
        }
    });
    
    // Pre-fill service from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            // Try to find matching option
            for (let option of serviceSelect.options) {
                if (option.text.includes(serviceParam) || serviceParam.includes(option.value)) {
                    serviceSelect.value = option.value;
                    break;
                }
            }
        }
    }
}

// Handle form submission with async/await
async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Form submission started...');
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    
    try {
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Form data collected:', data);
        
        // Simulate API call with delay
        await simulateFormSubmission(data);
        
        // Save successful submission
        saveUserPreference('lastBooking', JSON.stringify(data));
        saveUserPreference('lastBookingTime', new Date().toISOString());
        
        // Clear saved form draft
        localStorage.removeItem('formDraft');
        
        // Create URL parameters
        const params = new URLSearchParams(data);
        
        // Add timestamp
        params.append('submitted', new Date().toISOString());
        
        // Redirect to form action page
        window.location.href = `form-action.html?${params.toString()}`;
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <p>⚠️ Failed to submit form. Please try again.</p>
            <p><small>Error: ${error.message}</small></p>
        `;
        
        form.insertBefore(errorDiv, form.firstChild);
        
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
}

// Simulate form submission (for demo purposes)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random failure (10% chance for demo)
            if (Math.random() < 0.1) {
                reject(new Error('Network error. Please check your connection.'));
            } else {
                resolve({ success: true, data });
            }
        }, 1000);
    });
}

// Save form data to localStorage
function saveFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    localStorage.setItem('formDraft', JSON.stringify(data));
    console.log('Form draft saved to localStorage');
}

// Load saved form data from localStorage
function loadSavedFormData(form) {
    const savedData = localStorage.getItem('formDraft');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            // Fill form fields
            Object.keys(data).forEach(key => {
                const element = form.querySelector(`[name="${key}"]`);
                if (element && data[key]) {
                    element.value = data[key];
                }
            });
            
            console.log('Loaded saved form data from localStorage');
            
        } catch (error) {
            console.error('Error loading saved form data:', error);
        }
    }
    
    // Load user preferences
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedName) {
        const nameField = form.querySelector('[name="name"]');
        if (nameField) nameField.value = savedName;
    }
    
    if (savedEmail) {
        const emailField = form.querySelector('[name="email"]');
        if (emailField) emailField.value = savedEmail;
    }
}

// Export for main.js
export { saveFormData, loadSavedFormData };