$(document).ready(function () {
<<<<<<< HEAD

  // Hamburger menu toggle
  $("#menu-icon").click(function () {
    $("#nav-menu").toggleClass("active");
  });

  $(".navbar a").click(function () {
    $("#nav-menu").removeClass("active");
  });

=======
  // $("#menu-icon").click(function () {
  //   $("#nav-menu").toggleClass("active");
  // });

  // $(".navbar a").click(function () {
  //   $("#nav-menu").removeClass("active");
  // });
  $("#menu-icon").on('click touchstart', function (e) {
    e.preventDefault();
    $("#nav-menu").toggleClass("active");
  });

  $(".navbar a").on('click touchstart', function () {
    $("#nav-menu").removeClass("active");
  });


>>>>>>> 9baba468bea50da7fae7670bc28b0a1e53c91234
  //sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  $(".header ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 40;

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });


  //Initial content revealing js
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

  //contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Message sent successfully"
        setTimeout(function () {
          msg.innerHTML = ""
        }, 5000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })

});

function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update the active dot
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Handle next button click
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length; // Move to the next slide, loop back if at the end
  updateSlider();
});

// Handle previous button click
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Move to the previous slide, loop back if at the beginning
  updateSlider();
});

// Handle dot clicks (optional)
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index; // Set the currentIndex to the clicked dot's index
    updateSlider();
  });
});
