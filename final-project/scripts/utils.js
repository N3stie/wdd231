// utils.js - Utility functions and localStorage management

// Save user preference to localStorage
export function saveUserPreference(key, value) {
    try {
        localStorage.setItem(key, value);
        console.log(`Saved preference: ${key} = ${value}`);
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

// Get user preference from localStorage
export function getUserPreference(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Clear specific preference
export function clearUserPreference(key) {
    localStorage.removeItem(key);
}

// Clear all preferences
export function clearAllPreferences() {
    localStorage.clear();
    console.log('All preferences cleared');
}

// Get all saved preferences
export function getAllPreferences() {
    const preferences = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        preferences[key] = localStorage.getItem(key);
    }
    return preferences;
}

// Save form data as object
export function saveFormData(formId, data) {
    const key = `formData_${formId}`;
    saveUserPreference(key, JSON.stringify(data));
}

// Get form data
export function getFormData(formId) {
    const data = getUserPreference(`formData_${formId}`);
    return data ? JSON.parse(data) : null;
}

// Check if service was viewed
export function getLastViewedService() {
    const serviceId = getUserPreference('lastViewedService');
    const serviceName = getUserPreference('lastViewedServiceName');
    return { id: serviceId, name: serviceName };
}

// Track page visits
export function trackPageVisit(pageName) {
    const visits = JSON.parse(getUserPreference('pageVisits') || '{}');
    visits[pageName] = (visits[pageName] || 0) + 1;
    saveUserPreference('pageVisits', JSON.stringify(visits));
    return visits[pageName];
}

// Get page visit count
export function getPageVisits(pageName) {
    const visits = JSON.parse(getUserPreference('pageVisits') || '{}');
    return visits[pageName] || 0;
}

// Theme management (optional feature)
export function setTheme(theme) {
    saveUserPreference('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
}

export function getTheme() {
    return getUserPreference('theme') || 'light';
}

// Initialize theme on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const theme = getTheme();
        document.documentElement.setAttribute('data-theme', theme);
    });
}