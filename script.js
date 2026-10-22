(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  menuButton?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.innerHTML = isOpen ? 'CLOSE <span>−</span>' : 'MENU <span>＋</span>';
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.innerHTML = 'MENU <span>＋</span>';
  }));

  const progressBar = document.getElementById('progressBar');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true }); updateProgress();

  // The tiny star cursor is intentionally disabled for touch and reduced-motion users.
  const cursor = document.querySelector('.cursor-star');
  if (cursor && !reducedMotion && matchMedia('(pointer:fine)').matches) {
    cursor.style.opacity = '1';
    window.addEventListener('mousemove', e => {
      cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`;
    }, { passive: true });
    document.querySelectorAll('a, button, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.7) rotate(18deg)');
      el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1) rotate(0)');
    });
  }

  if (!window.gsap || !window.ScrollTrigger || reducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-frame', { opacity: 0, y: -12, duration: .7, ease: 'power2.out' });
  gsap.from('.intro-small', { opacity: 0, y: -20, rotate: -7, duration: .7, delay: .15, ease: 'back.out(1.4)' });
  // Animate name words one after another while keeping the handwritten layout intact.
  gsap.from('.hero-name span', { opacity: 0, y: 35, rotate: -4, duration: .8, stagger: .22, delay: .25, ease: 'power3.out' });
  gsap.from('.hero-photo-wrap', { opacity: 0, x: 90, rotate: 3, duration: 1.1, delay: .6, ease: 'power3.out' });
  gsap.from('.hero-tagline, .hero-bottom', { opacity: 0, y: 15, duration: .7, delay: .9, stagger: .1 });

  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 30, rotate: (i % 2 ? 1.5 : -1.5) }, {
      opacity: 1, y: 0, rotate: 0, duration: .75, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });
  // Slight depth movement on the hero cutout and stickers; no layout-affecting transforms.
  gsap.to('.hero-photo-wrap', { yPercent: -5, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .5 } });
  gsap.to('.sticker-star', { y: -30, rotate: 30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });

  // Pin and horizontally move the project cards on wide screens. On small screens they stack normally.
  const rail = document.querySelector('.project-rail');
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1051px)', () => {
    const distance = () => Math.max(0, rail.scrollWidth - rail.parentElement.clientWidth);
    gsap.to(rail, { x: () => -distance(), ease: 'none', scrollTrigger: {
      trigger: '.projects', start: 'top top', end: () => `+=${distance() + window.innerHeight * .5}`,
      scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true
    }});
  });
  // Draw-on highlight effect: the marker underline grows in when the heading enters view.
  document.querySelectorAll('.highlight').forEach(el => {
    el.style.backgroundSize = '0% 100%';
    el.style.backgroundImage = 'linear-gradient(#201a1c,#201a1c)';
    el.style.backgroundRepeat = 'no-repeat';
    gsap.to(el, { backgroundSize: '100% 100%', duration: .65, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
})();
