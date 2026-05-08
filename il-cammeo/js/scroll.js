const sections = document.querySelectorAll('.reveal-section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Apply stagger delays to children marked with .stagger-child
        const staggered = entry.target.querySelectorAll('.stagger-child');
        staggered.forEach((el, i) => {
          el.style.setProperty('--delay', `${i * 120}ms`);
        });

        observer.unobserve(entry.target); // animate once only
      }
    });
  },
  { threshold: 0.12 }
);

sections.forEach((section) => observer.observe(section));
