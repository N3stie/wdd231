// Async function to fetch member data
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.error('Error fetching member data:', error);
        // Return fallback data if fetch fails
        return getFallbackMembers();
    }
}

// Fallback member data in case JSON file is unavailable
function getFallbackMembers() {
    return [
        {
            name: "Downtown Cafe",
            address: "123 Main Street, Springfield, IL 62701",
            phone: "(555) 123-4567",
            website: "https://downtowncafe.example.com",
            image: "cafe.jpg",
            membershipLevel: 3,
            description: "Family-owned coffee shop serving premium coffee and pastries since 1998.",
            category: "Food & Beverage"
        },
        {
            name: "Tech Solutions Inc",
            address: "456 Tech Park Drive, Springfield, IL 62702",
            phone: "(555) 234-5678",
            website: "https://techsolutions.example.com",
            image: "tech-company.jpg",
            membershipLevel: 2,
            description: "Complete IT services including network setup, cybersecurity, and cloud solutions.",
            category: "Technology"
        },
        {
            name: "Green Thumb Nursery",
            address: "789 Garden Lane, Springfield, IL 62703",
            phone: "(555) 345-6789",
            website: "https://greenthumb.example.com",
            image: "nursery.jpg",
            membershipLevel: 3,
            description: "Full-service garden center with plants, trees, and landscaping services.",
            category: "Home & Garden"
        },
        {
            name: "Family Medical Center",
            address: "321 Health Avenue, Springfield, IL 62704",
            phone: "(555) 456-7890",
            website: "https://familymedical.example.com",
            image: "medical-center.jpg",
            membershipLevel: 1,
            description: "Comprehensive healthcare services for the entire family.",
            category: "Healthcare"
        },
        {
            name: "Fit Life Gym",
            address: "654 Fitness Road, Springfield, IL 62705",
            phone: "(555) 567-8901",
            website: "https://fitlife.example.com",
            image: "gym.jpg",
            membershipLevel: 2,
            description: "State-of-the-art fitness facility with personal training and group classes.",
            category: "Fitness"
        },
        {
            name: "Book Nook",
            address: "987 Library Street, Springfield, IL 62706",
            phone: "(555) 678-9012",
            website: "https://booknook.example.com",
            image: "bookstore.jpg",
            membershipLevel: 1,
            description: "Independent bookstore featuring local authors and community events.",
            category: "Retail"
        },
        {
            name: "Auto Care Plus",
            address: "147 Garage Lane, Springfield, IL 62707",
            phone: "(555) 789-0123",
            website: "https://autocare.example.com",
            image: "auto-shop.jpg",
            membershipLevel: 3,
            description: "Complete automotive repair and maintenance services.",
            category: "Automotive"
        }
    ];
}

// Helper function to get membership level name
function getMembershipLevelName(level) {
    switch(level) {
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        default: return "Member";
    }
}

// Helper function to get icon based on category
function getCategoryIcon(category) {
    const icons = {
        "Food & Beverage": "☕",
        "Technology": "💻",
        "Home & Garden": "🌿",
        "Healthcare": "🏥",
        "Fitness": "💪",
        "Retail": "🛍️",
        "Automotive": "🔧",
        "Professional Services": "⚖️"
    };
    return icons[category] || "🏢";
}

// Display members in grid view
function displayMembersGrid(members) {
    const container = document.getElementById('member-container');
    container.innerHTML = '';
    container.className = 'member-container grid-view';
    
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.innerHTML = `
            <div class="member-image">
                ${getCategoryIcon(member.category)}
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="member-category">${member.category}</p>
                <p class="member-address">${member.address}</p>
                <p class="member-phone">${member.phone}</p>
                <p class="member-description">${member.description}</p>
                <a href="${member.website}" target="_blank" rel="noopener" class="member-website">Visit Website</a>
                <span class="membership-level ${getMembershipLevelName(member.membershipLevel).toLowerCase()}">
                    ${getMembershipLevelName(member.membershipLevel)} Member
                </span>
            </div>
        `;
        container.appendChild(memberCard);
    });
}

// Display members in list view
function displayMembersList(members) {
    const container = document.getElementById('member-container');
    container.innerHTML = '';
    container.className = 'member-container list-view';
    
    members.forEach(member => {
        const memberItem = document.createElement('div');
        memberItem.className = 'member-item';
        memberItem.innerHTML = `
            <div class="member-details">
                <h3>${member.name}</h3>
                <p class="member-category">${member.category}</p>
                <p class="member-address">${member.address}</p>
                <p class="member-phone">${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener" class="member-website">Website</a>
            </div>
            <span class="membership-level list-membership ${getMembershipLevelName(member.membershipLevel).toLowerCase()}">
                ${getMembershipLevelName(member.membershipLevel)}
            </span>
        `;
        container.appendChild(memberItem);
    });
}

// Initialize the directory
async function initDirectory() {
    // Set current year in footer
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    
    // Show loading state
    const container = document.getElementById('member-container');
    container.innerHTML = '<div class="loading">Loading members...</div>';
    
    try {
        // Fetch members data
        const members = await getMembers();
        
        if (members.length > 0) {
            // Display members in grid view by default
            displayMembersGrid(members);
            
            // Add event listeners for view toggle
            document.getElementById('grid-btn').addEventListener('click', () => {
                document.getElementById('grid-btn').classList.add('active');
                document.getElementById('list-btn').classList.remove('active');
                displayMembersGrid(members);
            });
            
            document.getElementById('list-btn').addEventListener('click', () => {
                document.getElementById('list-btn').classList.add('active');
                document.getElementById('grid-btn').classList.remove('active');
                displayMembersList(members);
            });
        } else {
            container.innerHTML = '<div class="error">No member data available.</div>';
        }
    } catch (error) {
        console.error('Error initializing directory:', error);
        container.innerHTML = '<div class="error">Failed to load member data. Please try again later.</div>';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDirectory);