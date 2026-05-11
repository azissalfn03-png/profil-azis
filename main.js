/**
 * Custom JavaScript untuk Zisdev Portfolio
 * Menangani interaksi UI, animasi scroll, dan fungsionalitas mobile responsif.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        if(mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.remove('translate-x-full');
        } else {
            mobileMenu.classList.add('translate-x-full');
        }
    }

    if (mobileMenuBtn && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);
        
        // Tutup menu saat link diklik
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // 2. Scroll Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. Active Link Highlight & Bottom Navigation State
    const sections = document.querySelectorAll('section');
    const desktopLinks = document.querySelectorAll('.nav-link');
    const bottomLinks = document.querySelectorAll('.bottom-nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Deteksi section yang sedang aktif
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        // Update Desktop Navigation
        desktopLinks.forEach(link => {
            link.classList.remove('text-primary', 'border-primary');
            link.classList.add('text-on-surface-variant', 'border-transparent');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-primary', 'border-primary');
                link.classList.remove('text-on-surface-variant', 'border-transparent');
            }
        });

        // Update Mobile Bottom Navigation
        bottomLinks.forEach(link => {
            link.classList.remove('bg-primary-container', 'text-on-primary-container');
            link.classList.add('text-on-surface-variant');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('bg-primary-container', 'text-on-primary-container');
                link.classList.remove('text-on-surface-variant');
            }
        });
    });

    // 4. Typing Effect
    const textsToType = [
        "Informatics student by day, angkringan worker by night.",
        "Crafting digital experiences through elegant code.",
        "Building solutions with architectural precision."
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.getElementById("typed-text");
    
    function typeEffect() {
        if (!typedTextElement) return;
        const currentText = textsToType[textIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        typedTextElement.innerHTML = currentText.substring(0, charIndex) + '<span class="typed-cursor animate-pulse">|</span>';
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textsToType.length;
            typeSpeed = 500; // Pause before typing next
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    setTimeout(typeEffect, 1000);

    // 5. Skill Bar Animation
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // 6. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-on-primary', 'shadow-lg');
                b.classList.add('bg-surface-container-high', 'text-on-surface-variant', 'border', 'border-outline-variant/30');
            });
            
            // Add active class to clicked
            btn.classList.add('active', 'bg-primary', 'text-on-primary', 'shadow-lg');
            btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant', 'border', 'border-outline-variant/30');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains('project-' + filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 7. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
