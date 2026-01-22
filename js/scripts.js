// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initializeAll();
});

/**
 * Complete initialization function
 */
function initializeAll() {
  // Core initialization order
  initNavigation();
  initPreloader();
  initSmoothScroll();
  initStickyNavigation();
  initMobileNavigation();
  initAOS();
  initBackToTop();
  initCopyrightYear();
  initPerformanceOptimizations();
  initErrorHandling();

  // Page-specific features detection and initialization
  checkPageSpecificFeatures();

  // Additional components
  initScrollProgress();
  initTrustIndicators();

  // Page-specific animations
  initAboutPageFeatures();
  initImplementationPageFeatures();
  initPricingPageFeatures();

  // External libraries initialization
  initSwiper();
  initParticlesJS();
  initGSAPAnimations();

  console.log("Lokta JS initialized successfully");
}

// ============================================
// CORE COMPONENTS
// ============================================

// 1. NAVIGATION MANAGEMENT
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const page = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    // Home page check
    const isHomePage = !page || page === "" || page === "index.html";

    // Home link check
    const isHomeLink =
      href === "#" ||
      href === "index.html" ||
      href === "./" ||
      href === "" ||
      href === "/";

    // If on home page and this is a home link, activate it
    if (isHomePage && isHomeLink) {
      link.classList.add("active");
    }

    // For other pages
    if (
      !isHomePage &&
      href &&
      href.includes(page.replace(".html", "")) &&
      !href.includes("#")
    ) {
      link.classList.add("active");
    }

    // Handle anchor clicks for smooth scrolling
    if (href?.startsWith("#")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        const target = document.getElementById(href.substring(1));
        if (target) {
          window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
        }
        closeMobileMenu();
      });
    }
  });
}

// 2. PRELOADER
function initPreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;

  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.classList.add("fade-out");
      setTimeout(function () {
        preloader.style.display = "none";
      }, 500);
    }, 500);
  });
}

// 3. SMOOTH SCROLLING
function initSmoothScroll() {
  const navbar = document.querySelector(".navbar");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "#!") return;

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      e.preventDefault();
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      closeMobileMenu();
    });
  });
}

// 4. STICKY NAVIGATION
function initStickyNavigation() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// 5. MOBILE NAVIGATION
function initMobileNavigation() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (!navbarToggler || !navbarCollapse) return;

  // Toggle mobile menu
  navbarToggler.addEventListener("click", function () {
    navbarCollapse.classList.toggle("active");
    this.classList.toggle("active");
    document.body.style.overflow = navbarCollapse.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close mobile menu when clicking on nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !navbarCollapse.contains(e.target) &&
      !navbarToggler.contains(e.target) &&
      navbarCollapse.classList.contains("active")
    ) {
      closeMobileMenu();
    }
  });
}

function closeMobileMenu() {
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  if (navbarCollapse && navbarCollapse.classList.contains("active")) {
    navbarCollapse.classList.remove("active");
    if (navbarToggler) navbarToggler.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// 6. AOS ANIMATIONS
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
      offset: 100,
      disable: window.innerWidth < 768,
    });
  }
}

// 7. BACK TO TOP BUTTON
function initBackToTop() {
  // Check if button already exists
  if (document.querySelector(".back-to-top")) return;

  // Create button
  const backToTopButton = document.createElement("button");
  backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTopButton.className = "back-to-top";
  backToTopButton.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(backToTopButton);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "flex";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  // Scroll to top when clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// 8. COPYRIGHT YEAR
function initCopyrightYear() {
  const copyrightElements = document.querySelectorAll(".footer-copyright");
  const currentYear = new Date().getFullYear();

  copyrightElements.forEach((element) => {
    if (element.innerHTML.includes("2025")) {
      element.innerHTML = element.innerHTML.replace(/2025/g, currentYear);
    }
  });
}

// 9. PERFORMANCE OPTIMIZATIONS
function initPerformanceOptimizations() {
  // Initialize lazy loading
  initLazyLoading();

  // Handle reduced motion preference
  checkReducedMotion();
}

function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }
}

function checkReducedMotion() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  if (prefersReducedMotion.matches) {
    document.body.classList.add("reduced-motion");
  }
}

// 10. ERROR HANDLING
function initErrorHandling() {
  // Handle missing images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      this.style.opacity = "0.5";
      if (!this.alt) this.alt = "Image not available";
    });
  });
}

// 11. SCROLL PROGRESS INDICATOR
function initScrollProgress() {
  if (document.querySelector(".scroll-progress")) return;

  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

// 12. TRUST INDICATORS COUNTER
function initTrustIndicators() {
  const trustNumbers = document.querySelectorAll(".trust-number");
  if (trustNumbers.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  trustNumbers.forEach((counter) => {
    observer.observe(counter);
  });

  function animateCounter(counter) {
    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ""));
    const count = parseInt(counter.textContent) || 0;
    const increment = Math.ceil(target / 100);
    let current = count;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current.toLocaleString();
    }, 20);
  }
}

// ============================================
// PAGE-SPECIFIC FEATURE DETECTION
// ============================================

function checkPageSpecificFeatures() {
  // Check for pricing page features
  if (
    document.getElementById("pricing-toggle") ||
    document.querySelector(".period-option")
  ) {
    initPricingToggle();
  }

  // Check for category tabs
  if (document.querySelector(".category-tabs")) {
    initCategoryTabs();
  }

  // Check for FAQ accordions
  if (document.querySelector(".accordion-item")) {
    initFAQAccordion();
  }
}

// ============================================
// PAGE-SPECIFIC FEATURES
// ============================================

// PRICING PAGE
function initPricingToggle() {
  // Method 1: Toggle switch
  const toggle = document.getElementById("pricing-toggle");
  if (toggle) {
    const monthlyPrices = document.querySelectorAll(".plan-price.monthly");
    const yearlyPrices = document.querySelectorAll(".plan-price.yearly");
    const yearlyPriceTotals = document.querySelectorAll(".plan-price-total");

    toggle.addEventListener("change", function () {
      if (toggle.checked) {
        monthlyPrices.forEach((price) => price.classList.remove("active"));
        yearlyPrices.forEach((price) => price.classList.add("active"));
        yearlyPriceTotals.forEach((total) => total.classList.add("active"));
      } else {
        monthlyPrices.forEach((price) => price.classList.add("active"));
        yearlyPrices.forEach((price) => price.classList.remove("active"));
        yearlyPriceTotals.forEach((total) => total.classList.remove("active"));
      }
    });
  }

  // Method 2: Period options
  const periodOptions = document.querySelectorAll(".period-option");
  if (periodOptions.length > 0) {
    const monthlyPrices = document.querySelectorAll(".plan-price.monthly");
    const yearlyPrices = document.querySelectorAll(".plan-price.yearly");
    const monthlyBilled = document.querySelectorAll(".billed-note.monthly");
    const yearlyBilled = document.querySelectorAll(".billed-note.yearly");

    periodOptions.forEach((option) => {
      option.addEventListener("click", function () {
        const period = this.getAttribute("data-period");

        // Update active option
        periodOptions.forEach((opt) => opt.classList.remove("active"));
        this.classList.add("active");

        // Update prices display
        if (period === "monthly") {
          monthlyPrices.forEach((price) => price.classList.add("active"));
          yearlyPrices.forEach((price) => price.classList.remove("active"));
          monthlyBilled.forEach((note) => note.classList.add("active"));
          yearlyBilled.forEach((note) => note.classList.remove("active"));
        } else {
          monthlyPrices.forEach((price) => price.classList.remove("active"));
          yearlyPrices.forEach((price) => price.classList.add("active"));
          monthlyBilled.forEach((note) => note.classList.remove("active"));
          yearlyBilled.forEach((note) => note.classList.add("active"));
        }
      });
    });
  }
}

function initPricingPageFeatures() {
  // Already handled in initPricingToggle
}

// CATEGORY TABS
function initCategoryTabs() {
  const categoryTabs = document.querySelectorAll(".category-tab");
  const featureCards = document.querySelectorAll(".feature-card-detailed");
  const featureShowcases = document.querySelectorAll(".feature-showcase-grid");
  const noResults = document.getElementById("no-results");

  if (categoryTabs.length === 0) return;

  function filterFeatures(category) {
    let visibleCards = 0;

    // Filter feature cards
    featureCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      if (category === "all" || cardCategory === category) {
        card.style.display = "block";
        visibleCards++;
      } else {
        card.style.display = "none";
      }
    });

    // Filter feature showcases
    featureShowcases.forEach((showcase) => {
      const showcaseCategory = showcase.getAttribute("data-category");
      if (category === "all" || showcaseCategory === category) {
        showcase.style.display = "grid";
      } else {
        showcase.style.display = "none";
      }
    });

    // Show/hide no results message
    if (noResults) {
      if (visibleCards === 0 && category !== "all") {
        noResults.style.display = "block";
      } else {
        noResults.style.display = "none";
      }
    }
  }

  // Category tab click handlers
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Update active tab
      categoryTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Filter features
      const category = this.getAttribute("data-category");
      filterFeatures(category);
    });
  });
}

// FAQ ACCORDION
function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");
  if (faqQuestions.length === 0) return;

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Close all other FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active");
        }
      });

      // Toggle current item
      if (!isActive) {
        faqItem.classList.add("active");
      } else {
        faqItem.classList.remove("active");
      }
    });
  });
}

// ============================================
// PAGE-SPECIFIC ANIMATIONS
// ============================================

// ABOUT PAGE
function initAboutPageFeatures() {
  // Check if we're on About page by looking for specific elements
  if (
    !document.querySelector(".timeline-item") &&
    !document.querySelector(".team-member")
  ) {
    return;
  }

  // Timeline Animation
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (timelineItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }
        });
      },
      { threshold: 0.1 },
    );

    timelineItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(50px)";
      item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(item);
    });
  }
}

// IMPLEMENTATION PAGE
function initImplementationPageFeatures() {
  // Check if we're on Implementation page
  const timelineSection = document.querySelector(".timeline-section");
  if (!timelineSection) return;

  // Timeline Scroll Animation
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineProgress = document.getElementById("timeline-progress");

  function updateTimeline() {
    let scrollPosition = window.scrollY;
    let timelineSection = document.querySelector(".timeline-section");
    if (!timelineSection) return;

    let timelineTop = timelineSection.offsetTop;
    let timelineHeight = timelineSection.offsetHeight;

    // Calculate progress percentage
    let progress =
      ((scrollPosition - timelineTop + 300) / timelineHeight) * 100;
    progress = Math.min(100, Math.max(0, progress));
    if (timelineProgress) {
      timelineProgress.style.height = progress + "%";
    }

    // Update active steps
    timelineItems.forEach((item, index) => {
      let itemTop = item.offsetTop;
      let itemHeight = item.offsetHeight;

      if (
        scrollPosition > itemTop - 300 &&
        scrollPosition < itemTop + itemHeight
      ) {
        item.classList.add("active");
        item.classList.add("visible");
      } else if (scrollPosition > itemTop + itemHeight) {
        item.classList.add("visible");
        item.classList.remove("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Initial update
  updateTimeline();

  // Update on scroll
  window.addEventListener("scroll", updateTimeline);

  // Make items visible as they scroll into view
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });

  // Training Tabs
  const trainingTabs = document.querySelectorAll(".training-tab");
  const trainingContents = document.querySelectorAll(".training-content");

  trainingTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Update active tab
      trainingTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding content
      trainingContents.forEach((content) => {
        content.classList.remove("active");
      });

      const targetContent = document.getElementById(tabId + "-content");
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // Initialize training content
  if (trainingContents.length > 0) {
    trainingContents[0].classList.add("active");
  }
}

// ============================================
// EXTERNAL LIBRARIES INITIALIZATION
// ============================================

function initSwiper() {
  if (typeof Swiper !== "undefined") {
    new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}

function initParticlesJS() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
        opacity: { value: 0.3, random: false },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.2,
          width: 1,
        },
        move: { enable: true, speed: 2, direction: "none", out_mode: "out" },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }
}

function initGSAPAnimations() {
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.from(".hero-title", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    });

    gsap.from(".hero-description", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 0.2,
    });

    gsap.from(".hero-cta", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
      delay: 0.4,
    });

    gsap.utils.toArray(".feature-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out",
      });
    });

    const highlights = document.querySelectorAll(".highlight-item");
    highlights.forEach((highlight, index) => {
      gsap.to(highlight, {
        y: 10,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }
}

// ============================================
// EXPORT FOR MODULE USAGE (IF NEEDED)
// ============================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializeAll,
    initNavigation,
    initMobileNavigation,
    initPricingToggle,
    initCategoryTabs,
    initAboutPageFeatures,
    initImplementationPageFeatures,
    initPricingPageFeatures,
  };
}
