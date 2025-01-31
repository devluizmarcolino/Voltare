const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const menuOverlay = document.getElementById("menu-overlay");
const menuContainer = mobileMenu.querySelector(".menu-slide-enter");
const menuItems = document.querySelectorAll(".menu-item-enter");

function openMenu() {
  mobileMenu.style.visibility = "visible";

  menuOverlay.style.opacity = "1";

  menuContainer.classList.add("menu-slide-enter-active");

  menuItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("menu-item-visible");
    }, 200 + index * 100);
  });

  document.body.style.overflow = "hidden";
}

function closeMenu() {
  menuOverlay.style.opacity = "0";
  menuContainer.classList.remove("menu-slide-enter-active");

  menuItems.forEach((item) => {
    item.classList.remove("menu-item-visible");
  });

  setTimeout(() => {
    mobileMenu.style.visibility = "hidden";
    document.body.style.overflow = "";
  }, 400);
}


menuItems.forEach((item) => {
  item.addEventListener("click", closeMenu);
});

mobileMenuButton.addEventListener("click", openMenu);
mobileMenuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);
