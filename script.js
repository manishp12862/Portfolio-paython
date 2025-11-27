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

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat, .contact-item').forEach(el => {
  observer.observe(el);
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

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    typeWriter(heroTitle, originalText, 50);
  }
});

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

// Skills animation on scroll
const skillTags = document.querySelectorAll('.skill-tag');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
      }, index * 100);
    }
  });
}, { threshold: 0.5 });

skillTags.forEach(tag => {
  tag.style.transform = 'translateY(20px)';
  tag.style.opacity = '0';
  tag.style.transition = 'all 0.3s ease';
  skillObserver.observe(tag);
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

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
