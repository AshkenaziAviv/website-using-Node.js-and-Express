// alert("hello world");

$(document).ready(function () {
  var modal = $("#about-modal");
  var closeBtn = $(".close");

  $("#about-link").click(function () {
    modal.show();
  });

  closeBtn.click(function () {
    modal.hide();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth <= 768; // set a threshold value for the mobile screen width
  if (isMobile) {
    const elements = document.querySelectorAll(".enlarge-on-hover");
    const options = {
      rootMargin: "20px",
      threshold: 0.9,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // add the "enlarged" class to the current element to scale it up
          entry.target.classList.add("enlarged");
          // remove the "enlarged" class from the previous element to scale it down
          if (index > 0) {
            elements[index - 1].classList.remove("enlarged");
          }
        } else {
          // remove the "enlarged" class from all elements that are not visible in the viewport
          entry.target.classList.remove("enlarged");
        }
        // remove the "enlarged" class from all elements when the user scrolls back to the top of the page
        if (window.scrollY === 0) {
          elements.forEach((element) => {
            element.classList.remove("enlarged");
          });
        }
      });
    }, options);
    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  const nav = document.querySelector(".navbar");
  const navItems = nav.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Close the mobile navigation menu
      nav.querySelector(".navbar-toggler").classList.add("collapsed");
      nav.querySelector(".navbar-collapse").classList.remove("show");
    });
  });
});
