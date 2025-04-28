"use strict";

const rootEl = document.documentElement;
const themeBtn = document.querySelector(".navbar__theme-btn");
const lightBtn = document.querySelector(".navbar__theme-icon-sun");
const darkBtn = document.querySelector(".navbar__theme-icon-moon");
const navbarNav = document.querySelector(".navbar-nav");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const footerNavbarnav = document.querySelector(".footer__navbar-nav");
const goTopBtn = document.querySelector(".go-top-btn");
const slider = document.querySelector("#drag");

// Sticky Navbar ------------------------

function userScroll() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY >= 60) {
    navbar.classList.add("sticky");
    goTopBtn.classList.add("show");
  }
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 60) {
      navbar.classList.add("sticky");
      goTopBtn.classList.add("show");
    } else {
      navbar.classList.remove("sticky");
      goTopBtn.classList.remove("show");
    }
  });
}

window.addEventListener("DOMContentLoaded", userScroll);

// Go top Btn Function ------------------------
goTopBtn.addEventListener("click", () => (document.documentElement.scrollTop = 0));

// Active Nav Links ------------------------
function activeLink(e) {
  const targetHref = e.target.getAttribute("href");
  if (e.target.classList.contains("nav-link")) {
    navLinks.forEach((nav) => {
      nav.classList.remove("active");
      const navHref = nav.getAttribute("href");
      if (targetHref === navHref) {
        nav.classList.add("active");
      }
    });
  }
}
navbarNav.addEventListener("click", activeLink);
footerNavbarnav.addEventListener("click", activeLink);

// Dark Theme Switch ------------------------
themeBtn.addEventListener("click", () => {
  const htmlTheme = rootEl.getAttribute("data-bs-theme"),
    newTheme = htmlTheme === "light" ? "dark" : "light";
  rootEl.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  if (newTheme === "dark") {
    lightBtn.classList.add("show-icon");
    darkBtn.classList.remove("show-icon");
  } else {
    lightBtn.classList.remove("show-icon");
    darkBtn.classList.add("show-icon");
  }
});

// Implement Theme by Local Storage ------------------------
window.addEventListener("DOMContentLoaded", () => {
  const localStorageTheme = localStorage.getItem("theme");

  if (localStorageTheme) {
    rootEl.setAttribute("data-bs-theme", localStorageTheme);
    if (localStorageTheme === "dark") {
      lightBtn.classList.add("show-icon");
      darkBtn.classList.remove("show-icon");
    } else {
      lightBtn.classList.remove("show-icon");
      darkBtn.classList.add("show-icon");
    }
  }
});

// Drag Menu Navigation Buttons ------------------------
let mouseDown = false;
let startX, scrollLeft;
let startDragging = function (e) {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  // console.log();
};

let stopDragging = function (event) {
  mouseDown = false;
};

slider.addEventListener("mousemove", (e) => {
  e.preventDefault();
  if (!mouseDown) {
    return;
  }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
});

slider.addEventListener("mousedown", startDragging, false);
slider.addEventListener("mouseup", stopDragging, false);
slider.addEventListener("mouseleave", stopDragging, false);

// Scroll to Menu ------------------------
const dropdownMenu = document.querySelector(".navbar-nav .dropdown-menu");
const navPills = document.querySelector(".nav-pills");

dropdownMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("dropdown-item")) {
    const dropdownLink = e.target.getAttribute("href").slice(1);
    const menuNavBtns = document.querySelectorAll(".nav-pills .nav-link");
    const tabPanes = document.querySelectorAll(".tab-pane");
    menuNavBtns.forEach((btn) => {
      btn.classList.remove("active");
      const dataTarget = btn.getAttribute("data-bs-target").slice(1);
      if (dataTarget === dropdownLink) {
        btn.classList.add("active");

        tabPanes.forEach((tab) => {
          tab.classList.remove("active", "show");
          const tabId = tab.getAttribute("id");
          if (tabId === dropdownLink) {
            tab.classList.add("active", "show");
          }
        });
      }
    });
  }
});
