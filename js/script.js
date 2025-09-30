/**
 * OMH Digital Marketing Landing Page
 * Interactive JavaScript Components
 * Clean Implementation v2.0
 */

class OMHLandingPage {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollEffects();
    this.setupCarouselAnimations();
    this.setupIntersectionObserver();
    this.setupVideoPlayButton();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupPerformanceOptimizations();
  }

  /**
   * Scroll Effects for Navbar
   */
  setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        navbar.style.background = 'rgba(1, 15, 7, 0.95)';
        navbar.style.borderBottomColor = 'rgba(0, 255, 102, 0.2)';
      } else {
        navbar.style.background = 'rgba(1, 15, 7, 0.3)';
        navbar.style.borderBottomColor = 'rgba(36, 57, 45, 0.5)';
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  /**
   * Enhanced Carousel Animations with Pause on Hover
   */
  setupCarouselAnimations() {
    const carouselRows = document.querySelectorAll('.carousel-row');

    carouselRows.forEach(row => {
      const track = row.querySelector('.carousel-track');

      // Pause animation on hover
      row.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
      });

      row.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
      });
    });
  }

  /**
   * Intersection Observer for Animations
   */
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add entrance animation
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';

          // Add stagger effect for cards
          if (entry.target.classList.contains('problem-card')) {
            const cards = document.querySelectorAll('.problem-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, index * 200);
            });
          }

          // Add stagger effect for stats
          if (entry.target.classList.contains('stats-grid')) {
            const statItems = entry.target.querySelectorAll('.stat-item');
            statItems.forEach((item, index) => {
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
              }, index * 150);
            });
          }

          // Add entrance for hero images
          if (entry.target.classList.contains('hero-images-grid')) {
            const images = entry.target.querySelectorAll('.hero-image');
            images.forEach((img, index) => {
              setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = 'translateY(0) scale(1)';
              }, index * 200);
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
      .hero-left,
      .hero-images-grid,
      .stats-grid,
      .problem-card,
      .logo-carousel-section
    `);

    // Set initial state
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(element);
    });

    // Special handling for stats and hero images
    document.querySelectorAll('.stat-item').forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px) scale(0.9)';
      item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    document.querySelectorAll('.hero-image').forEach(img => {
      img.style.opacity = '0';
      img.style.transform = 'translateY(20px) scale(0.95)';
      img.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }

  /**
   * Video Play Button Interaction
   */
  setupVideoPlayButton() {
    const videoPlayBtn = document.querySelector('.video-play-btn');

    if (videoPlayBtn) {
      videoPlayBtn.addEventListener('click', () => {
        // Add click animation
        videoPlayBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
          videoPlayBtn.style.transform = 'scale(1.1)';
        }, 150);

        // Here you would typically open a video modal or redirect to video
        console.log('Video play button clicked - implement video modal here');

        // Example: You could show a modal or redirect to YouTube
        // window.open('https://youtube.com/your-video-id', '_blank');
      });

      // Add hover glow effect
      videoPlayBtn.addEventListener('mouseenter', () => {
        videoPlayBtn.style.boxShadow = '0 0 40px rgba(0, 255, 102, 0.8)';
      });

      videoPlayBtn.addEventListener('mouseleave', () => {
        videoPlayBtn.style.boxShadow = '0 8px 25px rgba(0, 255, 102, 0.4)';
      });
    }
  }

  /**
   * Mobile Menu Functionality
   */
  setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarMenu = document.querySelector('.navbar-menu');
    let isMenuOpen = false;

    if (mobileMenuBtn && navbarMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;

        // Toggle menu visibility
        navbarMenu.classList.toggle('mobile-menu-open', isMenuOpen);

        // Animate hamburger icon
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (isMenuOpen) {
          spans[0].style.transform = 'rotate(45deg) translateY(7px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.navbar-container')) {
          mobileMenuBtn.click();
        }
      });
    }
  }

  /**
   * Smooth Scrolling for Anchor Links
   */
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
          const offsetTop = target.offsetTop - 120; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Performance Optimizations
   */
  setupPerformanceOptimizations() {
    // Lazy load images that aren't immediately visible
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Optimize scroll performance
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
      if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
      }

      document.body.classList.add('scrolling');

      scrollTimer = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 150);
    }, { passive: true });

    // Preload critical resources
    this.preloadCriticalResources();
  }

  /**
   * Preload Critical Resources
   */
  preloadCriticalResources() {
    const criticalImages = [
      'http://localhost:3845/assets/0f3ec225aff6b8489af2a30718435d769095208f.png',
      'http://localhost:3845/assets/ae6b23d4e24bf98b7c1c58c3cf121b83cacfe40d.png',
      'http://localhost:3845/assets/e88a04a7e302251601952fb371f7df77c15d8ff5.png',
      'http://localhost:3845/assets/ded55b493b65f83a912e5c70f7995ac6efcfc7ea.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  /**
   * Enhanced Button Interactions
   */
  setupButtonInteractions() {
    // CTA Button enhancements
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        button.appendChild(ripple);

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  /**
   * Parallax Effect for Background Elements
   */
  setupParallaxEffect() {
    const stairElements = document.querySelectorAll('.stair-element');
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      stairElements.forEach((element, index) => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.02}deg)`;
      });

      ticking = false;
    };

    const requestParallaxTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Only enable parallax on desktop to avoid performance issues on mobile
    if (window.innerWidth > 768) {
      window.addEventListener('scroll', requestParallaxTick, { passive: true });
    }
  }
}

/**
 * Enhanced Mobile Menu Styles (to be added to CSS)
 */
const addMobileMenuStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 767px) {
      .navbar-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(1, 15, 7, 0.95);
        backdrop-filter: blur(25px);
        border-top: 1px solid rgba(36, 57, 45, 0.5);
        flex-direction: column;
        padding: 2rem;
        gap: 1.5rem;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .navbar-menu.mobile-menu-open {
        display: flex;
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }

      @keyframes ripple-animation {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(2);
          opacity: 0;
        }
      }

      .scrolling .stair-element {
        will-change: transform;
      }

      .loaded {
        animation: fadeIn 0.5s ease-in;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    }
  `;
  document.head.appendChild(style);
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  addMobileMenuStyles();
  const landingPage = new OMHLandingPage();

  // Add additional setup for enhanced interactions
  landingPage.setupButtonInteractions();
  landingPage.setupParallaxEffect();
});

// Handle resize events
window.addEventListener('resize', () => {
  // Debounce resize events
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(() => {
    // Recalculate any size-dependent features
    console.log('Window resized - recalculating layout');
  }, 250);
});