/**
 * ==============================================================================
 * Nithya Portfolio - Interactive JavaScript
 * Modern, clean, and responsive functionality
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initTypewriter();
  initScrollSpy();
  initBackToTop();
  initSkillBars();
  initStatCounters();
  initProjectFilters();
  initContactForm();
  initModals();
  updateFooterYear();
});

/**
 * 1. Mobile Navigation & Header Scrolled State
 */
function initNavbar() {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
    });

    // Close menu when clicking on any nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        const icon = menuToggle.querySelector("i");
        if (icon) {
          icon.className = "fa-solid fa-bars";
        }
      });
    });
  }

  // Header shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });
}

/**
 * 2. Typewriter Effect in Hero Section
 */
function initTypewriter() {
  const typewriterElement = document.getElementById("typewriter");
  if (!typewriterElement) return;

  const roles = [
    "First-Year CSE Student.",
    "Aspiring Software Engineer.",
    "Tech & Web Enthusiast.",
    "Problem Solver @ SNS College."
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseTime = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/**
 * 3. ScrollSpy: Highlight Active Nav Link
 */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNav() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav);
}

/**
 * 4. Back To Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * 5. Animated Skill Progress Bars (Triggered on Scroll)
 */
function initSkillBars() {
  const skillSection = document.getElementById("skills");
  const progressBars = document.querySelectorAll(".progress-bar");

  if (!skillSection || progressBars.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressBars.forEach((bar) => {
            const targetWidth = bar.style.getPropertyValue("--width") || "0%";
            bar.style.width = targetWidth;
          });
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(skillSection);
}

/**
 * 6. Quick Stat Counters Animation
 */
function initStatCounters() {
  const statsRow = document.querySelector(".stats-row");
  if (!statsRow) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          const statCards = document.querySelectorAll(".stat-card");

          statCards.forEach((card) => {
            const numEl = card.querySelector(".stat-number");
            if (!numEl) return;
            const target = parseInt(numEl.getAttribute("data-target"), 10);
            if (isNaN(target)) return;

            let count = 0;
            const duration = 1500;
            const stepTime = Math.max(Math.floor(duration / target), 20);

            const timer = setInterval(() => {
              count++;
              if (target === 1) {
                numEl.textContent = "1st";
                clearInterval(timer);
              } else if (target === 4) {
                numEl.textContent = count + "+";
                if (count >= target) clearInterval(timer);
              } else if (target === 100) {
                count += 4;
                if (count >= 100) {
                  count = 100;
                  clearInterval(timer);
                }
                numEl.textContent = count + "%";
              } else {
                numEl.textContent = count;
                if (count >= target) clearInterval(timer);
              }
            }, stepTime);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(statsRow);
}

/**
 * 7. Interactive Project Filters
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Toggle active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });
}

/**
 * 8. Contact Form Client-side Validation & Feedback
 */
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const statusBox = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  if (!contactForm || !statusBox) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showError(nameInput, "Please enter your name (at least 2 letters).");
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showError(messageInput, "Please enter a message of at least 10 characters.");
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) return;

    // Simulate sending with loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Show success feedback
      const senderName = nameInput.value.trim();
      statusBox.className = "form-status success";
      statusBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.2rem;"></i>
          <span>Thank you, <strong>${escapeHtml(senderName)}</strong>! Your message has been sent successfully. I'll get back to you soon.</span>
        </div>
      `;

      // Reset form
      contactForm.reset();

      // Clear success notification after 7 seconds
      setTimeout(() => {
        statusBox.className = "form-status";
        statusBox.innerHTML = "";
      }, 7000);
    }, 900);
  });

  // Clear errors on real-time typing
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
      clearError(input);
    });
  });

  function showError(inputEl, msg) {
    const group = inputEl.closest(".form-group");
    if (!group) return;
    group.classList.add("has-error");
    const errorEl = group.querySelector(".error-msg");
    if (errorEl) errorEl.textContent = msg;
  }

  function clearError(inputEl) {
    const group = inputEl.closest(".form-group");
    if (!group) return;
    group.classList.remove("has-error");
  }

  function escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

/**
 * 9. Project Modals Logic
 */
function initModals() {
  const overlay = document.getElementById("modal-overlay");
  if (!overlay) return;

  // Close when clicking outside of modal content
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });
}

function openModal(modalId) {
  const overlay = document.getElementById("modal-overlay");
  const targetModal = document.getElementById(modalId);

  if (!overlay || !targetModal) return;

  // Hide all modals first
  document.querySelectorAll(".modal-box").forEach((box) => box.classList.remove("active"));

  // Show requested modal
  targetModal.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  if (!overlay) return;

  overlay.classList.remove("active");
  document.querySelectorAll(".modal-box").forEach((box) => box.classList.remove("active"));
  document.body.style.overflow = "auto";
}

// Attach globally for inline onclick references
window.openModal = openModal;
window.closeModal = closeModal;

/**
 * 10. Dynamic Current Year in Footer
 */
function updateFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
