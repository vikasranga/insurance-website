// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
// Only prevent default for anchor tags where href starts with '#' and is not just '#'
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Quote calculator functionality
const quoteForm = document.querySelector('.quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const insuranceType = this.querySelector('select').value;
        const age = this.querySelector('input[placeholder="Your Age"]').value;
        const coverage = this.querySelector('input[placeholder="Coverage Amount"]').value;
        
        // Simple premium calculation (demo purposes)
        if (insuranceType && age && coverage) {
            const baseRate = {
                'Life Insurance': 0.05,
                'Health Insurance': 0.08,
                'Motor Insurance': 0.03,
                'Property Insurance': 0.02
            };
            
            const premium = (parseInt(coverage) * baseRate[insuranceType] * (1 + parseInt(age) / 100)).toFixed(2);
            
            // Show result (you can replace this with a modal or notification)
            alert(`Estimated Premium: ₹${premium} per year`);
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Simple Banner Carousel
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    const prev = document.querySelector('.banner-nav.prev');
    const next = document.querySelector('.banner-nav.next');
    if (!slides.length) return;

    let current = 0;
    function show(n) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
    }
    prev && prev.addEventListener('click', () => show(current - 1));
    next && next.addEventListener('click', () => show(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
    setInterval(() => show(current + 1), 2000);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(statNumber, number);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => statsObserver.observe(stat));
});

// Form validation and enhancement
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Add input validation
        input.addEventListener('input', () => {
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });
});

// Button click effects
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
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
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .focused {
        transform: scale(1.02);
    }
    
    .has-value {
        border-color: #2c3383 !important;
    }
`;
document.head.appendChild(style);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Scroll to top functionality removed to avoid conflict with floating support chatbot

// Responsive scaling for hero-container-2col to always fit in hero
function fitHeroContainer() {
    const hero = document.querySelector('.hero');
    const container = document.querySelector('.hero-container-2col');
    if (!hero || !container) return;

    // Only apply scaling for desktop screens
    if (window.innerWidth < 900) {
        container.style.transform = 'none';
        container.style.margin = '';
        container.style.position = '';
        return;
    }

    // Design size
    const designWidth = 1200;
    const designHeight = 600;

    const availableWidth = hero.clientWidth;
    const availableHeight = hero.clientHeight;

    const scale = Math.min(availableWidth / designWidth, availableHeight / designHeight, 1);

    container.style.transform = `scale(${scale})`;
    container.style.transformOrigin = 'top center';
    container.style.margin = '0 auto';
    container.style.position = '';
    container.style.top = '';
    container.style.left = '';
}

window.addEventListener('resize', fitHeroContainer);
window.addEventListener('DOMContentLoaded', fitHeroContainer);

window.addEventListener('DOMContentLoaded', () => {
    const config = window.CLIENT_CONFIG;
    if (!config) return;

    // Set logo in footer
    const logoImg = document.querySelector('.footer-logo img');
    if (logoImg && config.logoUrl) logoImg.src = config.logoUrl;

    // Set logo in header
    const headerLogoImg = document.getElementById('header-logo');
    if (headerLogoImg && config.logoUrl) headerLogoImg.src = config.logoUrl;

    // Set font family
    if (config.fontFamily) document.body.style.fontFamily = config.fontFamily;

    // Set colors as CSS variables
    if (config.colors) {
        for (const [key, value] of Object.entries(config.colors)) {
            const cssVar = `--${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}-color`;
            document.documentElement.style.setProperty(cssVar, value);
        }
    }

    // Set footer info
    if (config.footer) {
        const addressEl = document.querySelector('.footer .fa-map-marker-alt');
        if (addressEl && addressEl.parentElement) addressEl.parentElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${config.footer.address}`;
        const phoneEl = document.querySelector('.footer .fa-phone');
        if (phoneEl && phoneEl.parentElement) phoneEl.parentElement.innerHTML = `<i class="fas fa-phone"></i> ${config.footer.phone}`;
        const emailEl = document.querySelector('.footer .fa-envelope');
        if (emailEl && emailEl.parentElement) emailEl.parentElement.innerHTML = `<i class="fas fa-envelope"></i> ${config.footer.email}`;
    }

    // Set button URLs from config
    const pospBtn = document.querySelector('.nav-menu li:first-child a.nav-btn');
    if (pospBtn && config.pospUrl) {
        pospBtn.setAttribute('href', config.pospUrl);
        pospBtn.setAttribute('target', '_blank');
        pospBtn.setAttribute('rel', 'noopener noreferrer');
    }
    const customerLoginBtn = document.querySelector('.nav-menu li:nth-child(2) a.nav-btn');
    if (customerLoginBtn && config.customerLoginUrl) {
        customerLoginBtn.setAttribute('href', config.customerLoginUrl);
        customerLoginBtn.setAttribute('target', '_blank');
        customerLoginBtn.setAttribute('rel', 'noopener noreferrer');
    }
    const buyInsuranceBtns = document.querySelectorAll('.cta-btn.buy-insurance-btn, .redesigned-cta-btn:not(.want-to-insure-btn)');
    buyInsuranceBtns.forEach(btn => {
        if (config.buyInsuranceUrl) {
            btn.onclick = () => { window.open(config.buyInsuranceUrl, '_blank', 'noopener'); };
        }
    });
    const pospSectionBtn = document.querySelector('.posp-join-btn');
    if (pospSectionBtn && config.pospUrl) {
        pospSectionBtn.setAttribute('href', config.pospUrl);
        pospSectionBtn.setAttribute('target', '_blank');
        pospSectionBtn.setAttribute('rel', 'noopener noreferrer');
    }
    const footerPospLink = document.querySelector('.footer-section ul li:nth-child(3) a');
    if (footerPospLink && config.pospUrl) {
        footerPospLink.setAttribute('href', config.pospUrl);
        footerPospLink.setAttribute('target', '_blank');
        footerPospLink.setAttribute('rel', 'noopener noreferrer');
    }
}); 

// Testimonials: no carousel; show all cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach(card => card.classList.add('active'));
});

// Partners marquee - duplicate logos for seamless scroll
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.partners-marquee .marquee-track');
    if (!track) return;

    // Clone all children to make a continuous loop
    const logos = Array.from(track.children);
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        clone.classList.add('clone');
        track.appendChild(clone);
    });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Want to Insure modal logic
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.want-to-insure-btn');
    const modal = document.getElementById('insureModal');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;
    const form = modal ? document.getElementById('insureForm') : null;

    function openModal() { if (modal) { modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false'); } }
    function closeModal() { if (modal) { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); } }

    btn && btn.addEventListener('click', openModal);
    closeBtn && closeBtn.addEventListener('click', closeModal);
    modal && modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const mobileInput = form.elements['mobile'];
            const ageInput = form.elements['age'];

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            // Populate success contact placeholders with configured values if available
            const phone = '022-62526252';
            const emailNew = 'contact@policies365.com';
            const emailSupport = 'helpdesk@policies365.com';
            // Show toast
            const toast = document.getElementById('globalToast');
            if (toast) {
                const content = toast.querySelector('.toast-content');
                const message = `Thank you for sharing your details. Our expert will reach out to you very soon.<br/><br/>` +
                    `For direct support, call <strong>${phone}</strong> or write to <strong>${emailNew}</strong><br/>` +
                    `(Business Hours: 10:00 AM – 6:00 PM)`;
                if (content) {
                    content.innerHTML = message;
                } else {
                    toast.innerHTML = message;
                }
                toast.classList.add('show');
                const toastClose = toast.querySelector('.toast-close');
                toastClose && toastClose.addEventListener('click', () => toast.classList.remove('show'));
            }
            // Close modal after brief delay for better UX
            setTimeout(closeModal, 200);
            form.reset();
            mobileInput.blur(); ageInput.blur();
        });
    }
});