/**
 * Enterprise Appointment Booking System - JavaScript
 * Handles interactive functionality, smooth scrolling, and user interactions
 */

// ============================================================================
// SMOOTH SCROLL BEHAVIOR FOR NAVIGATION LINKS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================================================
// BUTTON INTERACTIONS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons
    const buttons = document.querySelectorAll('.button, .cta-button');
    
    buttons.forEach(button => {
        // Add click feedback
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Remove any existing ripple
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });
});

// ============================================================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and feature elements
    const elementsToObserve = document.querySelectorAll(
        '.feature-card, .problem-card, .perfect-for-card, .admin-feature, .comparison-column'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// ============================================================================
// NAVBAR STICKY BEHAVIOR
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 0) {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});

// ============================================================================
// FORM INTERACTIONS (Future Enhancement)
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Add focus styles to form inputs when they exist
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#0d7377';
            this.style.boxShadow = '0 0 0 3px rgba(13, 115, 119, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#e5e5e5';
            this.style.boxShadow = 'none';
        });
    });
});

// ============================================================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #0d7377;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Log performance metrics in development
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log('Page Load Time: ' + pageLoadTime + 'ms');
        });
    }
});

// ============================================================================
// MOBILE MENU TOGGLE (Future Enhancement)
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // This function can be extended to add mobile menu functionality
    // when needed in future versions
    
    function setupMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const navbar = document.querySelector('.navbar-container');
        
        // Mobile menu would be added here
        if (window.innerWidth <= 768) {
            // Mobile-specific behavior
        }
    }
    
    setupMobileMenu();
    
    // Re-setup on window resize
    window.addEventListener('resize', setupMobileMenu);
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================================================
// FEATURE DETECTION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Check for CSS Grid support
    const supportsGrid = CSS.supports('display', 'grid');
    
    // Check for CSS Flexbox support
    const supportsFlex = CSS.supports('display', 'flex');
    
    // Log support status
    console.log('CSS Grid Support:', supportsGrid);
    console.log('CSS Flexbox Support:', supportsFlex);
    
    // Add fallback classes if needed
    if (!supportsGrid || !supportsFlex) {
        document.body.classList.add('no-modern-css');
    }
});

// ============================================================================
// EXPORT FOR FUTURE MODULE USAGE
// ============================================================================

// Make utilities available globally
window.AppUtils = {
    debounce,
    throttle
};
