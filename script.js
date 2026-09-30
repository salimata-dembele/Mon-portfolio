document.addEventListener('DOMContentLoaded', () => {

  // 1. Changement de Thème (Sombre / Clair)
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (themeIcon) updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      if (themeIcon) updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  // 2. Menu Burger Mobile
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 3. Description dynamique pour les outils (Compétences)
  const toolItems = document.querySelectorAll('.skill-item');
  const toolDescriptionBox = document.getElementById('tool-description');

  if (toolItems.length > 0 && toolDescriptionBox) {
    const defaultText = "Survolez un logo pour voir sa description.";

    toolItems.forEach(item => {
      // Événement au survol (souris)
      item.addEventListener('mouseenter', () => {
        const desc = item.getAttribute('data-desc');
        if (desc) toolDescriptionBox.textContent = desc;
      });

      item.addEventListener('mouseleave', () => {
        toolDescriptionBox.textContent = defaultText;
      });

      // Événement au clic (tactile / mobile)
      item.addEventListener('click', () => {
        const desc = item.getAttribute('data-desc');
        if (desc) toolDescriptionBox.textContent = desc;
      });
    });
  }

  // 4. Highlight de la section active lors du scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // 5. Animation visuelle lors du clic sur un lien interne
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function() {
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.classList.remove('section-highlight');
        void targetSection.offsetWidth; // Forcer le reflow
        targetSection.classList.add('section-highlight');

        setTimeout(() => {
          targetSection.classList.remove('section-highlight');
        }, 800);
      }
    });
  });

});