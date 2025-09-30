/**
 * Animations JavaScript for OMH Landing Page
 * Handles background effects, parallax scrolling, and counter animations
 */

class BackgroundAnimations {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.isActive = false;

        this.init();
    }

    init() {
        this.createCanvas();
        this.setupParticles();
        this.setupEventListeners();
        this.start();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'background-animation';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
        `;

        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    setupParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());

        // Pause animation when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stop();
            } else {
                this.start();
            }
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.vy *= -1;
            }

            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));

            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });

        // Draw connections
        this.drawConnections();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        const maxDistance = 100;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.2;

                    this.ctx.save();
                    this.ctx.globalAlpha = opacity;
                    this.ctx.strokeStyle = '#3B82F6';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }

    start() {
        this.isActive = true;
        this.animate();
    }

    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    destroy() {
        this.stop();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

class ParallaxController {
    constructor() {
        this.elements = [];
        this.isActive = false;
        this.ticking = false;

        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
    }

    setupElements() {
        // Find all parallax elements
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const direction = element.dataset.parallaxDirection || 'up';

            this.elements.push({
                element,
                speed,
                direction,
                offset: 0
            });
        });
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => this.updateParallax());
                this.ticking = true;
            }
        });

        window.addEventListener('resize', () => this.handleResize());
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;

        this.elements.forEach(item => {
            const { element, speed, direction } = item;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollTop;
            const elementHeight = rect.height;

            // Check if element is in viewport
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                const yPos = -(scrollTop - elementTop) * speed;
                let transform = '';

                switch (direction) {
                    case 'up':
                        transform = `translateY(${yPos}px)`;
                        break;
                    case 'down':
                        transform = `translateY(${-yPos}px)`;
                        break;
                    case 'left':
                        transform = `translateX(${yPos}px)`;
                        break;
                    case 'right':
                        transform = `translateX(${-yPos}px)`;
                        break;
                }

                element.style.transform = transform;
            }
        });

        this.ticking = false;
    }

    handleResize() {
        // Recalculate on resize
        this.elements = [];
        this.setupElements();
    }
}

class CounterAnimations {
    constructor() {
        this.counters = [];
        this.observer = null;

        this.init();
    }

    init() {
        this.setupObserver();
        this.findCounters();
    }

    setupObserver() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = this.counters.find(c => c.element === entry.target);
                    if (counter && !counter.animated) {
                        this.animateCounter(counter);
                    }
                }
            });
        }, options);
    }

    findCounters() {
        const counterElements = document.querySelectorAll('[data-counter]');

        counterElements.forEach(element => {
            const target = parseInt(element.dataset.counter) || 0;
            const duration = parseInt(element.dataset.counterDuration) || 2000;
            const prefix = element.dataset.counterPrefix || '';
            const suffix = element.dataset.counterSuffix || '';

            const counter = {
                element,
                target,
                duration,
                prefix,
                suffix,
                animated: false
            };

            this.counters.push(counter);
            this.observer.observe(element);
        });
    }

    animateCounter(counter) {
        counter.animated = true;

        const { element, target, duration, prefix, suffix } = counter;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            const value = Math.floor(current);

            element.textContent = `${prefix}${value.toLocaleString()}${suffix}`;

            if (current >= target) {
                element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
                clearInterval(timer);
            }
        }, 16);
    }

    addCounter(element, target, options = {}) {
        const counter = {
            element,
            target,
            duration: options.duration || 2000,
            prefix: options.prefix || '',
            suffix: options.suffix || '',
            animated: false
        };

        this.counters.push(counter);
        this.observer.observe(element);
    }
}

class ScrollAnimations {
    constructor() {
        this.animations = new Map();
        this.isScrolling = false;

        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupEventListeners();
    }

    setupScrollEffects() {
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            this.animations.set('navbar', {
                element: navbar,
                effect: 'background',
                threshold: 50
            });
        }

        // Progress bar
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            this.animations.set('progress', {
                element: progressBar,
                effect: 'progress'
            });
        }

        // Fade elements
        const fadeElements = document.querySelectorAll('[data-scroll-fade]');
        fadeElements.forEach((element, index) => {
            this.animations.set(`fade-${index}`, {
                element,
                effect: 'fade',
                threshold: element.dataset.scrollFade || 0.1
            });
        });
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                requestAnimationFrame(() => this.handleScroll());
                this.isScrolling = true;
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        this.animations.forEach((animation, key) => {
            const { element, effect, threshold } = animation;

            switch (effect) {
                case 'background':
                    this.handleBackgroundEffect(element, scrollTop, threshold);
                    break;
                case 'progress':
                    this.handleProgressEffect(element, scrollTop, documentHeight, windowHeight);
                    break;
                case 'fade':
                    this.handleFadeEffect(element, threshold);
                    break;
            }
        });

        this.isScrolling = false;
    }

    handleBackgroundEffect(element, scrollTop, threshold) {
        if (scrollTop > threshold) {
            element.classList.add('scrolled');
        } else {
            element.classList.remove('scrolled');
        }
    }

    handleProgressEffect(element, scrollTop, documentHeight, windowHeight) {
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        element.style.width = `${Math.min(progress, 100)}%`;
    }

    handleFadeEffect(element, threshold) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        const visibility = Math.max(0, Math.min(1,
            (windowHeight - elementTop) / (windowHeight * threshold)
        ));

        element.style.opacity = visibility;
        element.style.transform = `translateY(${(1 - visibility) * 20}px)`;
    }
}

// Mouse trail effect
class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.mousePos = { x: 0, y: 0 };

        this.init();
    }

    init() {
        this.createTrailElements();
        this.setupEventListeners();
    }

    createTrailElements() {
        for (let i = 0; i < this.maxTrailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'mouse-trail-dot';
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #3B82F6;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - (i / this.maxTrailLength)};
                transform: scale(${1 - (i / this.maxTrailLength) * 0.5});
            `;

            document.body.appendChild(dot);
            this.trail.push(dot);
        }
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
        });

        this.animate();
    }

    animate() {
        // Update trail positions
        for (let i = this.trail.length - 1; i > 0; i--) {
            const current = this.trail[i];
            const previous = this.trail[i - 1];

            current.style.left = previous.style.left;
            current.style.top = previous.style.top;
        }

        // Update first dot to mouse position
        if (this.trail[0]) {
            this.trail[0].style.left = `${this.mousePos.x}px`;
            this.trail[0].style.top = `${this.mousePos.y}px`;
        }

        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        this.trail.forEach(dot => {
            if (dot.parentNode) {
                dot.parentNode.removeChild(dot);
            }
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Initialize background animations
        new BackgroundAnimations();

        // Initialize parallax effects
        new ParallaxController();

        // Initialize mouse trail (only on desktop)
        if (window.innerWidth > 768) {
            new MouseTrail();
        }
    }

    // Initialize counter animations (always active)
    new CounterAnimations();

    // Initialize scroll animations
    new ScrollAnimations();
});