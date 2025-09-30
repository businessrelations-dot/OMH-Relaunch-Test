/**
 * OMH Digital Component Library - JavaScript Helpers
 *
 * Simple vanilla JavaScript component rendering system
 * Provides template-based component creation without frameworks
 */

// Simple template engine for component rendering
class ComponentRenderer {
  /**
   * Replace {{variable}} placeholders with actual values
   * @param {string} template - HTML template string
   * @param {object} data - Data object with values
   * @returns {string} Rendered HTML string
   */
  static render(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : '';
    });
  }

  /**
   * Check if conditional is true for {{#if condition}}
   * @param {string} template - HTML template string
   * @param {object} data - Data object with values
   * @returns {string} Rendered HTML string
   */
  static renderConditional(template, data) {
    // Handle {{#if variable}}...{{/if}} blocks
    return template.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, condition, content) => {
      return data[condition] ? content : '';
    });
  }

  /**
   * Handle {{{unescaped}}} for HTML content
   * @param {string} template - HTML template string
   * @param {object} data - Data object with values
   * @returns {string} Rendered HTML string
   */
  static renderUnescaped(template, data) {
    return template.replace(/\{\{\{(\w+)\}\}\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : '';
    });
  }

  /**
   * Full render pipeline
   * @param {string} template - HTML template string
   * @param {object} data - Data object with values
   * @returns {string} Fully rendered HTML string
   */
  static renderTemplate(template, data) {
    let rendered = this.renderConditional(template, data);
    rendered = this.renderUnescaped(rendered, data);
    rendered = this.render(rendered, data);
    return rendered;
  }
}

// Component classes for programmatic creation
class LogoCard {
  constructor(logoUrl, logoAlt) {
    this.logoUrl = logoUrl;
    this.logoAlt = logoAlt;
  }

  render() {
    return `
      <div class="logo-card" data-component="logo-card">
        <img src="${this.logoUrl}" alt="${this.logoAlt}" class="logo-card__image">
      </div>
    `;
  }
}

class CtaButton {
  constructor(text, type = 'primary', href = null, onClick = null) {
    this.text = text;
    this.type = type; // 'primary' or 'secondary'
    this.href = href;
    this.onClick = onClick;
  }

  render() {
    const className = this.type === 'primary' ? 'cta-primary' : 'cta-secondary';
    const onclickAttr = this.href ? `onclick="window.location.href='${this.href}'"` : '';

    return `
      <button class="${className}" data-component="cta-button-${this.type}" ${onclickAttr}>
        ${this.text}
      </button>
    `;
  }
}

class ProblemCard {
  constructor(title, description, iconSvg = null) {
    this.title = title;
    this.description = description;
    this.iconSvg = iconSvg || this.defaultIcon();
  }

  defaultIcon() {
    return `
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 15L15 25M15 15L25 25" stroke="#00ff66" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  render() {
    return `
      <div class="problem-card" data-component="problem-card">
        <div class="problem-card__icon">
          ${this.iconSvg}
        </div>
        <div class="problem-card__content">
          <h3 class="problem-card__title">${this.title}</h3>
          <p class="problem-card__description">${this.description}</p>
        </div>
      </div>
    `;
  }
}

class StatItem {
  constructor(number, description) {
    this.number = number;
    this.description = description;
  }

  render() {
    return `
      <div class="stat-item" data-component="stat-item">
        <span class="stat-item__number">${this.number}</span>
        <span class="stat-item__description">${this.description}</span>
      </div>
    `;
  }
}

class HeroImage {
  constructor(imageUrl, alt, options = {}) {
    this.imageUrl = imageUrl;
    this.alt = alt;
    this.aspectRatio = options.aspectRatio || null;
    this.hasOverlay = options.hasOverlay || false;
    this.videoThumbnail = options.videoThumbnail || false;
  }

  render() {
    const aspectStyle = this.aspectRatio ? `style="aspect-ratio: ${this.aspectRatio}"` : '';
    const overlayHtml = this.hasOverlay ? '<div class="hero-image__overlay"></div>' : '';
    const playButtonHtml = this.videoThumbnail ? `
      <button class="hero-image__play-button" aria-label="Play video">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill="rgba(0, 255, 102, 0.9)"/>
          <path d="M20 15L35 25L20 35V15Z" fill="#010f07"/>
        </svg>
      </button>
    ` : '';

    return `
      <div class="hero-image" data-component="hero-image" ${aspectStyle}>
        <img src="${this.imageUrl}" alt="${this.alt}" class="hero-image__img" loading="lazy">
        ${overlayHtml}
        ${playButtonHtml}
      </div>
    `;
  }
}

// Component Factory for easy creation
class ComponentFactory {
  static createLogoCard(logoUrl, logoAlt) {
    return new LogoCard(logoUrl, logoAlt).render();
  }

  static createCtaButton(text, type = 'primary', href = null) {
    return new CtaButton(text, type, href).render();
  }

  static createProblemCard(title, description, iconSvg = null) {
    return new ProblemCard(title, description, iconSvg).render();
  }

  static createStatItem(number, description) {
    return new StatItem(number, description).render();
  }

  static createHeroImage(imageUrl, alt, options = {}) {
    return new HeroImage(imageUrl, alt, options).render();
  }
}

// Utility function to inject components into DOM
class ComponentInjector {
  /**
   * Inject component HTML into a target element
   * @param {string} targetSelector - CSS selector for target element
   * @param {string} componentHtml - Rendered component HTML
   * @param {string} position - 'append', 'prepend', or 'replace'
   */
  static inject(targetSelector, componentHtml, position = 'append') {
    const target = document.querySelector(targetSelector);
    if (!target) {
      console.error(`Target element not found: ${targetSelector}`);
      return;
    }

    switch (position) {
      case 'append':
        target.insertAdjacentHTML('beforeend', componentHtml);
        break;
      case 'prepend':
        target.insertAdjacentHTML('afterbegin', componentHtml);
        break;
      case 'replace':
        target.innerHTML = componentHtml;
        break;
      default:
        console.error(`Invalid position: ${position}`);
    }
  }

  /**
   * Inject multiple components
   * @param {string} targetSelector - CSS selector for target element
   * @param {Array<string>} componentsArray - Array of rendered component HTML strings
   */
  static injectMultiple(targetSelector, componentsArray) {
    const combinedHtml = componentsArray.join('');
    this.inject(targetSelector, combinedHtml, 'replace');
  }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ComponentRenderer,
    LogoCard,
    CtaButton,
    ProblemCard,
    StatItem,
    HeroImage,
    ComponentFactory,
    ComponentInjector
  };
}

// Make available globally for direct use
window.OMHComponents = {
  ComponentRenderer,
  LogoCard,
  CtaButton,
  ProblemCard,
  StatItem,
  HeroImage,
  ComponentFactory,
  ComponentInjector
};

console.log('OMH Component Library loaded successfully');