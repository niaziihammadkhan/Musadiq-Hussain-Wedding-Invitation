/**
 * LUXURY PAKISTANI WEDDING INVITATION INTERACTIVE LOGIC
 * - 3D Door opening & unsealing choreography
 * - Replay functionality without scroll-jacking
 * - IntersectionObserver scroll reveal system
 * - Accessible keyboard & prefers-reduced-motion handling
 */

document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('invitationEnvelope');
  const openBtn = document.getElementById('openDoorBtn');
  const replayBtn = document.getElementById('replayBtn');
  const scrollCue = document.getElementById('scrollCue');

  // Check if system prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * 1. OPEN THE INVITATION DOORS
   */
  function openInvitation() {
    if (envelope.classList.contains('is-open')) return;

    envelope.classList.add('is-open');

    // Accessibility announcement for screen readers
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    envelope.setAttribute('aria-label', 'Invitation Card Opened');

    // Smooth subtle scroll cue after delay (if not reduced motion)
    if (!prefersReducedMotion) {
      setTimeout(() => {
        if (window.scrollY < 80) {
          scrollCue?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 1600);
    }
  }

  /**
   * 2. REPLAY INVITATION ANIMATION
   */
  function replayInvitation() {
    // Scroll cleanly back to top stage first
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close doors gently, then re-open after an intentional anticipation pause
    envelope.classList.remove('is-open');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');

    setTimeout(() => {
      openInvitation();
    }, 700);
  }

  // Event Listeners for Opening & Replaying
  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openInvitation();
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', replayInvitation);
  }

  // Also allow clicking anywhere on the closed doors to open
  const doorLeft = document.getElementById('doorLeft');
  const doorRight = document.getElementById('doorRight');
  [doorLeft, doorRight].forEach(door => {
    if (door) {
      door.addEventListener('click', () => {
        if (!envelope.classList.contains('is-open')) {
          openInvitation();
        }
      });
    }
  });

  /**
   * 3. KEYBOARD ACCESSIBILITY
   */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && envelope.classList.contains('is-open')) {
      envelope.classList.remove('is-open');
      openBtn?.focus();
    }
  });

  /**
   * 4. SCROLL-DRIVEN INTERSECTION OBSERVER ANIMATIONS
   */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /**
   * 5. ELEGANT MOUSE-MOVE BOTANICAL PARALLAX (DESKTOP ONLY)
   */
  if (!prefersReducedMotion && window.innerWidth > 1024) {
    const floraLeft = document.querySelector('.flora-left');
    const floraRight = document.querySelector('.flora-right');

    window.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth) - 0.5;
      const mouseY = (e.clientY / window.innerHeight) - 0.5;

      if (floraLeft) {
        floraLeft.style.transform = `translate(${mouseX * 25}px, ${mouseY * 25}px) rotate(-10deg)`;
      }
      if (floraRight) {
        floraRight.style.transform = `translate(${-mouseX * 25}px, ${-mouseY * 25}px) scaleX(-1) rotate(-10deg)`;
      }
    }, { passive: true });
  }
});
