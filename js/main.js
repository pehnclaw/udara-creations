document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.removeAttribute('data-dark');
            themeIcon.className = 'ph ph-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.className = 'ph ph-sun';
        }
    };

    // On load: use saved pref, then OS pref, then default dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(osPrefersDark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Update Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Sanity CMS Hero Settings
    async function fetchHeroSettings() {
        const PROJECT_ID = 'x3rb0ahu';
        const DATASET = 'production';
        const QUERY = encodeURIComponent('*[_type == "pageHome"][0] { "heroImageUrl": heroImage.asset->url, heroTitle, heroSubtitle }');
        const URL = `https://${PROJECT_ID}.apicdn.sanity.io/v2023-01-01/data/query/${DATASET}?query=${QUERY}`;

        try {
            const res = await fetch(URL);
            const { result } = await res.json();

            if (result) {
                const heroSection = document.querySelector('.hero');
                if (result.heroImageUrl && heroSection) {
                    // Update only the image; CSS handles the overlay and parallax
                    heroSection.style.backgroundImage = `url('${result.heroImageUrl}')`;
                }
                if (result.heroTitle) {
                    const titleEl = document.querySelector('.hero-title');
                    if (titleEl) titleEl.innerHTML = result.heroTitle;
                }
                if (result.heroSubtitle) {
                    const subtitleEl = document.querySelector('.hero-subtitle');
                    if (subtitleEl) subtitleEl.textContent = result.heroSubtitle;
                }
            }
        } catch (err) {
            console.log('Hero fetch failed:', err);
        }
    }
    fetchHeroSettings();

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mobileIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        if (navLinks.classList.contains('nav-active')) {
            mobileIcon.classList.replace('ph-list', 'ph-x');
        } else {
            mobileIcon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Handle Mobile Dropdown Clicks
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggleLink = dropdown.querySelector('a');
        if (toggleLink) {
            toggleLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // Prevent jump to #services anchor
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    // Scroll Reveal Animation Logic (Consolidated)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0, // Trigger immediately
        rootMargin: "0px 0px -50px 0px"
    });

    // Auto-apply reveal class to sections and key cards
    const revealElements = document.querySelectorAll('section:not(.hero), .service-card, .capability-card, .process-step, .portfolio-item, .testimonial-card, .about-content, .about-visual');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Observe elements for 3D/Hover effects (Centralized)
    const animatedElements = document.querySelectorAll('.about-content, .about-visual');
    animatedElements.forEach(el => revealObserver.observe(el));

    // Portfolio Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            // Re-select items inside the listener to include Sanity-fetched items
            const currentItems = document.querySelectorAll('.portfolio-item');

            currentItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Sanity CMS Integration for Portfolio
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        const PROJECT_ID = 'x3rb0ahu';
        const DATASET = 'production';
        // Use CDN API for better reliability
        const QUERY = encodeURIComponent('*[_type == "portfolioItem"] | order(_createdAt desc) {title, category, "imageUrl": image.asset->url, description}');
        const SANITY_URL = `https://${PROJECT_ID}.apicdn.sanity.io/v2023-01-01/data/query/${DATASET}?query=${QUERY}`;

        fetch(SANITY_URL)
            .then(res => {
                if (!res.ok) throw new Error(`Sanity API error: ${res.status}`);
                return res.json();
            })
            .then(({ result }) => {
                if (result && result.length > 0) {
                    portfolioGrid.innerHTML = '';
                    result.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'portfolio-item';
                        div.setAttribute('data-category', (item.category || 'other').toLowerCase());
                        div.innerHTML = `
                            <img src="${item.imageUrl}" alt="${item.title}" loading="lazy">
                            <div class="portfolio-overlay">
                                <h3>${item.title}</h3>
                                <p>${item.description || item.category}</p>
                            </div>
                        `;
                        portfolioGrid.appendChild(div);
                    });
                    // Re-apply active filter
                    const activeFilter = document.querySelector('.filter-btn.active');
                    if (activeFilter) activeFilter.click();
                }
            })
            .catch(err => console.warn('Portfolio fetch failed, showing placeholders.', err));
    }

    // Testimonials Carousel
    const track = document.getElementById('testimonialsTrack');
    const dotsContainer = document.getElementById('carouselDots');
    if (track) {
        // Try fetching testimonials from Sanity
        const T_QUERY = encodeURIComponent('*[_type == "testimonial"] | order(_createdAt desc) {quote, name, role, initials}');
        const T_URL = `https://x3rb0ahu.apicdn.sanity.io/v2023-01-01/data/query/production?query=${T_QUERY}`;

        fetch(T_URL)
            .then(res => res.json())
            .then(({ result }) => {
                if (result && result.length > 0) {
                    track.innerHTML = '';
                    result.forEach(t => {
                        const card = document.createElement('div');
                        card.className = 'testimonial-card';
                        card.innerHTML = `
                            <div class="quote-mark">&ldquo;</div>
                            <p class="testimonial-text">${t.quote}</p>
                            <div class="testimonial-author">
                                <div class="author-avatar">${t.initials || t.name[0]}</div>
                                <div class="author-info">
                                    <h4>${t.name}</h4>
                                    <span>${t.role}</span>
                                </div>
                            </div>
                        `;
                        track.appendChild(card);
                    });
                }
                initCarousel();
            })
            .catch(() => initCarousel());
    }

    function initCarousel() {
        const track = document.getElementById('testimonialsTrack');
        const dotsContainer = document.getElementById('carouselDots');
        if (!track) return;

        const cards = track.querySelectorAll('.testimonial-card');
        if (cards.length === 0) return;

        let current = 0;
        let autoplay;

        // Build dots
        dotsContainer.innerHTML = '';
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function goTo(index) {
            cards[current].classList.remove('active');
            dotsContainer.querySelectorAll('.carousel-dot')[current].classList.remove('active');
            current = (index + cards.length) % cards.length;
            cards[current].classList.add('active');
            dotsContainer.querySelectorAll('.carousel-dot')[current].classList.add('active');
        }

        // Activate first card
        cards[0].classList.add('active');

        document.getElementById('nextBtn')?.addEventListener('click', () => { clearInterval(autoplay); goTo(current + 1); startAuto(); });
        document.getElementById('prevBtn')?.addEventListener('click', () => { clearInterval(autoplay); goTo(current - 1); startAuto(); });

        function startAuto() { autoplay = setInterval(() => goTo(current + 1), 5000); }
        startAuto();
    }

    // Contact Form Logic
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.8';
            
            const formData = new FormData(contactForm);
            
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    btn.textContent = 'Message Sent Successfully!';
                    btn.style.backgroundColor = 'var(--accent-green)';
                    btn.style.color = '#000';
                    btn.style.opacity = '1';
                    contactForm.reset();
                } else {
                    btn.textContent = data.message || 'Error Sending!';
                    btn.style.backgroundColor = 'var(--accent-orange)';
                    btn.style.opacity = '1';
                }
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 4000);
            })
            .catch(error => {
                btn.textContent = 'Error Sending!';
                btn.style.backgroundColor = 'var(--accent-magenta)';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                }, 4000);
            });
        });
    }

    // Preloader Hiding Logic
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    });

    // 3D Tilt Effect for Service Cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        // Add shine element
        const shine = document.createElement('div');
        shine.className = 'card-shine';
        card.appendChild(shine);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(0)`;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });
});
