document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  // Verificar se os elementos existem antes de adicionar event listeners
  if (menuToggle && navMenu) {
    // Toggle do menu ao clicar no botão
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation(); // Previne que o click se propague
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active"); // Adiciona/remove classe active no botão também
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });

    // Prevenir que cliques dentro do menu fechem ele
    navMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Adicionar classe 'scrolled' ao header quando a página é rolada
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
});
