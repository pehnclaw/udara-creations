// Global Preloader Hiding Logic (runs immediately)
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }
}

// Safety fallback: Hide preloader after 3 seconds regardless of load state
setTimeout(hidePreloader, 3000);
window.addEventListener('load', hidePreloader);

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
                    const isSubmenuClick = e.target.closest('.has-submenu');
                    if (!isSubmenuClick) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                }
            });
        }
    });

    const submenus = document.querySelectorAll('.has-submenu');
    submenus.forEach(submenu => {
        const submenuLink = submenu.querySelector('a');
        if (submenuLink) {
            submenuLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    submenu.classList.toggle('active');
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
    const revealElements = document.querySelectorAll('section:not(.hero), .service-card, .capability-card, .process-step, .portfolio-item, .testimonial-card, .about-content, .about-visual, .track-section, .course-card');
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
    const portfolioGrids = document.querySelectorAll('.portfolio-grid');
    if (portfolioGrids.length > 0) {
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
                    portfolioGrids.forEach(portfolioGrid => {
                        portfolioGrid.innerHTML = '';
                        const serviceCategory = portfolioGrid.getAttribute('data-service-category');
                        
                        let count = 0;
                        result.forEach(item => {
                            const itemCategory = (item.category || 'other').toLowerCase();
                            
                            // If it's a specific service page, only show that category and limit to 3
                            if (serviceCategory && itemCategory !== serviceCategory) return;
                            if (serviceCategory && count >= 3) return;
                            
                            if (serviceCategory) count++;

                            const div = document.createElement('div');
                            div.className = 'portfolio-item reveal';
                            div.setAttribute('data-category', itemCategory);
                            div.setAttribute('data-description', item.description || '');
                            div.innerHTML = `
                                <img src="${item.imageUrl}" alt="${item.title}" loading="lazy">
                                <div class="portfolio-overlay">
                                    <h3>${item.title}</h3>
                                    <p>${item.category}</p>
                                </div>
                            `;
                            portfolioGrid.appendChild(div);
                            if (typeof revealObserver !== 'undefined') revealObserver.observe(div);
                        });
                    });
                    
                    // Re-apply active filter (only on main portfolio page)
                    const activeFilter = document.querySelector('.filter-btn.active');
                    if (activeFilter) activeFilter.click();
                }
            })
            .catch(err => console.warn('Portfolio fetch failed, showing placeholders.', err));
    }

    // Portfolio Modal Logic
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        const closeModal = modal.querySelector('.close-modal');
        
        document.addEventListener('click', (e) => {
            const item = e.target.closest('.portfolio-item');
            if (item) {
                const img = item.querySelector('img').src;
                const title = item.querySelector('h3').textContent;
                const category = item.querySelector('p').textContent;
                const desc = item.getAttribute('data-description') || "Experience the dimension of innovation with Udara Creations. This project represents our commitment to precision and creative excellence.";

                const modalImg = document.getElementById('modalImg');
                const modalTitle = document.getElementById('modalTitle');
                const modalCategory = document.getElementById('modalCategory');
                const modalDesc = document.getElementById('modalDesc');

                if (modalImg) modalImg.src = img;
                if (modalTitle) modalTitle.textContent = title;
                if (modalCategory) modalCategory.textContent = category;
                if (modalDesc) modalDesc.textContent = desc;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Testimonials Integration
    const track = document.getElementById('testimonialsTrack');
    const academyGrid = document.getElementById('academyTestimonialsGrid');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (track || academyGrid) {
        // Try fetching testimonials from Sanity
        const T_QUERY = encodeURIComponent('*[_type == "testimonial"] | order(_createdAt desc) {quote, name, role, initials}');
        const T_URL = `https://x3rb0ahu.apicdn.sanity.io/v2023-01-01/data/query/production?query=${T_QUERY}`;

        fetch(T_URL)
            .then(res => res.json())
            .then(({ result }) => {
                if (result && result.length > 0) {
                    if (track) track.innerHTML = '';
                    if (academyGrid) academyGrid.innerHTML = '';
                    
                    const colors = ['var(--accent-cyan)', 'var(--accent-gold)', 'var(--accent-purple)', 'var(--accent-orange)'];
                    
                    result.forEach((t, index) => {
                        const avatarColor = colors[index % colors.length];
                        const htmlContent = `
                            <div class="quote-mark" style="${academyGrid ? 'display: none;' : ''}">&ldquo;</div>
                            <p class="${academyGrid ? '' : 'testimonial-text'}">"${t.quote}"</p>
                            <div class="${academyGrid ? 'student-info' : 'testimonial-author'}" style="${academyGrid ? 'margin-top: 1.5rem; display: flex; align-items: center; gap: 1rem;' : ''}">
                                <div class="${academyGrid ? 'student-avatar' : 'author-avatar'}" style="${academyGrid ? `background: ${avatarColor}; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;` : ''}">${t.initials || t.name[0]}</div>
                                <div class="${academyGrid ? 'student-details' : 'author-info'}">
                                    <h4>${t.name}</h4>
                                    <span>${t.role}</span>
                                </div>
                            </div>
                        `;
                        
                        if (track) {
                            const card = document.createElement('div');
                            card.className = 'testimonial-card';
                            card.innerHTML = htmlContent;
                            track.appendChild(card);
                        }
                        
                        if (academyGrid) {
                            const card = document.createElement('div');
                            card.className = 'testimonial-card reveal';
                            card.innerHTML = htmlContent;
                            academyGrid.appendChild(card);
                            if (typeof revealObserver !== 'undefined') revealObserver.observe(card);
                        }
                    });
                }
                if (track) initCarousel();
            })
            .catch(() => {
                if (track) initCarousel();
            });
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

    // Sanity CMS Integration for Team (About Page)
    const teamGrid = document.getElementById('teamGrid');
    if (teamGrid) {
        const PROJECT_ID = 'x3rb0ahu';
        const DATASET = 'production';
        const QUERY = encodeURIComponent('*[_type == "teamMember"] | order(order asc) {name, role, bio, "imageUrl": image.asset->url, socials}');
        const SANITY_URL = `https://${PROJECT_ID}.apicdn.sanity.io/v2023-01-01/data/query/${DATASET}?query=${QUERY}`;

        fetch(SANITY_URL)
            .then(res => res.json())
            .then(({ result }) => {
                if (result && result.length > 0) {
                    teamGrid.innerHTML = '';
                    result.forEach(member => {
                        const card = document.createElement('div');
                        card.className = 'team-card reveal';
                        
                        let socialHtml = '';
                        if (member.socials && member.socials.length > 0) {
                            socialHtml = '<div class="team-socials">';
                            member.socials.forEach(s => {
                                const iconClass = s.platform === 'twitter' ? 'ph ph-twitter-logo' : 
                                                 s.platform === 'linkedin' ? 'ph ph-linkedin-logo' :
                                                 s.platform === 'instagram' ? 'ph ph-instagram-logo' : 'ph ph-link';
                                socialHtml += `<a href="${s.url}" target="_blank" aria-label="${s.platform}"><i class="${iconClass}"></i></a>`;
                            });
                            socialHtml += '</div>';
                        }

                        card.innerHTML = `
                            <div class="team-image-wrapper">
                                <img src="${member.imageUrl}" alt="${member.name}" loading="lazy">
                            </div>
                            <div class="team-info">
                                <h3>${member.name}</h3>
                                <span class="role">${member.role}</span>
                                <p class="bio">${member.bio || ''}</p>
                                ${socialHtml}
                            </div>
                        `;
                        teamGrid.appendChild(card);
                        revealObserver.observe(card);
                    });
                }
            })
            .catch(err => console.warn('Team fetch failed:', err));
    }

    // Sanity CMS Integration for Courses
    const fetchCourses = () => {
        const PROJECT_ID = 'x3rb0ahu';
        const DATASET = 'production';
        const QUERY = encodeURIComponent('*[_type == "course"] | order(order asc) {title, category, description, duration, level, icon}');
        const SANITY_URL = `https://${PROJECT_ID}.apicdn.sanity.io/v2023-01-01/data/query/${DATASET}?query=${QUERY}`;

        const grids = {
            tech: document.getElementById('techGrid'),
            languages: document.getElementById('languagesGrid'),
            musical: document.getElementById('musicGrid'),
            handcrafts: document.getElementById('handcraftsGrid'),
            business: document.getElementById('businessGrid')
        };

        if (!Object.values(grids).some(g => g)) return;

        const isMainPage = window.location.pathname.includes('training.html');
        const counts = { tech: 0, languages: 0, musical: 0, handcrafts: 0, business: 0 };

        fetch(SANITY_URL)
            .then(res => res.json())
            .then(({ result }) => {
                if (result && result.length > 0) {
                    Object.values(grids).forEach(grid => {
                        if (grid) grid.innerHTML = '';
                    });

                    result.forEach(course => {
                        const grid = grids[course.category];
                        if (grid) {
                            // Limit to 3 items per category on the main Training page
                            if (isMainPage && counts[course.category] >= 3) return;
                            counts[course.category]++;

                            const card = document.createElement('div');
                            card.className = 'course-card reveal';
                            card.setAttribute('data-description', course.description || '');
                            
                            // Smarter Icon Class Logic
                            const getIconClass = (rawIcon) => {
                                if (!rawIcon) return 'ph ph-graduation-cap';
                                
                                // Standardize: lowercase, replace hyphens with spaces for weight detection
                                let clean = rawIcon.toLowerCase().trim();
                                const weights = ['bold', 'duotone', 'fill', 'light', 'thin'];
                                let detectedWeight = '';
                                
                                weights.forEach(w => {
                                    if (clean.includes(w)) {
                                        detectedWeight = `ph-${w}`;
                                        clean = clean.replace(w, '').replace(/-/g, ' ').trim();
                                    }
                                });

                                // Clean up any remaining double spaces or lone ph-
                                const baseName = clean.replace(/^ph-/, '').replace(/\s+/g, '-').trim();
                                
                                let classes = ['ph'];
                                if (detectedWeight) classes.push(detectedWeight);
                                classes.push(`ph-${baseName}`);
                                
                                return classes.join(' ');
                            };

                            const iconClass = getIconClass(course.icon);

                            card.innerHTML = `
                                <div class="course-icon"><i class="${iconClass}"></i></div>
                                <div class="course-meta">
                                    ${course.duration ? `<span class="meta-tag">${course.duration}</span>` : ''}
                                    ${course.level ? `<span class="meta-tag">${course.level}</span>` : ''}
                                </div>
                                <h3>${course.title}</h3>
                                <p>${course.description ? course.description.substring(0, 100) + '...' : ''}</p>
                                ${isMainPage ? 
                                    `<a href="skills-${course.category}.html" class="btn-secondary">Explore Track <i class="ph ph-arrow-right"></i></a>` : 
                                    '<span class="tap-hint">Tap for details <i class="ph ph-info"></i></span>'
                                }
                            `;
                            grid.appendChild(card);
                            if (revealObserver) revealObserver.observe(card);
                        }
                    });
                }
            })
            .catch(err => console.warn('Course fetch failed:', err));
    };

    fetchCourses();

    // Course Modal Logic
    const courseModal = document.getElementById('courseModal');
    if (courseModal) {
        const closeModal = courseModal.querySelector('.close-modal');
        const enrollWhatsApp = document.getElementById('enrollWhatsApp');
        const inquireForm = document.getElementById('inquireForm');

        document.addEventListener('click', (e) => {
            const card = e.target.closest('.course-card');
            // If it's a card but NOT an explicit "Explore Track" button (which is on training.html)
            if (card && !e.target.closest('.btn-secondary')) {
                const title = card.querySelector('h3').textContent;
                const desc = card.getAttribute('data-description') || "";
                const duration = card.querySelector('.meta-tag:nth-child(1)')?.textContent || "";
                const level = card.querySelector('.meta-tag:nth-child(2)')?.textContent || "";
                const iconClass = card.querySelector('.course-icon i').className;

                document.getElementById('courseModalTitle').textContent = title;
                document.getElementById('courseModalDesc').textContent = desc;
                document.getElementById('courseModalDuration').textContent = duration;
                document.getElementById('courseModalLevel').textContent = level;
                document.getElementById('courseModalIcon').className = iconClass;

                // WhatsApp Link
                const waMessage = encodeURIComponent(`Hello Udara Academy! I am interested in enrolling for the ${title} program. Could I get more details?`);
                enrollWhatsApp.href = `https://wa.me/2347042772050?text=${waMessage}`;

                courseModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        if (inquireForm) {
            inquireForm.addEventListener('click', () => {
                const title = document.getElementById('courseModalTitle').textContent;
                courseModal.classList.remove('active');
                document.body.style.overflow = '';
                
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    const messageBox = document.getElementById('message');
                    if (messageBox) {
                        messageBox.value = `I'm interested in the ${title} program. Please send me more information.`;
                        messageBox.focus();
                    }
                }
            });
        }

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                courseModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === courseModal) {
                courseModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Scroll Spying for Track Navigation
    const trackSections = document.querySelectorAll('.track-section, .showcase-section');
    const navItems = document.querySelectorAll('.track-nav-item');

    if (navItems.length > 0) {
        const mobileChips = document.querySelectorAll('.mobile-nav-chip');
        
        function updateActiveNav() {
            let current = "";
            trackSections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute("id");
                }
            });

            navItems.forEach(item => {
                item.classList.remove("active");
                if (item.getAttribute("href").slice(1) === current) {
                    item.classList.add("active");
                }
            });

            mobileChips.forEach(chip => {
                chip.classList.remove("active");
                if (chip.getAttribute("href").slice(1) === current) {
                    chip.classList.add("active");
                }
            });
        }
        window.addEventListener("scroll", updateActiveNav);
    }
    
    // ==========================================
    // BLOG / INSIGHTS ENGINE
    // ==========================================
    const blogGrid = document.getElementById('blogGrid');
    const postContainer = document.getElementById('postBody');
    
    // Helper to parse basic PortableText
    function parsePortableText(blocks) {
        if (!blocks || !Array.isArray(blocks)) return '';
        return blocks.map(block => {
            if (block._type === 'image') {
                const imgRef = block.asset?._ref;
                if (!imgRef) return '';
                const parts = imgRef.split('-');
                const url = `https://cdn.sanity.io/images/x3rb0ahu/production/${parts[1]}-${parts[2]}.${parts[3]}`;
                return `<img src="${url}" alt="Blog Image" style="width:100%; border-radius:12px; margin: 2rem 0;">`;
            }
            if (block._type !== 'block' || !block.children) return '';
            const text = block.children.map(child => {
                let content = child.text;
                if (child.marks && child.marks.includes('strong')) content = `<strong>${content}</strong>`;
                if (child.marks && child.marks.includes('em')) content = `<em>${content}</em>`;
                return content;
            }).join('');
            
            switch(block.style) {
                case 'h1': return `<h1 style="margin-top: 2rem;">${text}</h1>`;
                case 'h2': return `<h2 style="margin-top: 2rem;">${text}</h2>`;
                case 'h3': return `<h3 style="margin-top: 1.5rem;">${text}</h3>`;
                case 'blockquote': return `<blockquote style="border-left: 4px solid var(--primary); padding-left: 1rem; margin: 1.5rem 0; font-style: italic;">${text}</blockquote>`;
                default: return `<p style="margin-bottom: 1.5rem;">${text}</p>`;
            }
        }).join('');
    }

    // Helper to get Image URL
    function getSanityImageUrl(source) {
        if (!source || !source.asset || !source.asset._ref) return '';
        const ref = source.asset._ref;
        const parts = ref.split('-');
        return `https://cdn.sanity.io/images/x3rb0ahu/production/${parts[1]}-${parts[2]}.${parts[3]}?w=800&h=500&fit=crop`;
    }

    if (blogGrid) {
        // Fetch Blog Grid
        const QUERY = encodeURIComponent('*[_type == "post"] | order(publishedAt desc) {title, slug, excerpt, mainImage, publishedAt, categories, "authorName": author->name}');
        const URL = `https://x3rb0ahu.apicdn.sanity.io/v2023-01-01/data/query/production?query=${QUERY}`;
        
        fetch(URL)
            .then(res => res.json())
            .then(({ result }) => {
                blogGrid.innerHTML = '';
                if (result && result.length > 0) {
                    result.forEach(post => {
                        const date = new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                        const cat = post.categories && post.categories.length > 0 ? post.categories[0] : 'Insight';
                        const card = document.createElement('div');
                        card.className = 'course-card reveal';
                        card.setAttribute('data-category', cat.toLowerCase());
                        
                        card.innerHTML = `
                            ${post.mainImage ? `<img src="${getSanityImageUrl(post.mainImage)}" alt="${post.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;">` : ''}
                            <div class="course-meta">
                                <span class="meta-tag">${cat.toUpperCase()}</span>
                                <span class="meta-tag" style="background: transparent; border: none; padding: 0;">${date}</span>
                            </div>
                            <h3>${post.title}</h3>
                            <p>${post.excerpt || 'Read more about our latest insights and industry updates.'}</p>
                            <a href="post.html?slug=${post.slug.current}" class="btn-secondary" style="margin-top: auto; display: inline-flex;">Read Post <i class="ph ph-arrow-right"></i></a>
                        `;
                        blogGrid.appendChild(card);
                        if (typeof revealObserver !== 'undefined') revealObserver.observe(card);
                    });
                    
                    // Setup Blog Filtering
                    const filterBtns = document.querySelectorAll('.blog-filters .filter-btn');
                    filterBtns.forEach(btn => {
                        btn.addEventListener('click', () => {
                            filterBtns.forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                            const filterValue = btn.getAttribute('data-filter');
                            const posts = blogGrid.querySelectorAll('.course-card');
                            
                            posts.forEach(post => {
                                if (filterValue === 'all' || post.getAttribute('data-category').includes(filterValue)) {
                                    post.style.display = 'flex';
                                } else {
                                    post.style.display = 'none';
                                }
                            });
                        });
                    });
                } else {
                    blogGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No insights published yet. Check back soon!</p>';
                }
            })
            .catch(err => console.error('Blog fetch error:', err));
    }

    if (postContainer) {
        // Fetch Single Post
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');
        
        if (slug) {
            const QUERY = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]{
                title, publishedAt, categories, mainImage, body, 
                "authorName": author->name, 
                "authorRole": author->role,
                "authorImage": author->image
            }`);
            const URL = `https://x3rb0ahu.apicdn.sanity.io/v2023-01-01/data/query/production?query=${QUERY}`;
            
            fetch(URL)
                .then(res => res.json())
                .then(({ result }) => {
                    if (result) {
                        document.title = `${result.title} | Udara Insights`;
                        document.getElementById('postTitle').textContent = result.title;
                        
                        const date = new Date(result.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                        document.getElementById('postDate').textContent = date;
                        
                        if (result.categories && result.categories.length > 0) {
                            document.getElementById('postCategory').textContent = result.categories[0].toUpperCase();
                        } else {
                            document.getElementById('postCategory').style.display = 'none';
                        }
                        
                        if (result.authorName) {
                            document.getElementById('postAuthorName').textContent = result.authorName;
                            document.getElementById('postAuthorRole').textContent = result.authorRole || 'Udara Creations';
                            if (result.authorImage) {
                                const avatarBg = `url(${getSanityImageUrl(result.authorImage)}) center/cover`;
                                document.getElementById('postAuthorAvatar').style.background = avatarBg;
                            } else {
                                document.getElementById('postAuthorAvatar').textContent = result.authorName[0];
                                document.getElementById('postAuthorAvatar').style.display = 'flex';
                                document.getElementById('postAuthorAvatar').style.alignItems = 'center';
                                document.getElementById('postAuthorAvatar').style.justifyContent = 'center';
                                document.getElementById('postAuthorAvatar').style.fontWeight = 'bold';
                            }
                        } else {
                            document.getElementById('postAuthor').style.display = 'none';
                        }
                        
                        if (result.mainImage) {
                            const imgEl = document.getElementById('postImage');
                            imgEl.src = getSanityImageUrl(result.mainImage).replace('w=800&h=500', 'w=1200'); // Larger for hero
                            imgEl.style.display = 'block';
                        }
                        
                        postContainer.innerHTML = parsePortableText(result.body);
                    } else {
                        document.getElementById('postTitle').textContent = 'Post Not Found';
                        postContainer.innerHTML = '<p>The requested insight could not be found or has been removed.</p>';
                    }
                })
                .catch(err => console.error('Post fetch error:', err));
        } else {
            document.getElementById('postTitle').textContent = 'Invalid Post';
            postContainer.innerHTML = '<p>No post identifier provided.</p>';
        }
    }

    // ==========================================
    // ADVANCED FORM HANDLING
    // ==========================================
    const mainContactForm = document.getElementById('contactForm');
    const mainSuccessModal = document.getElementById('successModal');
    const mainFormSubmitBtn = document.getElementById('formSubmitBtn');

    if (mainContactForm && mainSuccessModal) {
        mainContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalBtnText = mainFormSubmitBtn.textContent;
            mainFormSubmitBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Sending...';
            mainFormSubmitBtn.disabled = true;

            const formData = new FormData(mainContactForm);
            
            // Append subject based on page context or newsletter
            const isNewsletter = formData.get('newsletter') === 'on';
            if (isNewsletter) {
                formData.append('subject', 'New Lead + Newsletter Subscription');
            } else {
                formData.append('subject', 'New Inquiry from Website');
            }

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    mainSuccessModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    mainContactForm.reset();
                } else {
                    console.log(response);
                    alert(json.message || "Something went wrong.");
                }
            })
            .catch(error => {
                console.log(error);
                alert("Something went wrong!");
            })
            .finally(() => {
                mainFormSubmitBtn.innerHTML = originalBtnText;
                mainFormSubmitBtn.disabled = false;
            });
        });

        const closeSuccessBtn = mainSuccessModal.querySelector('.close-modal-btn');
        const closeIcon = mainSuccessModal.querySelector('.close-modal');

        const closeSuccess = () => {
            mainSuccessModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeSuccess);
        if (closeIcon) closeIcon.addEventListener('click', closeSuccess);
        window.addEventListener('click', (e) => {
            if (e.target === mainSuccessModal) closeSuccess();
        });
    }

    // ==========================================
    // ACADEMY FAQ ENGINE
    // ==========================================
    const faqContainer = document.getElementById('faqContainer');
    
    if (faqContainer) {
        const QUERY = encodeURIComponent('*[_type == "faq"] | order(order asc, question asc) {question, answer, category}');
        const URL = `https://x3rb0ahu.apicdn.sanity.io/v2023-01-01/data/query/production?query=${QUERY}`;
        
        fetch(URL)
            .then(res => res.json())
            .then(({ result }) => {
                faqContainer.innerHTML = '';
                if (result && result.length > 0) {
                    result.forEach(faq => {
                        const item = document.createElement('div');
                        item.className = 'faq-item reveal';
                        item.style.background = 'rgba(255, 255, 255, 0.03)';
                        item.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                        item.style.borderRadius = '12px';
                        item.style.overflow = 'hidden';
                        
                        item.innerHTML = `
                            <button class="faq-question" style="width: 100%; text-align: left; padding: 1.5rem; background: transparent; border: none; color: white; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-family: var(--font-heading);">
                                ${faq.question}
                                <i class="ph ph-plus" style="color: var(--primary); transition: transform 0.3s ease;"></i>
                            </button>
                            <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease;">
                                <p style="padding: 0 1.5rem 1.5rem 1.5rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">${faq.answer}</p>
                            </div>
                        `;
                        faqContainer.appendChild(item);
                        if (typeof revealObserver !== 'undefined') revealObserver.observe(item);
                    });
                    
                    // Setup FAQ Interaction
                    const faqItems = document.querySelectorAll('.faq-item');
                    faqItems.forEach(item => {
                        const btn = item.querySelector('.faq-question');
                        const answer = item.querySelector('.faq-answer');
                        const icon = item.querySelector('.ph-plus');
                        
                        btn.addEventListener('click', () => {
                            const isOpen = item.classList.contains('active');
                            
                            // Close all others
                            faqItems.forEach(otherItem => {
                                otherItem.classList.remove('active');
                                const otherAnswer = otherItem.querySelector('.faq-answer');
                                const otherIcon = otherItem.querySelector('i');
                                otherAnswer.style.maxHeight = '0';
                                if(otherIcon) {
                                    otherIcon.classList.remove('ph-minus');
                                    otherIcon.classList.add('ph-plus');
                                    otherIcon.style.transform = 'rotate(0)';
                                }
                            });
                            
                            if (!isOpen) {
                                item.classList.add('active');
                                answer.style.maxHeight = answer.scrollHeight + 30 + 'px'; // + padding
                                icon.classList.remove('ph-plus');
                                icon.classList.add('ph-minus');
                                icon.style.transform = 'rotate(180deg)';
                            }
                        });
                    });
                } else {
                    faqContainer.innerHTML = '<p style="text-align: center;">FAQs will be updated soon.</p>';
                }
            })
            .catch(err => console.error('FAQ fetch error:', err));
    }

});
