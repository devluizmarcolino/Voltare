document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-button");
    const content = item.querySelector(".faq-content");
    const icon = item.querySelector(".bx-chevron-down");

    button.addEventListener("click", () => {
      // Fechar outros itens abertos
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherContent = otherItem.querySelector(".faq-content");
          const otherIcon = otherItem.querySelector(".bx-chevron-down");

          otherContent.classList.add("hidden");
          otherIcon.style.transform = "rotate(0deg)";
        }
      });

      // Alternar o item atual
      content.classList.toggle("hidden");

      // Rotacionar o ícone
      if (content.classList.contains("hidden")) {
        icon.style.transform = "rotate(0deg)";
      } else {
        icon.style.transform = "rotate(180deg)";
      }
    });
  });
});
