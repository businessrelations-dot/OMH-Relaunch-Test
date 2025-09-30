/**
 * OMH Digital Landing Page - Interactive Script
 * Handles menu behavior, scroll animations, and user interactions
 */

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

const hamburger = document.getElementById('hamburger');
const navigation = document.getElementById('navigation');

if (hamburger && navigation) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navigation.classList.toggle('active');

    // Toggle body scroll when menu is open
    if (navigation.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking on navigation links
  const navItems = navigation.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navigation.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ==========================================
// STICKY MENU BACKGROUND ON SCROLL
// ==========================================

const menu = document.getElementById('menu');
let lastScrollY = window.scrollY;

function updateMenuBackground() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 50) {
    menu.style.background = 'rgba(1, 15, 7, 0.9)';
  } else {
    menu.style.background = 'rgba(1, 15, 7, 0.3)';
  }

  lastScrollY = currentScrollY;
}

// Use requestAnimationFrame for smooth scroll handling
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateMenuBackground();
      ticking = false;
    });
    ticking = true;
  }
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Don't prevent default for just "#" links
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const menuHeight = menu.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - menuHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==========================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ==========================================

const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';

      // Stagger animation for problem cards
      if (entry.target.classList.contains('problem-card')) {
        const cards = document.querySelectorAll('.problem-card');
        cards.forEach((card, index) => {
          if (card === entry.target) {
            card.style.transitionDelay = `${index * 0.1}s`;
          }
        });
      }

      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Elements to observe for fade-in
const elementsToAnimate = document.querySelectorAll('.hero-text, .hero-images, .problem-card, .problems-title');
elementsToAnimate.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ==========================================
// PAUSE CAROUSEL ON HOVER
// ==========================================

const carouselRows = document.querySelectorAll('.carousel-row');

carouselRows.forEach(row => {
  const track = row.querySelector('.logo-track');

  if (track) {
    row.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });

    row.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }
});

// ==========================================
// VIDEO PLAY BUTTON INTERACTION
// ==========================================

const playButton = document.querySelector('.play-button');

if (playButton) {
  playButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Add pulse animation on click
    playButton.style.transform = 'scale(0.9)';

    setTimeout(() => {
      playButton.style.transform = 'scale(1)';
    }, 150);

    // Here you would typically open a video modal or redirect
    console.log('Video play clicked - implement video modal here');

    // Example: Open video in modal (placeholder)
    // showVideoModal('your-video-url');
  });
}

// ==========================================
// CTA BUTTON CLICK TRACKING
// ==========================================

const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .cta-menu');

ctaButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // Add click effect
    button.style.transform = 'scale(0.95)';

    setTimeout(() => {
      button.style.transform = '';
    }, 150);

    // Track button clicks (placeholder for analytics)
    const buttonText = button.textContent.trim();
    console.log(`CTA clicked: ${buttonText}`);

    // Implement actual tracking or form submission here
    // Example: gtag('event', 'cta_click', { button_text: buttonText });
  });
});

// ==========================================
// LOGO CARD HOVER EFFECTS WITH TRANSFORM
// ==========================================

const logoCards = document.querySelectorAll('.logo-card');

logoCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// ==========================================
// PERFORMANCE OPTIMIZATION: LAZY LOAD IMAGES
// ==========================================

// Modern browsers support loading="lazy" in HTML
// This is a fallback for older browsers

if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Force load if not already loaded
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }

        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// MOBILE MENU STYLES FOR RESPONSIVE
// ==========================================

function setupMobileMenu() {
  const viewportWidth = window.innerWidth;

  if (viewportWidth < 768) {
    // Mobile menu should be a full-screen overlay
    navigation.style.position = 'fixed';
    navigation.style.top = '0';
    navigation.style.left = '0';
    navigation.style.width = '100%';
    navigation.style.height = '100vh';
    navigation.style.background = 'rgba(1, 15, 7, 0.98)';
    navigation.style.flexDirection = 'column';
    navigation.style.justifyContent = 'center';
    navigation.style.alignItems = 'center';
    navigation.style.gap = '2rem';
    navigation.style.transform = 'translateX(100%)';
    navigation.style.transition = 'transform 0.3s ease';
    navigation.style.zIndex = '999';

    // Add active class styles
    if (navigation.classList.contains('active')) {
      navigation.style.transform = 'translateX(0)';
    }
  } else {
    // Reset desktop styles
    navigation.style.position = '';
    navigation.style.top = '';
    navigation.style.left = '';
    navigation.style.width = '';
    navigation.style.height = '';
    navigation.style.background = '';
    navigation.style.flexDirection = '';
    navigation.style.justifyContent = '';
    navigation.style.alignItems = '';
    navigation.style.gap = '';
    navigation.style.transform = '';
    navigation.style.transition = '';
    navigation.style.zIndex = '';
  }
}

// Setup on load and resize
setupMobileMenu();
window.addEventListener('resize', setupMobileMenu);

// ==========================================
// INITIALIZE ON DOM CONTENT LOADED
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('OMH Digital Landing Page Loaded Successfully');

  // Set initial menu background
  updateMenuBackground();

  // Setup mobile menu
  setupMobileMenu();

  // Preload critical images (optional enhancement)
  const criticalImages = [
    'http://localhost:3845/assets/0f3ec225aff6b8489af2a30718435d769095208f.png',
    'http://localhost:3845/assets/30894b6603396d7577454171fdda537b0d29603e.svg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
});

// ==========================================
// SMOOTH SCROLL REVEAL ON PAGE LOAD
// ==========================================

window.addEventListener('load', () => {
  // Reveal hero section immediately
  const heroText = document.querySelector('.hero-text');
  const heroImages = document.querySelector('.hero-images');

  if (heroText) {
    setTimeout(() => {
      heroText.style.opacity = '1';
      heroText.style.transform = 'translateY(0)';
    }, 100);
  }

  if (heroImages) {
    setTimeout(() => {
      heroImages.style.opacity = '1';
      heroImages.style.transform = 'translateY(0)';
    }, 300);
  }
});

// ==========================================
// HANDLE MOBILE NAVIGATION ACTIVE STATE
// ==========================================

// Add CSS for mobile navigation active state dynamically
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 767px) {
    .navigation.active {
      display: flex !important;
      transform: translateX(0) !important;
    }
  }
`;
document.head.appendChild(style);

// ==========================================
// ERROR HANDLING FOR ASSET LOADING
// ==========================================

// Handle image load errors gracefully
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    console.warn(`Failed to load image: ${this.src}`);
    // Optionally set a fallback or placeholder
    this.style.opacity = '0.3';
  });
});

// ==========================================
// PERFORMANCE MONITORING (OPTIONAL)
// ==========================================

// Log performance metrics
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      console.log('Performance Metrics:');
      console.log(`- Page Load Time: ${pageLoadTime}ms`);
      console.log(`- Connect Time: ${connectTime}ms`);
      console.log(`- Render Time: ${renderTime}ms`);
    }, 0);
  });
}