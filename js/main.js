/* ============================================
   Cyprus Hookah Guide - Main JavaScript
   ============================================ */

(function() {
  'use strict';

  /* ============================================
     Age Verification
     ============================================ */
  const AGE_VERIFIED_KEY = 'cyprus_hookah_age_verified';

  function initAgeVerification() {
    const modal = document.getElementById('age-modal');
    if (!modal) return;

    const isVerified = localStorage.getItem(AGE_VERIFIED_KEY);

    if (isVerified === 'true') {
      modal.classList.add('age-modal--hidden');
      document.body.style.overflow = '';
      return;
    }

    // Show modal
    document.body.style.overflow = 'hidden';

    const confirmBtn = document.getElementById('age-confirm');
    const denyBtn = document.getElementById('age-deny');

    if (confirmBtn) {
      confirmBtn.addEventListener('click', function() {
        localStorage.setItem(AGE_VERIFIED_KEY, 'true');
        modal.classList.add('age-modal--hidden');
        document.body.style.overflow = '';
      });
    }

    if (denyBtn) {
      denyBtn.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
      });
    }
  }

  /* ============================================
     Mobile Navigation
     ============================================ */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() {
      nav.classList.toggle('nav--open');
      toggle.classList.toggle('nav-toggle--active');
    });

    // Close menu on link click
    const navLinks = nav.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('nav--open');
        toggle.classList.remove('nav-toggle--active');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('nav--open');
        toggle.classList.remove('nav-toggle--active');
      }
    });
  }

  /* ============================================
     Smooth Scroll
     ============================================ */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ============================================
     Header Scroll Effect
     ============================================ */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  /* ============================================
     Intersection Observer for Animations
     ============================================ */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.city-card, .venue-card');

    if (!elements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function(el) {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  /* ============================================
     Initialize
     ============================================ */
  document.addEventListener('DOMContentLoaded', function() {
    initAgeVerification();
    initMobileNav();
    initSmoothScroll();
    initHeaderScroll();
    initScrollAnimations();
  });

})();
