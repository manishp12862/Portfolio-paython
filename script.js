// Navbar background on scroll (defined early so it can be used by theme toggle)
function updateNavbarOnScroll() {
  const navbar = document.querySelector('.navbar');
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  if (window.scrollY > 50) {
    if (isDarkMode) {
      navbar.style.background = 'rgba(31, 41, 55, 0.98)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    }
    navbar.style.boxShadow = isDarkMode ? '0 2px 20px rgba(0, 0, 0, 0.5)' : '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    if (isDarkMode) {
      navbar.style.background = 'rgba(31, 41, 55, 0.95)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    navbar.style.boxShadow = 'none';
  }
}


// Theme Toggle Functionality
(function() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Check localStorage or default to dark mode
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply theme on page load
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
  
  // Theme toggle button click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      
      // Save theme preference
      const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      
      // Update navbar after theme change
      setTimeout(updateNavbarOnScroll, 50);
    });
  }
})();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Get navbar height (70px on desktop, 60px on mobile)
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 70;
      const targetPosition = target.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    }
  });
});

window.addEventListener('scroll', updateNavbarOnScroll);

// Initialize navbar on page load
window.addEventListener('load', () => {
  updateNavbarOnScroll();
});

// Enhanced Intersection Observer for smooth animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation with staggered delay
document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat, .contact-item').forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(el);
});

// Staggered animation for skill tags
const skillTags = document.querySelectorAll('.skill-tag');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate');
      }, index * 50);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

skillTags.forEach(tag => {
  skillObserver.observe(tag);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // Create mailto link
  const mailtoLink = `mailto:manishpatil3051@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  // Show success message
  showNotification('Thank you! Your email client should open now.', 'success');
  
  // Reset form
  contactForm.reset();
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  // Set background color based on type
  switch(type) {
    case 'success':
      notification.style.background = '#10b981';
      break;
    case 'error':
      notification.style.background = '#ef4444';
      break;
    default:
      notification.style.background = '#2563eb';
  }
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Typing animation removed - using CSS animations instead for hero title

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image img');
  
  if (hero && heroImage) {
    const rate = scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
});

// Enhanced project cards with 3D tilt effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// Smooth scroll with easing
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (!element) return;
  
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 70;
  const targetPosition = element.offsetTop - navbarHeight;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Enhanced scroll animations
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Parallax effect for hero image
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage && scrollTop < window.innerHeight) {
    const rate = scrollTop * -0.5;
    heroImage.style.transform = `translateY(${rate}px) scale(1)`;
  }
  
  lastScrollTop = scrollTop;
}, { passive: true });

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  }
  
  updateCounter();
}

// Initialize counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('h3');
      const targetValue = parseInt(statNumber.textContent);
      animateCounter(statNumber, targetValue);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
  statsObserver.observe(stat);
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyles = `
  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  body.loaded {
    opacity: 1;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Three.js 3D Scene
window.addEventListener('load', function initThreeJS() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || !window.THREE) {
    // Retry if Three.js hasn't loaded yet
    setTimeout(initThreeJS, 100);
    return;
  }

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Create floating geometric shapes
  const geometries = [];
  const materials = [];
  const meshes = [];
  
  // Create multiple 3D objects
  for (let i = 0; i < 20; i++) {
    let geometry;
    const rand = Math.random();
    
    if (rand < 0.33) {
      geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    } else if (rand < 0.66) {
      geometry = new THREE.OctahedronGeometry(0.4);
    } else {
      geometry = new THREE.TetrahedronGeometry(0.4);
    }
    
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
      metalness: 0.3,
      roughness: 0.4,
      transparent: true,
      opacity: 0.6
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    
    // Random position
    mesh.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    );
    
    // Random rotation speed
    mesh.userData = {
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      },
      floatSpeed: Math.random() * 0.01 + 0.005,
      floatAmplitude: Math.random() * 2 + 1,
      initialY: mesh.position.y
    };
    
    scene.add(mesh);
    meshes.push(mesh);
  }

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add directional lights
  const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
  light1.position.set(5, 5, 5);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
  light2.position.set(-5, -5, -5);
  scene.add(light2);

  // Camera position
  camera.position.z = 5;

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Rotate camera based on mouse
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Animate meshes
    meshes.forEach((mesh, index) => {
      // Rotation
      mesh.rotation.x += mesh.userData.rotationSpeed.x;
      mesh.rotation.y += mesh.userData.rotationSpeed.y;
      mesh.rotation.z += mesh.userData.rotationSpeed.z;

      // Floating animation
      mesh.position.y = mesh.userData.initialY + Math.sin(time * mesh.userData.floatSpeed + index) * mesh.userData.floatAmplitude;
      
      // Gentle movement
      mesh.position.x += Math.sin(time * 0.5 + index) * 0.001;
      mesh.position.z += Math.cos(time * 0.5 + index) * 0.001;
    });

    renderer.render(scene, camera);
  }

  // Handle window resize
  function handleResize() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    }
  }

  window.addEventListener('resize', handleResize);
  
  // Initial resize
  handleResize();

  // Start animation
  animate();
});
