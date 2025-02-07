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
// Seleciona o formulário
const contactForm = document.getElementById('contactForm');

// Adiciona o evento de submit ao formulário
contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Captura os valores dos campos
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString() // Adiciona a data atual
    };

    // Recupera mensagens existentes do localStorage
    const existingMessages = JSON.parse(localStorage.getItem('formMessages') || '[]');
    
    // Adiciona a nova mensagem ao array
    existingMessages.push(formData);
    
    // Salva o array atualizado no localStorage
    localStorage.setItem('formMessages', JSON.stringify(existingMessages));

    // Limpa o formulário
    contactForm.reset();

    // Mostra mensagem de sucesso
    alert('Mensagem enviada com sucesso!');
});

// Adiciona validação básica aos campos
const inputs = contactForm.querySelectorAll('input, textarea');
inputs.forEach((input) => {
  input.addEventListener("invalid", function (e) {
    e.preventDefault();
    this.classList.add("border-red-500");
    showCustomAlert(
      "Por favor, preencha todos os campos corretamente.",
      "Erro!"
    );
  });

  input.addEventListener("input", function () {
    if (this.validity.valid) {
      this.classList.remove("border-red-500");
    }
  });
});

// Adicione o elemento ao body
document.body.insertAdjacentHTML('beforeend', alertHTML);

// Função para mostrar o alert
function showCustomAlert(message, title = 'Sucesso!') {
    const alertElement = document.getElementById('custom-alert');
    const overlay = document.getElementById('alert-overlay');
    const alertBox = alertElement.querySelector('.relative');
    const titleElement = document.getElementById('alert-title');
    const messageElement = document.getElementById('alert-message');

    // Atualiza o conteúdo
    titleElement.textContent = title;
    messageElement.textContent = message;

    // Mostra o alert
    alertElement.classList.remove('invisible');
    setTimeout(() => {
        overlay.classList.add('opacity-100');
        alertBox.classList.remove('translate-y-8', 'opacity-0');
    }, 10);

    // Adiciona listener para fechar com ESC
    document.addEventListener('keydown', handleEscapeKey);
}

// Função para fechar o alert
function closeCustomAlert() {
    const alertElement = document.getElementById('custom-alert');
    const overlay = document.getElementById('alert-overlay');
    const alertBox = alertElement.querySelector('.relative');

    overlay.classList.remove('opacity-100');
    alertBox.classList.add('translate-y-8', 'opacity-0');

    setTimeout(() => {
        alertElement.classList.add('invisible');
    }, 300);

    // Remove o listener do ESC
    document.removeEventListener('keydown', handleEscapeKey);
}

// Função para lidar com a tecla ESC
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeCustomAlert();
    }
}

// Modifique o evento de submit do formulário para usar o novo alert
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString()
    };

    const existingMessages = JSON.parse(localStorage.getItem('formMessages') || '[]');
    existingMessages.push(formData);
    localStorage.setItem('formMessages', JSON.stringify(existingMessages));

    contactForm.reset();

    // Usa o novo sistema de alert
    showCustomAlert('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
});

// Seleciona o elemento nav
const nav = document.querySelector('nav');

// Função para verificar o scroll e adicionar/remover classe
function checkScroll() {
    // Verifica se o scroll é maior que 0
    if (window.scrollY > 0) {
        // Adiciona as classes para background branco e sombra
        nav.classList.add('bg-white', 'shadow-lg');
        
        // Garante que a transição seja suave
        nav.style.transition = 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
    } else {
        // Remove as classes quando voltar ao topo
        nav.classList.remove('bg-white', 'shadow-lg');
    }
}

// Adiciona o evento de scroll à janela
window.addEventListener('scroll', checkScroll);

// Verifica o estado inicial ao carregar a página
document.addEventListener('DOMContentLoaded', checkScroll);