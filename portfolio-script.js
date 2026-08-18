const menuButton = document.getElementById('menuButton');
    const navLinks = document.getElementById('navLinks');
    const filters = [...document.querySelectorAll('.filter')];
    const projects = [...document.querySelectorAll('.project-card')];
    const toast = document.getElementById('toast');

    menuButton?.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '✕' : '☰';
    });

    navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
      if (menuButton) menuButton.textContent = '☰';
    }));

    filters.forEach(button => {
      button.addEventListener('click', () => {
        const selected = button.dataset.filter;
        filters.forEach(item => item.classList.toggle('active', item === button));
        projects.forEach(card => {
          const categories = (card.dataset.category || '').split(' ');
          card.hidden = selected !== 'all' && !categories.includes(selected);
        });
      });
    });

    document.getElementById('printButton')?.addEventListener('click', () => window.print());

    document.getElementById('copyLink')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.textContent = 'Page link copied';
      } catch {
        toast.textContent = 'Copy unavailable in this browser';
      }
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal:not(.visible)').forEach(element => observer.observe(element));
    document.getElementById('year').textContent = new Date().getFullYear();
