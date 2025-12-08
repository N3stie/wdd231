// services.js - WORKING VERSION
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Loading services...');
    loadServices();
});

async function loadServices() {
    const container = document.getElementById('services-container');
    if (!container) {
        console.error('❌ No services-container found');
        return;
    }
    
    try {
        // Try to load from JSON
        const response = await fetch('./data/services.json');
        const services = await response.json();
        displayServices(services);
        
    } catch (error) {
        console.log('⚠️ Using hardcoded services');
        
        // Hardcoded services as fallback
        const services = [
            {id:1, name:"Solo Walk", duration:"30 min", price:"$25", category:"Basic", icon:"🐕", maxDogs:1, popular:true},
            {id:2, name:"Group Adventure", duration:"1 hour", price:"$35", category:"Premium", icon:"🐕🐕", maxDogs:6, popular:true},
            {id:3, name:"Puppy Visit", duration:"45 min", price:"$30", category:"Special", icon:"🐶", maxDogs:1, popular:false},
            {id:4, name:"Senior Care", duration:"30 min", price:"$28", category:"Special", icon:"🐩", maxDogs:1, popular:false},
            {id:5, name:"Weekend Hike", duration:"2 hours", price:"$50", category:"Premium", icon:"🏞️", maxDogs:4, popular:true},
            {id:6, name:"Potty Break", duration:"15 min", price:"$15", category:"Basic", icon:"⚡", maxDogs:1, popular:true},
            {id:7, name:"Training Walk", duration:"45 min", price:"$38", category:"Premium", icon:"🎓", maxDogs:1, popular:false},
            {id:8, name:"Beach Day", duration:"1.5 hours", price:"$45", category:"Premium", icon:"🏖️", maxDogs:3, popular:true},
            {id:9, name:"Evening Walk", duration:"30 min", price:"$25", category:"Basic", icon:"🌙", maxDogs:2, popular:false},
            {id:10, name:"Double Dogs", duration:"45 min", price:"$40", category:"Basic", icon:"🐕‍🦺🐕", maxDogs:2, popular:true},
            {id:11, name:"Medication Visit", duration:"20 min", price:"$20", category:"Special", icon:"💊", maxDogs:1, popular:false},
            {id:12, name:"Holiday Walk", duration:"1 hour", price:"$42", category:"Special", icon:"🎄", maxDogs:2, popular:false},
            {id:13, name:"Overnight Care", duration:"12 hours", price:"$85", category:"Premium", icon:"🌜", maxDogs:2, popular:false},
            {id:14, name:"Monthly Package", duration:"Varies", price:"$300", category:"Premium", icon:"📅", maxDogs:2, popular:true},
            {id:15, name:"Custom Service", duration:"Custom", price:"Quote", category:"Special", icon:"✨", maxDogs:"Custom", popular:false}
        ];
        
        displayServices(services);
    }
}

function displayServices(services) {
    const container = document.getElementById('services-container');
    
    const html = services.map(service => `
        <div class="service-card" data-category="${service.category.toLowerCase()}">
            <h3>${service.icon} ${service.name}</h3>
            <p><strong>Duration:</strong> ${service.duration}</p>
            <p><strong>Price:</strong> ${service.price}</p>
            <p><strong>Category:</strong> ${service.category}</p>
            <p><strong>Max Dogs:</strong> ${service.maxDogs}</p>
            <button class="btn" onclick="alert('Booking ${service.name}')">Book Now</button>
        </div>
    `).join('');
    
    container.innerHTML = html;
}