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

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('data-theme');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('data-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('data-theme');
    themeToggle.querySelector('i').classList.remove('fa-moon');
    themeToggle.querySelector('i').classList.add('fa-sun');
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Animate Skill Bars on Scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelectorAll('.skill-progress');
            skillProgress.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill sections
document.querySelectorAll('.skills').forEach(section => {
    observer.observe(section);
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (target > 10 ? '' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        updateCounter();
    });
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.stats')?.parentElement && statsObserver.observe(document.querySelector('.stats')?.parentElement);

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (name && email && subject && message) {
        // Simulate form submission
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Parallax Effect for Hero Image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.profile-img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Fade in animations for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Enhanced Contact Copy Functionality
let copyToast = null;

document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        const text = this.getAttribute('data-copy');
        navigator.clipboard.writeText(text).then(() => {
            showCopyToast(this);
            // Also trigger default action after short delay for mailto/tel
            setTimeout(() => {
                if (this.href) window.location.href = this.href;
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback copy
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopyToast(this);
        });
    });
});

function showCopyToast(element) {
    if (copyToast) copyToast.remove();
    
    copyToast = document.createElement('div');
    copyToast.className = 'fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-green-400/50 animate-bounce z-50 flex items-center space-x-2 text-lg font-semibold';
    copyToast.innerHTML = '✓ Copied! <i class="fas fa-check ml-2"></i>';
    
    document.body.appendChild(copyToast);
    
    // Position near element
    const rect = element.getBoundingClientRect();
    copyToast.style.bottom = `${window.innerHeight - rect.top - 20}px`;
    copyToast.style.right = '20px';
    
    setTimeout(() => {
        copyToast.remove();
    }, 2500);
}

// Animate contact cards on scroll
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.group').forEach(card => {
    contactObserver.observe(card);
});

// Shimmer animation CSS (inline via Tailwind, already added)
// Add animate class in CSS (already in styles)


