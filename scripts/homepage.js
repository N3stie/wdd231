// Complete JavaScript for homepage functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== HAMBURGER MENU FUNCTIONALITY ====================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        // Toggle menu when hamburger is clicked
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu when clicking on navigation links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.textContent = '☰';
            });
        });
        
        // Close menu when clicking outside of header
        document.addEventListener('click', function(e) {
            if (!e.target.closest('header')) {
                navMenu.classList.remove('active');
                hamburger.textContent = '☰';
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                hamburger.textContent = '☰';
            }
        });
    }
    
    // ==================== LAST MODIFIED DATE FUNCTIONALITY ====================
    function updateLastModifiedDate() {
        // Get current date and time
        const now = new Date();
        
        // Format date as MM/DD/YYYY
        const formattedDate = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`;
        
        // Format time as HH:MM:SS (24-hour format)
        const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        // Update the last modified element
        const lastModifiedElement = document.getElementById('last-modified');
        if (lastModifiedElement) {
            lastModifiedElement.textContent = `Last Modification: ${formattedDate} ${formattedTime}`;
        }
        
        // Update copyright year dynamically if it contains placeholder
        const copyrightElements = document.querySelectorAll('footer p');
        copyrightElements.forEach(element => {
            if (element.textContent.includes('202X') || element.textContent.includes('2024')) {
                element.textContent = `© ${now.getFullYear()} • Student Name • Utah, USA`;
            }
        });
    }
    
    // Call the function to update dates
    updateLastModifiedDate();
    
    // ==================== COURSE FILTER FUNCTIONALITY ====================
    function initializeCourseFilters() {
        const filterButtons = document.querySelectorAll('.course-filters button');
        const courses = document.querySelectorAll('.course');
        
        // Set "All" as active by default
        if (filterButtons.length > 0) {
            filterButtons[0].classList.add('active');
        }
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.textContent.toLowerCase();
                let visibleCourseCount = 0;
                
                // Filter courses based on selection
                courses.forEach(course => {
                    if (filter === 'all' || course.textContent.toLowerCase().includes(filter)) {
                        course.style.display = 'block';
                        visibleCourseCount++;
                    } else {
                        course.style.display = 'none';
                    }
                });
                
                // Update credits count based on visible courses
                updateCreditsCount(visibleCourseCount, filter);
            });
        });
    }
    
    // Function to update credits count dynamically
    function updateCreditsCount(visibleCount, filter) {
        const creditsElement = document.querySelector('.credits');
        if (!creditsElement) return;
        
        let totalCredits = 0;
        
        // Calculate credits based on filter and visible courses
        if (filter === 'all') {
            totalCredits = 6; // WDD 130 + WDD 131 + WDD 231 = 2 + 2 + 2 = 6
        } else if (filter === 'wdd') {
            totalCredits = 6; // All WDD courses = 6 credits
        } else if (filter === 'cse') {
            totalCredits = 0; // No CSE courses in current list
        } else {
            totalCredits = visibleCount * 2; // Assume 2 credits per course
        }
        
        // Update the credits text
        if (totalCredits === 0) {
            creditsElement.textContent = 'No courses match the selected filter';
        } else {
            const courseText = visibleCount === 1 ? 'course' : 'courses';
            creditsElement.textContent = `The total credits for ${visibleCount} ${courseText} listed above is ${totalCredits}`;
        }
    }
    
    // Initialize course filters
    initializeCourseFilters();
    
    // ==================== ADDITIONAL ENHANCEMENTS ====================
    
    // Add loading animation
    function handlePageLoad() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-in';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }
    
    // Handle page load animation
    window.addEventListener('load', handlePageLoad);
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Social media link handlers (optional enhancements)
    document.querySelectorAll('.socials a').forEach(link => {
        link.addEventListener('click', function(e) {
            // You can add analytics or other tracking here
            console.log('Social link clicked:', this.href);
        });
    });
    
    // Course item click handlers
    document.querySelectorAll('.course').forEach(course => {
        course.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Console log for debugging
    console.log('Homepage JavaScript loaded successfully!');
});

// ==================== WINDOW RESIZE HANDLER ====================
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    // Auto-close hamburger menu when resizing to desktop
    if (window.innerWidth > 768 && navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.textContent = '☰';
    }
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ==================== PERFORMANCE OBSERVER (Optional) ====================
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            console.log(`${entry.name}: ${entry.duration}ms`);
        });
    });
    
    observer.observe({ entryTypes: ['measure', 'navigation'] });
}