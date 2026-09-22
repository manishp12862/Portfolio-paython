/**
 * Manish Patil Portfolio — 21st.dev Modern Script & Three.js Canvas
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     1. Theme Toggle (Dark Mode / Light Mode)
     ------------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('manish_theme') || 'dark';

  if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
  } else {
    body.classList.add('dark-mode');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('manish_theme', isDark ? 'dark' : 'light');
    });
  }

  /* ------------------------------------------------------------------------
     2. 21st.dev Spotlight Mouse Move Tracker
     ------------------------------------------------------------------------ */
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ------------------------------------------------------------------------
     3. Mobile Menu Toggle & Navigation
     ------------------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. Active Nav Item Highlighting on Scroll
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const handleScrollSpy = () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  /* ------------------------------------------------------------------------
     5. Skill Filter Tabs
     ------------------------------------------------------------------------ */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     6. Copy Email to Clipboard & Toast Notifications
     ------------------------------------------------------------------------ */
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'success') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #10b981;">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-fadeout');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2800);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'manishpatil3051@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        }).catch(() => {
          fallbackCopy(email);
        });
      } else {
        fallbackCopy(email);
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied ${text} to clipboard!`);
  }

  /* ------------------------------------------------------------------------
     7. Animated Number Counters
     ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = (element, target) => {
    let current = 0;
    const increment = target / 35;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + '+';
      }
    }, 30);
  };

  if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
            countUp(stat, target);
          });
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });

    const statsSection = document.getElementById('about');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  /* ------------------------------------------------------------------------
     8. Contact Form Submission
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      const mailtoUrl = `mailto:manishpatil3051@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailtoUrl;
      showToast('Opening default email client...');
      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
     9. Interactive Three.js Hero 3D Particle Constellation
     ------------------------------------------------------------------------ */
  initThreeHero();
});

function initThreeHero() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 24;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });

  const updateRendererSize = () => {
    const heroSection = document.getElementById('home') || document.body;
    const width = heroSection.clientWidth;
    const height = heroSection.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  updateRendererSize();
  window.addEventListener('resize', updateRendererSize);

  // Particles & Connected Constellation Nodes
  const particleCount = window.innerWidth < 768 ? 60 : 120;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  const bounds = { x: 26, y: 16, z: 12 };

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * bounds.x * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2;

    velocities.push({
      x: (Math.random() - 0.5) * 0.018,
      y: (Math.random() - 0.5) * 0.018,
      z: (Math.random() - 0.5) * 0.012
    });
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Particle Material
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x818cf8,
    size: 0.55,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, particleMaterial);
  scene.add(particleSystem);

  // Central floating wireframe geometric accent
  const knotGeo = new THREE.IcosahedronGeometry(4.5, 1);
  const knotMat = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });
  const centralMesh = new THREE.Mesh(knotGeo, knotMat);
  centralMesh.position.set(6, 0, -2);
  scene.add(centralMesh);

  // Outer ring
  const ringGeo = new THREE.TorusGeometry(7.5, 0.05, 8, 48);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.2
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.position.copy(centralMesh.position);
  scene.add(ringMesh);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Touch support for mobile devices
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }, { passive: true });

  // Pausing loop when hero is out of screen (battery & performance efficiency)
  let isHeroVisible = true;
  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });

    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroObserver.observe(heroSection);
    }
  }

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (!isHeroVisible) return;

    const elapsedTime = clock.getElapsedTime();

    // Smooth camera damping
    targetX += (mouseX * 4 - targetX) * 0.04;
    targetY += (mouseY * 4 - targetY) * 0.04;

    camera.position.x = targetX;
    camera.position.y = targetY;
    camera.lookAt(0, 0, 0);

    // Animate central wireframe mesh
    centralMesh.rotation.x = elapsedTime * 0.15;
    centralMesh.rotation.y = elapsedTime * 0.2;
    ringMesh.rotation.x = -elapsedTime * 0.1;
    ringMesh.rotation.y = elapsedTime * 0.12;

    // Update particle positions
    const posArray = geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      posArray[idx] += velocities[i].x;
      posArray[idx + 1] += velocities[i].y;
      posArray[idx + 2] += velocities[i].z;

      // Bounce off boundaries
      if (Math.abs(posArray[idx]) > bounds.x) velocities[i].x *= -1;
      if (Math.abs(posArray[idx + 1]) > bounds.y) velocities[i].y *= -1;
      if (Math.abs(posArray[idx + 2]) > bounds.z) velocities[i].z *= -1;
    }
    geometry.attributes.position.needsUpdate = true;

    // Slowly rotate entire particle field
    particleSystem.rotation.y = elapsedTime * 0.03;

    renderer.render(scene, camera);
  }

  animate();
}
