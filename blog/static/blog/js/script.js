// Loading screen
window.addEventListener("load", function () {
  setTimeout(() => {
    const loading = document.getElementById("loading");
    loading.classList.add("fade-out");
    setTimeout(() => {
      loading.style.display = "none";
    }, 500);
  }, 1500);
});

// Particles Animation
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.resize();
    this.init();
    this.animate();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > this.canvas.width)
        particle.speedX *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height)
        particle.speedY *= -1;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particles
const particleSystem = new ParticleSystem(
  document.getElementById("particles-canvas")
);

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target.toLocaleString("fa-IR");
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current).toLocaleString("fa-IR");
      }
    }, 20);
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("stats")) {
        animateCounters();
      }
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll(".stats, .post-card, .featured").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 0.8s ease";
  observer.observe(el);
});

// Smooth scrolling
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: "smooth",
  });
}

// Newsletter subscription
function subscribeNewsletter(event) {
  event.preventDefault();
  const email = event.target.querySelector("input").value;

  // Show success animation
  const btn = event.target.querySelector("button");
  const originalText = btn.textContent;
  btn.innerHTML = '<i class="fas fa-check"></i> ثبت شد!';
  btn.style.background = "#2ecc71";

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = "#fff";
    event.target.reset();
  }, 3000);

  // Here you would typically send the email to your Django backend
  console.log("Newsletter subscription:", email);
}

// Post click handler
function openPost(postId) {
  // Add click animation
  event.currentTarget.style.transform = "scale(0.95)";
  setTimeout(() => {
    event.currentTarget.style.transform = "";
  }, 150);

  // Here you would typically navigate to the post detail page
  console.log("Opening post:", postId);
  // window.location.href = `/post/${postId}/`;
}

// Dynamic background color change on scroll
window.addEventListener("scroll", function () {
  const scrollPercent =
    window.scrollY /
    (document.documentElement.scrollHeight - window.innerHeight);
  const hue = 220 + scrollPercent * 60; // Changes from blue to purple
  document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%) 0%, hsl(${
    hue + 30
  }, 60%, 50%) 100%)`;
});

// Mouse trail effect
let mouseTrail = [];
document.addEventListener("mousemove", function (e) {
  mouseTrail.push({
    x: e.clientX,
    y: e.clientY,
    timestamp: Date.now(),
  });

  // Remove old trail points
  mouseTrail = mouseTrail.filter(
    (point) => Date.now() - point.timestamp < 1000
  );

  // Create trail effect
  if (mouseTrail.length > 1) {
    const trail = document.createElement("div");
    trail.style.position = "fixed";
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";
    trail.style.width = "4px";
    trail.style.height = "4px";
    trail.style.background = "rgba(78, 205, 196, 0.6)";
    trail.style.borderRadius = "50%";
    trail.style.pointerEvents = "none";
    trail.style.zIndex = "9999";
    trail.style.animation = "trailFade 0.8s ease-out forwards";

    document.body.appendChild(trail);

    setTimeout(() => {
      trail.remove();
    }, 800);
  }
});

// Add trail fade animation
const style = document.createElement("style");
style.textContent = `
            @keyframes trailFade {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add floating elements
function createFloatingElement() {
  const element = document.createElement("div");
  element.style.position = "fixed";
  element.style.width = "6px";
  element.style.height = "6px";
  element.style.background = "rgba(255, 255, 255, 0.3)";
  element.style.borderRadius = "50%";
  element.style.pointerEvents = "none";
  element.style.left = Math.random() * window.innerWidth + "px";
  element.style.top = window.innerHeight + "px";
  element.style.zIndex = "-1";

  const duration = Math.random() * 15000 + 10000;
  element.style.animation = `floatUp ${duration}ms linear forwards`;

  document.body.appendChild(element);

  setTimeout(() => {
    element.remove();
  }, duration);
}

// Add floating animation
const floatingStyle = document.createElement("style");
floatingStyle.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(floatingStyle);

// Create floating elements periodically
setInterval(createFloatingElement, 3000);

// Add click ripple effect
document.addEventListener("click", function (e) {
  if (e.target.closest(".btn-primary, .btn-secondary, .post-card")) {
    const ripple = document.createElement("div");
    const rect = e.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255, 255, 255, 0.6)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.pointerEvents = "none";

    e.target.style.position = "relative";
    e.target.style.overflow = "hidden";
    e.target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Add ripple animation
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(rippleStyle);

// Text typing effect for hero
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect after loading
setTimeout(() => {
  const heroTitle = document.querySelector(".hero h1");
  const originalText = heroTitle.textContent;
  typeWriter(heroTitle, originalText, 80);
}, 2000);

// Add hover sound effect (visual feedback)
document
  .querySelectorAll(".post-card, .btn-primary, .btn-secondary")
  .forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.filter = "brightness(1.1)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.filter = "brightness(1)";
    });
  });

// Random gradient animation
function animateGradient() {
  const colors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  ];

  setInterval(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = randomColor;
  }, 15000);
}

// Start gradient animation
setTimeout(animateGradient, 5000);

// Add easter egg - konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > 10) konamiCode.shift();

  if (konamiCode.join("") === konami.join("")) {
    // Easter egg activated!
    document.body.style.animation = "rainbow 2s ease-in-out";
    setTimeout(() => {
      document.body.style.animation = "";
    }, 2000);
  }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement("style");
rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
document.head.appendChild(rainbowStyle);
