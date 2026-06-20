// ============================================
// TINY TOWN CAFE — INTERACTIVE SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------
    // Navbar Scroll Effect
    // -------------------------------------------
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // -------------------------------------------
    // Mobile Nav Toggle
    // -------------------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // -------------------------------------------
    // Active Nav Link on Scroll
    // -------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // -------------------------------------------
    // Menu Tabs
    // -------------------------------------------
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuPanels = document.querySelectorAll('.menu-panel');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active panel
            menuPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `tab-${target}`) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // -------------------------------------------
    // Scroll Reveal Animations
    // -------------------------------------------
    const revealElements = document.querySelectorAll(
        '.about-grid, .menu-card, .gallery-item, .review-card, .contact-card, .section-header, .about-features .feature'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // -------------------------------------------
    // Gallery Lightbox (Simple)
    // -------------------------------------------
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.style.cssText = `
                position: fixed; inset: 0; z-index: 10000;
                background: rgba(0,0,0,0.9);
                display: flex; align-items: center; justify-content: center;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
                padding: 2rem;
            `;

            const largeImg = document.createElement('img');
            largeImg.src = img.src;
            largeImg.alt = img.alt;
            largeImg.style.cssText = `
                max-width: 90vw; max-height: 85vh;
                object-fit: contain; border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                animation: fadeIn 0.4s ease;
            `;

            const caption = document.createElement('p');
            const captionText = item.querySelector('.gallery-overlay span')?.textContent || '';
            caption.textContent = captionText;
            caption.style.cssText = `
                position: absolute; bottom: 2rem;
                font-family: 'Playfair Display', serif;
                font-size: 1.3rem; color: white;
                text-align: center; width: 100%;
            `;

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '✕';
            closeBtn.style.cssText = `
                position: absolute; top: 1.5rem; right: 1.5rem;
                background: rgba(255,255,255,0.15);
                border: 1px solid rgba(255,255,255,0.2);
                color: white; font-size: 1.2rem;
                width: 44px; height: 44px; border-radius: 50%;
                cursor: pointer; display: flex;
                align-items: center; justify-content: center;
                transition: all 0.2s ease;
            `;
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.background = 'rgba(255,255,255,0.25)';
            });
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.background = 'rgba(255,255,255,0.15)';
            });

            overlay.appendChild(largeImg);
            overlay.appendChild(caption);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            const closeLightbox = () => {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    overlay.remove();
                    document.body.style.overflow = '';
                }, 300);
            };

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay || e.target === closeBtn) {
                    closeLightbox();
                }
            });

            closeBtn.addEventListener('click', closeLightbox);

            document.addEventListener('keydown', function handler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', handler);
                }
            });
        });
    });

    // -------------------------------------------
    // Smooth Scroll for Anchor Links
    // -------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // -------------------------------------------
    // Parallax Effect on Hero Image
    // -------------------------------------------
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroImg.style.transform = `scale(${1.05 + scrolled * 0.0002}) translateY(${scrolled * 0.15}px)`;
            }
        }, { passive: true });
    }

});
