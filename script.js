document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu toggle
  const menuIcon = document.getElementById("menu-icon");
  const navMenu = document.getElementById("nav-menu");

  menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // Sticky header and active section update
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header-area");
    if (window.scrollY > 1) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
    updateActiveSection();
  });

  document.querySelectorAll(".header ul li a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (!target || target.classList.contains("active-section")) {
        return;
      }

      let offset = target.offsetTop;
      if (this.getAttribute("href") === "#home") {
        offset = 0;
      } else {
        offset = offset - 40;
      }

      window.scrollTo({
        top: offset,
        behavior: "smooth"
      });

      document.querySelectorAll(".header ul li a").forEach(a => a.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // ScrollReveal animations
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  // Contact form to Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(() => {
        msg.innerHTML = "Message sent successfully";
        setTimeout(() => { msg.innerHTML = ""; }, 5000);
        form.reset();
      })
      .catch(error => console.error('Error!', error.message));
  });
});

function updateActiveSection() {
  const scrollPosition = window.scrollY;
  const links = document.querySelectorAll(".header ul li a");

  if (scrollPosition === 0) {
    links.forEach(link => link.classList.remove("active"));
    const homeLink = document.querySelector(".header ul li a[href='#home']");
    if (homeLink) homeLink.classList.add("active");
    return;
  }

  document.querySelectorAll("section").forEach(section => {
    const target = section.getAttribute("id");
    const offset = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
      links.forEach(link => link.classList.remove("active"));
      const activeLink = document.querySelector(`.header ul li a[href="#${target}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}

// Slider functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });
});
