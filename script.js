// Smooth scroll (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Scroll reveal with swipe-down + fade and staggered children
(function () {
    const groups = [
        { container: '.skills-grid', child: '.skill-card', stagger: 80 },
        { container: '.projects-grid', child: '.project-card', stagger: 100 },
        { container: '.about-section', child: '.about-left, .about-right', stagger: 120 },
        { container: '.hero-section', child: '.hero-left, .hero-right', stagger: 120 }
    ];

    function initRevealFor(selector) {
        const el = document.querySelector(selector);
        if (!el) return;
        // attach .reveal to children so CSS applies immediately
        el.querySelectorAll('*').forEach(child => {
            // don't mark the container itself
            if (child.matches && !child.classList.contains('reveal')) {
                child.classList.add('reveal');
            }
        });
    }

    // For each configured group, observe the container and reveal children with stagger
    groups.forEach(({ container, child, stagger }) => {
        const parentEls = document.querySelectorAll(container);
        parentEls.forEach(parent => {
            // make sure children have .reveal class
            parent.querySelectorAll(child).forEach(el => el.classList.add('reveal'));

            const obs = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const children = parent.querySelectorAll(child);
                    children.forEach((c, i) => {
                        // set a staggered transition delay
                        c.style.transitionDelay = (i * stagger) + 'ms';
                        // trigger the visible state
                        requestAnimationFrame(() => c.classList.add('show'));
                    });
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.12 });

            obs.observe(parent);
        });
    });
})();
