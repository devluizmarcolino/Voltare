class MobileMenuController {
  constructor() {
    this.mobileMenuButton = document.getElementById("mobile-menu-button");
    this.mobileMenuClose = document.getElementById("mobile-menu-close");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.menuOverlay = document.getElementById("menu-overlay");
    this.menuContainer = this.mobileMenu.querySelector(".menu-slide-enter");
    this.menuItems = document.querySelectorAll(".menu-item-enter");

    this.animationDelay = 200;
    this.animationDuration = 400;
    this.itemDelay = 100;

    this.isOpen = false;

    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.init();
  }

  init() {
    this.mobileMenuButton.addEventListener("click", () => this.openMenu());
    this.mobileMenuClose.addEventListener("click", () => this.closeMenu());
    this.menuOverlay.addEventListener("click", () => this.closeMenu());

    this.menuItems.forEach((item) => {
      item.addEventListener("click", () => this.closeMenu());
    });

    window.addEventListener("resize", this.handleResize);
    document.addEventListener("keydown", this.handleEscapeKey);
  }

  openMenu() {
    if (this.isOpen) return;

    this.isOpen = true;
    this.mobileMenu.style.visibility = "visible";

    
    requestAnimationFrame(() => {
      this.menuOverlay.style.opacity = "1";
      this.menuContainer.classList.add("menu-slide-enter-active");
    });

    
    this.menuItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("menu-item-visible");
      }, this.animationDelay + index * this.itemDelay);
    });

    
    document.body.style.overflow = "hidden";
  }

  closeMenu() {
    if (!this.isOpen) return;

    this.isOpen = false;

  
    this.menuOverlay.style.opacity = "0";
    this.menuContainer.classList.remove("menu-slide-enter-active");

    
    this.menuItems.forEach((item) => {
      item.classList.remove("menu-item-visible");
    });

    
    setTimeout(() => {
      if (!this.isOpen) {
        this.mobileMenu.style.visibility = "hidden";
        document.body.style.overflow = "";
      }
    }, this.animationDuration);
  }

  handleEscapeKey(event) {
    if (event.key === "Escape" && this.isOpen) {
      this.closeMenu();
    }
  }

  handleResize() {
    if (window.innerWidth >= 768 && this.isOpen) {
      this.closeMenu();
    }
  }


  destroy() {
    window.removeEventListener("resize", this.handleResize);
    document.removeEventListener("keydown", this.handleEscapeKey);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = new MobileMenuController();
});

function animateProjectCards() {
    const cards = document.querySelectorAll('.grid > div');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInCards = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const observer = new IntersectionObserver(fadeInCards, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}