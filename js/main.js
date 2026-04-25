document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'light') {
            themeIcon.classList.replace('ph-sun', 'ph-moon');
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let targetTheme = 'light';
        
        if (currentTheme === 'light') {
            targetTheme = 'dark';
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('ph-moon', 'ph-sun');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('ph-sun', 'ph-moon');
        }
        
        localStorage.setItem('theme', targetTheme);
    });

    // Update Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Determine actual DOM index for stagger effect within siblings
                const parent = entry.target.parentElement;
                const children = Array.from(parent.children);
                const itemIndex = children.indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, itemIndex * 150); // 150ms staggered delay
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .about-visual');
    animatedElements.forEach(el => observer.observe(el));

    // Portfolio Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
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
        const QUERY = encodeURIComponent('*[_type == "portfolioItem"]{title, category, "imageUrl": image.asset->url, description}');
        const URL = `https://${PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${DATASET}?query=${QUERY}`;

        fetch(URL)
            .then(res => res.json())
            .then(({ result }) => {
                if (result && result.length > 0) {
                    portfolioGrid.innerHTML = ''; // Clear hardcoded items
                    result.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'portfolio-item';
                        div.setAttribute('data-category', item.category.toLowerCase());
                        
                        div.innerHTML = `
                            <img src="${item.imageUrl}" alt="${item.title}">
                            <div class="portfolio-overlay">
                                <h3>${item.title}</h3>
                                <p>${item.description || item.category}</p>
                            </div>
                        `;
                        portfolioGrid.appendChild(div);
                    });
                    
                    // Re-apply filter logic to new items
                    const activeFilter = document.querySelector('.filter-btn.active');
                    if(activeFilter) activeFilter.click();
                }
            })
            .catch(err => console.error("Sanity Fetch Error:", err));
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
