/* ==========================================
   Particle System & Background Effects
   ========================================== */

// Particle System Class
class ParticleSystem {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId) || document.body;
        this.particles = [];
        this.options = {
            count: options.count || 30,
            minSize: options.minSize || 20,
            maxSize: options.maxSize || 100,
            speed: options.speed || 0.5,
            color: options.color || 'rgba(44, 95, 125, 0.1)',
            interactive: options.interactive !== false
        };

        this.init();
    }

    init() {
        // Create particles container
        const particlesDiv = document.createElement('div');
        particlesDiv.className = 'particles-bg';
        particlesDiv.id = 'particles-container';
        this.container.appendChild(particlesDiv);

        // Create particles
        for (let i = 0; i < this.options.count; i++) {
            this.createParticle();
        }

        // Add interaction if enabled
        if (this.options.interactive) {
            this.addInteraction();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = 15 + Math.random() * 15;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        particle.style.background = this.options.color;

        document.getElementById('particles-container').appendChild(particle);
        this.particles.push(particle);
    }

    addInteraction() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            this.particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 50;
                const y = (mouseY - 0.5) * speed * 50;

                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

// Scroll Effects
class ScrollEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupObserver();
        this.addScrollProgress();
        this.addParallax();
    }

    setupObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, options);

        // Observe all reveal elements
        document.querySelectorAll('[class*="reveal-"]').forEach(el => {
            observer.observe(el);
        });
    }

    addScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;

            document.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
        });
    }

    addParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Magnetic Buttons
class MagneticButton {
    constructor(selector) {
        this.buttons = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Tilt Effect
class TiltEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

// Smooth Scroll to Top
class ScrollToTop {
    constructor() {
        this.createButton();
        this.init();
    }

    createButton() {
        const button = document.createElement('button');
        button.className = 'fab scroll-to-top';
        button.innerHTML = '<i class="bi bi-arrow-up"></i>';
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
        document.body.appendChild(button);

        this.button = button;
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Custom Cursor
class CustomCursor {
    constructor() {
        if (window.innerWidth > 768) {
            this.createCursor();
            this.init();
        }
    }

    createCursor() {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';

        const outline = document.createElement('div');
        outline.className = 'cursor-outline';

        document.body.appendChild(dot);
        document.body.appendChild(outline);

        this.dot = dot;
        this.outline = outline;
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.dot.style.left = e.clientX + 'px';
            this.dot.style.top = e.clientY + 'px';

            this.outline.style.left = e.clientX + 'px';
            this.outline.style.top = e.clientY + 'px';
        });

        // Add interaction with links and buttons
        document.querySelectorAll('a, button, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.dot.style.transform = 'scale(2)';
                this.outline.style.transform = 'scale(1.5)';
            });

            el.addEventListener('mouseleave', () => {
                this.dot.style.transform = 'scale(1)';
                this.outline.style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize all effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll effects
    new ScrollEffects();

    // Initialize scroll to top button
    new ScrollToTop();

    // Initialize magnetic buttons
    new MagneticButton('.btn-primary, .btn-outline-primary');

    // Initialize tilt effect on cards
    new TiltEffect('.product-card, .feature-card, .testimonial-card');

    // Initialize custom cursor
    // new CustomCursor(); // Disabled - removed cursor trail effect

    // Initialize particle system on hero section
    setTimeout(() => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.position = 'relative';
            new ParticleSystem('particles-hero', {
                count: 20,
                minSize: 30,
                maxSize: 80,
                color: 'rgba(44, 95, 125, 0.08)',
                interactive: true
            });
        }
    }, 100);
});

// Add CSS for scroll progress bar
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(0, 0, 0, 0.1);
        z-index: 9999;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #2c5f7d, #4a8aaa);
        width: 0;
        transition: width 0.1s ease;
    }
    
    .scroll-to-top {
        transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(style);
