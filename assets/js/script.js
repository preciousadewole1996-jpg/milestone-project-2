/* Favorite Catering Services - interactivity (all code written by me) */
(function () {
  "use strict";

  // Show a message in a feedback element, styled as success or error
  function showMessage(element, text, type) {
    element.textContent = text;
    element.className = "info-box " + (type || "");
  }

  // Mobile navigation toggle
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");
  navToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Highlight the nav link for the section being viewed
  var navLinks = mainNav.querySelectorAll("a");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (other) { other.classList.remove("active"); });
      link.classList.add("active");
      mainNav.classList.remove("open");
    });
  });

  // Service tags: show details of the chosen service
  var tags = document.querySelectorAll(".tag");
  var tagInfo = document.getElementById("tag-info");
  tags.forEach(function (tag) {
    tag.addEventListener("click", function () {
      tags.forEach(function (other) { other.classList.remove("selected"); });
      tag.classList.add("selected");
      showMessage(tagInfo, tag.dataset.info, "");
    });
  });

  // Estimate form: validate guests and package, then show the total
  document.getElementById("estimate-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var result = document.getElementById("estimate-result");
    var guests = parseInt(document.getElementById("guests").value, 10);
    var price = parseInt(document.getElementById("package").value, 10);
    if (isNaN(guests)) {
      showMessage(result, "Please enter the number of guests.", "error");
    } else if (guests < 10 || guests > 1000) {
      showMessage(result, "Guests must be between 10 and 1000.", "error");
    } else if (isNaN(price)) {
      showMessage(result, "Please choose a package.", "error");
    } else {
      showMessage(result, "Estimated cost: ₦" + (guests * price).toLocaleString("en-NG") + ". Contact us for a final quote.", "success");
    }
  });

  // Contact form: presence and format checks
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var feedback = document.getElementById("contact-feedback");
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === "") {
      showMessage(feedback, "Please enter your name.", "error");
    } else if (!emailPattern.test(email)) {
      showMessage(feedback, "Please enter a valid email address.", "error");
    } else if (message.length < 10) {
      showMessage(feedback, "Your message should be at least 10 characters.", "error");
    } else {
      showMessage(feedback, "Thank you, " + name + "! We will reply to " + email + " soon.", "success");
      event.target.reset();
    }
  });
}());
