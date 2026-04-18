// Floating Navigation
const navDots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('section');



// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Uzman profili — deneyim / eğitim sekmeleri
document.querySelectorAll('.profile-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
        const panelId = tab.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;
        if (!panel) return;

        document.querySelectorAll('.profile-tab').forEach((t) => {
            const selected = t === tab;
            t.classList.toggle('active', selected);
            t.setAttribute('aria-selected', selected ? 'true' : 'false');
            t.setAttribute('tabindex', selected ? '0' : '-1');
        });

        document.querySelectorAll('.profile-tab-panel').forEach((p) => {
            p.hidden = p.id !== panelId;
        });
    });
});

// Update active nav dot based on scroll position
function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navDots.forEach(dot => dot.classList.remove('active'));
            if (navDots[index]) {
                navDots[index].classList.add('active');
            }
        }
    });
}

// Smooth scroll to section when nav dot is clicked
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (sections[index]) {
            sections[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const menuIcon = document.querySelector('.menu-icon');

mobileMenuBtn.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    // Add mobile menu functionality here if needed
});

// Scroll event listener
window.addEventListener('scroll', updateActiveNav);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-item, .specialty-item, .cert-item, .timeline-item, .testimonial-card, .faq-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Modern notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 
                 type === 'error' ? 'fas fa-exclamation-circle' : 
                 'fas fa-info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Outfit', sans-serif;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    }
    
    updateCounter();
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.stat-number');
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stat items for counter animation
document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat');
    statItems.forEach(item => {
        counterObserver.observe(item);
    });
});

// Parallax effect for geometric shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Floating cards animation
const floatingCards = document.querySelectorAll('.card');
floatingCards.forEach((card, index) => {
    setInterval(() => {
        const randomY = Math.random() * 15 - 7.5;
        const randomX = Math.random() * 8 - 4;
        card.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 4000 + (index * 800));
});

// Service item hover effects
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Specialty item click effects with ripple
document.querySelectorAll('.specialty-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        margin-left: auto;
    }
    
    .menu-icon.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-icon.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-icon.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth scrolling for all anchor links
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

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 10000;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Testimonials Slider
const testimonialsTrack = document.querySelector('.testimonials-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.slider-dots .dot');

let currentSlide = 0;
let slideWidth; // Will be calculated dynamically
let cardsPerView = 2; // Default for larger screens

function calculateCardsPerView() {
    if (window.innerWidth <= 1024) {
        cardsPerView = 1;
    } else {
        cardsPerView = 2;
    }
}

function calculateSlideWidth() {
    if (testimonialsTrack.children.length > 0) {
        const card = testimonialsTrack.children[0];
        const cardWidth = card.offsetWidth;
        const gap = parseFloat(getComputedStyle(testimonialsTrack).gap);
        slideWidth = cardWidth + gap;
    }
}

function updateSlider() {
    calculateCardsPerView();
    calculateSlideWidth(); // Recalculate on update to handle responsive changes
    const translateX = -currentSlide * slideWidth;
    testimonialsTrack.style.transform = `translateX(${translateX}px)`;

    // Update dots
    // Each dot represents a "page" of cardsPerView cards
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === Math.floor(currentSlide / cardsPerView));
    });

    // Update buttons
    const maxSlides = testimonialsTrack.children.length;
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide >= maxSlides - cardsPerView;
}

// Event listeners for slider
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide--;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide++;
        updateSlider();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index * cardsPerView; // Each dot represents cardsPerView cards
        updateSlider();
    });
});

// Initial update
updateSlider();

// Auto-scroll functionality
let autoScrollInterval;
const autoScrollDelay = 5000; // 5 seconds

function startAutoScroll() {
    stopAutoScroll(); // Clear any existing interval
    autoScrollInterval = setInterval(() => {
        const maxSlides = testimonialsTrack.children.length;
        currentSlide++;
        // If currentSlide goes beyond the last valid starting index, reset to 0
        if (currentSlide > maxSlides - cardsPerView) {
            currentSlide = 0;
        }
        updateSlider();
    }, autoScrollDelay);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Start auto-scroll when page loads
startAutoScroll();

// Pause auto-scroll on hover
testimonialsTrack.addEventListener('mouseenter', stopAutoScroll);
testimonialsTrack.addEventListener('mouseleave', startAutoScroll);
if (prevBtn) {
    prevBtn.addEventListener('mouseenter', stopAutoScroll);
    prevBtn.addEventListener('mouseleave', startAutoScroll);
}
if (nextBtn) {
    nextBtn.addEventListener('mouseenter', stopAutoScroll);
    nextBtn.addEventListener('mouseleave', startAutoScroll);
}
dots.forEach(dot => {
    dot.addEventListener('mouseenter', stopAutoScroll);
    dot.addEventListener('mouseleave', startAutoScroll);
});

// Recalculate slideWidth and update slider on window resize
window.addEventListener('resize', updateSlider);
