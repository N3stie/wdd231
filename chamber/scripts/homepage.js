// DOM Elements
const hamburgerMenu = document.getElementById('hamburger-menu');
const navigation = document.getElementById('navigation');
const currentYear = document.getElementById('current-year');
const lastModified = document.getElementById('last-modified');
const currentTemp = document.getElementById('current-temp');
const currentDesc = document.getElementById('current-desc');
const forecastContainer = document.getElementById('forecast-container');
const spotlightContainer = document.getElementById('spotlight-container');

// Set current year and last modified date
currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

// Toggle mobile navigation
hamburgerMenu.addEventListener('click', () => {
    navigation.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
});

// Weather API Integration
async function fetchWeatherData() {
    // Replace with your actual API key and location
    const apiKey = 'YOUR_API_KEY';
    const city = 'YOUR_CITY';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === '200') {
            displayCurrentWeather(data);
            displayForecast(data);
        } else {
            throw new Error('Weather data not available');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        currentTemp.textContent = 'Weather data unavailable';
    }
}

function displayCurrentWeather(data) {
    const current = data.list[0];
    currentTemp.textContent = `Temperature: ${Math.round(current.main.temp)}°F`;
    currentDesc.textContent = `Conditions: ${current.weather[0].description}`;
}

function displayForecast(data) {
    // Clear previous forecast
    forecastContainer.innerHTML = '';
    
    // Get forecast for next 3 days (8 data points per day, so every 8th point)
    for (let i = 7; i <= 23; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <h4>${dayName}</h4>
            <p>${Math.round(forecast.main.temp)}°F</p>
            <p>${forecast.weather[0].description}</p>
        `;
        
        forecastContainer.appendChild(forecastDay);
    }
}

// Member Spotlight Functionality
async function fetchMemberData() {
    try {
        // Replace with your actual JSON data source
        const response = await fetch('data/members.json');
        const members = await response.json();
        
        displaySpotlights(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
        spotlightContainer.innerHTML = '<p>Member information currently unavailable</p>';
    }
}

function displaySpotlights(members) {
    // Filter for gold and silver members
    const eligibleMembers = members.filter(member => 
        member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
    );
    
    // Randomly select 2-3 members
    const numSpotlights = Math.min(Math.floor(Math.random() * 2) + 2, eligibleMembers.length);
    const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, numSpotlights);
    
    // Clear previous spotlights
    spotlightContainer.innerHTML = '';
    
    // Create spotlight cards
    selectedMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <span class="membership-level membership-${member.membershipLevel.toLowerCase()}">
                ${member.membershipLevel} Member
            </span>
        `;
        
        spotlightContainer.appendChild(card);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    fetchMemberData();
});