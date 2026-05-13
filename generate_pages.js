const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract head, nav, footer
const headEnd = indexHtml.indexOf('<main>');
const footerStart = indexHtml.indexOf('<footer id="contact">');

let header = indexHtml.substring(0, headEnd) + '<main>\n';
let footer = `
    </main>
    
    <!-- WhatsApp Float -->
    <a href="https://wa.me/2347042772050" class="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
        <i class="ph ph-whatsapp-logo"></i>
        <span class="whatsapp-tooltip">Chat with us</span>
    </a>
    <!-- Course Detail Modal -->
    <div id="courseModal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <div class="modal-icon"><i id="courseModalIcon" class="ph ph-graduation-cap"></i></div>
                <div class="modal-text">
                    <h2 id="courseModalTitle">Course Title</h2>
                    <div class="modal-meta">
                        <span id="courseModalDuration" class="meta-tag"></span>
                        <span id="courseModalLevel" class="meta-tag"></span>
                    </div>
                    <p id="courseModalDesc"></p>
                    <div class="modal-actions">
                        <a href="#" id="enrollWhatsApp" class="btn-primary" target="_blank">
                            <i class="ph ph-whatsapp-logo"></i> Enroll via WhatsApp
                        </a>
                        <button id="inquireForm" class="btn-secondary">
                            <i class="ph ph-envelope"></i> Inquire via Form
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Portfolio Modal -->
    <div id="portfolioModal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <img id="modalImg" src="" alt="">
                <div class="modal-text">
                    <h2 id="modalTitle">Project Title</h2>
                    <p id="modalCategory" class="highlight"></p>
                    <p id="modalDesc"></p>
                </div>
            </div>
        </div>
    </div>
    <!-- Success Modal -->
    <div id="successModal" class="modal">
        <div class="modal-content" style="max-width: 400px; text-align: center; padding: 3rem;">
            <span class="close-modal">&times;</span>
            <i class="ph ph-check-circle" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
            <h2>Message <span class="highlight">Sent!</span></h2>
            <p>Thank you for reaching out. Our team will get back to you shortly.</p>
            <button class="btn-primary close-modal-btn" style="margin-top: 1.5rem;">Continue</button>
        </div>
    </div>
` + indexHtml.substring(footerStart);


const pages = {
    'blog.html': `
        <section class="internal-hero">
            <h1>Udara <span class="highlight">Insights</span></h1>
            <p>Thoughts, stories and ideas from our team of innovators.</p>
        </section>
        <section class="blog-filters" style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 3rem; flex-wrap: wrap;">
            <button class="filter-btn active" data-filter="all">All Posts</button>
            <button class="filter-btn" data-filter="tech">Tech & Software</button>
            <button class="filter-btn" data-filter="branding">Branding</button>
            <button class="filter-btn" data-filter="media">Media</button>
            <button class="filter-btn" data-filter="academy">Academy News</button>
        </section>
        <section class="blog-grid" id="blogGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; padding: 0 5%;">
            <!-- Dynamic Blog Posts from Sanity -->
            <div class="course-card-skeleton" style="height: 350px;"></div>
            <div class="course-card-skeleton" style="height: 350px;"></div>
            <div class="course-card-skeleton" style="height: 350px;"></div>
        </section>
    `,
    'post.html': `
        <section class="internal-hero" id="postHero" style="padding-bottom: 2rem; min-height: 40vh;">
            <div class="post-meta" style="margin-bottom: 1rem; color: var(--text-secondary); display: flex; gap: 1rem; justify-content: center; font-size: 0.9rem;">
                <span id="postCategory" class="meta-tag" style="background: rgba(255,255,255,0.1); border:none;">Category</span>
                <span id="postDate">Loading date...</span>
            </div>
            <h1 id="postTitle" style="font-size: clamp(2rem, 5vw, 4rem); max-width: 900px; margin: 0 auto;">Loading Post...</h1>
            <div id="postAuthor" style="margin-top: 2rem; display: flex; align-items: center; justify-content: center; gap: 1rem;">
                <div class="author-avatar" id="postAuthorAvatar" style="width: 50px; height: 50px; border-radius: 50%; background: var(--border-light);"></div>
                <div style="text-align: left;">
                    <h4 id="postAuthorName" style="margin: 0; font-size: 1rem;">Author</h4>
                    <span id="postAuthorRole" style="font-size: 0.8rem; color: var(--text-secondary);">Role</span>
                </div>
            </div>
        </section>
        <section class="post-content" style="max-width: 800px; margin: 0 auto; padding: 3rem 5%; line-height: 1.8; font-size: 1.1rem; color: var(--text-secondary);">
            <img id="postImage" src="" alt="Post cover" style="width: 100%; border-radius: 20px; margin-bottom: 3rem; display: none;">
            <div id="postBody">
                <div class="course-card-skeleton" style="height: 20px; margin-bottom: 1rem;"></div>
                <div class="course-card-skeleton" style="height: 20px; margin-bottom: 1rem;"></div>
                <div class="course-card-skeleton" style="height: 20px; width: 80%;"></div>
            </div>
        </section>
    `,
    'portfolio.html': `
        <section class="internal-hero">
            <h1>Our <span class="highlight">Portfolio</span></h1>
            <p>A showcase of our premium branding work, software architecture, and creative media productions.</p>
        </section>
        <section class="portfolio-filters">
            <button class="filter-btn active" data-filter="all">All Projects</button>
            <button class="filter-btn" data-filter="software">Software</button>
            <button class="filter-btn" data-filter="branding">Branding</button>
            <button class="filter-btn" data-filter="media">Media</button>
            <button class="filter-btn" data-filter="marketing">Marketing</button>
        </section>
        <section class="portfolio-grid">
            <!-- Dynamic items from Sanity -->
            <div class="portfolio-item" data-category="software">
                <img src="https://via.placeholder.com/600x400/14162D/D6931E?text=Fintech+Dashboard" alt="Fintech App">
                <div class="portfolio-overlay">
                    <h3>Next-Gen Fintech Dashboard</h3>
                    <p>Software Development</p>
                </div>
            </div>
            <div class="portfolio-item" data-category="media">
                <img src="https://via.placeholder.com/600x400/14162D/A855F7?text=Cinematic+Commercial" alt="Commercial">
                <div class="portfolio-overlay">
                    <h3>Premium Brand Story</h3>
                    <p>Creative Media</p>
                </div>
            </div>
            <div class="portfolio-item" data-category="branding">
                <img src="https://via.placeholder.com/600x400/14162D/FF0055?text=Brand+Identity" alt="Identity">
                <div class="portfolio-overlay">
                    <h3>Global Corp Identity</h3>
                    <p>Branding</p>
                </div>
            </div>
        </section>
    `,
    'software.html': `
        <section class="internal-hero">
            <h1><span class="highlight">Software</span> Engineering</h1>
            <p>Bespoke digital solutions architected for the future. We build software that scales as fast as your ambition.</p>
        </section>

        <section class="service-intro">
            <div class="section-header">
                <h2>Our <span class="highlight">Capabilities</span></h2>
                <p>We combine engineering excellence with business logic.</p>
            </div>
            <div class="capabilities-grid">
                <div class="capability-card">
                    <i class="ph ph-browser"></i>
                    <h3>Web Applications</h3>
                    <p>From complex SaaS platforms to enterprise portals, we build responsive, fast-loading web apps using modern frameworks like React and Next.js.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-device-mobile"></i>
                    <h3>Mobile Solutions</h3>
                    <p>Native-feel iOS and Android applications that provide seamless user experiences and leverage the full power of mobile hardware.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-database"></i>
                    <h3>Backend & APIs</h3>
                    <p>Robust, secure, and scalable backend architectures that serve as the reliable backbone for your entire digital ecosystem.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-cloud"></i>
                    <h3>Cloud Infrastructure</h3>
                    <p>Optimized cloud deployment and management on AWS or Azure, ensuring your platform is always available and highly performant.</p>
                </div>
            </div>
        </section>

        <section class="process-section">
            <div class="section-header">
                <h2>The <span class="highlight">Development</span> Process</h2>
                <p>A rigorous methodology designed for transparency and results.</p>
            </div>
            <div class="process-grid">
                <div class="process-step">
                    <div class="step-number">01</div>
                    <h4>Discovery</h4>
                    <p>We dive deep into your requirements and business goals.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">02</div>
                    <h4>Architecture</h4>
                    <p>Designing the technical blueprint for scale and security.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">03</div>
                    <h4>Agile Dev</h4>
                    <p>Iterative development with regular feedback loops.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">04</div>
                    <h4>Quality QA</h4>
                    <p>Rigorous testing across devices and edge cases.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">05</div>
                    <h4>Launch</h4>
                    <p>Seamless deployment and post-launch monitoring.</p>
                </div>
            </div>
        </section>

        <section class="service-portfolio">
            <div class="section-header">
                <h2>Featured <span class="highlight">Case Studies</span></h2>
                <p>See how we've helped others succeed.</p>
            </div>
            <div class="portfolio-grid service-portfolio-grid" data-service-category="software" style="margin-bottom: 4rem;">
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
            </div>
        </section>

        <section class="service-cta">
            <h2>Ready to build something <span class="highlight">extraordinary?</span></h2>
            <p>Let's turn your vision into a high-performing digital reality.</p>
            <a href="#contact" class="btn-primary" style="margin-top: 2rem;">Start Your Project</a>
        </section>
    `,
    'branding.html': `
        <section class="internal-hero">
            <h1>Premium <span class="highlight">Branding</span></h1>
            <p>We blend artistic conceptualization with high-fidelity production to create brands that command attention.</p>
        </section>

        <section class="service-intro">
            <div class="section-header">
                <h2>The <span class="highlight">Core</span> of Your Identity</h2>
                <p>Everything you need to stand out in a crowded marketplace.</p>
            </div>
            <div class="capabilities-grid">
                <div class="capability-card">
                    <i class="ph ph-palette"></i>
                    <h3>Visual Identity</h3>
                    <p>Logo design, typography systems, and color palettes that capture the soul of your business and resonate with your audience.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-printer"></i>
                    <h3>High-Fidelity Print</h3>
                    <p>State-of-the-art printing facilities for premium business cards, marketing collateral, and large-scale commercial production.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-newspaper"></i>
                    <h3>Brand Strategy</h3>
                    <p>Defining your brand's voice, mission, and positioning to ensure consistent communication across all digital and physical touchpoints.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-package"></i>
                    <h3>Packaging Design</h3>
                    <p>Bespoke packaging solutions that protect your products while creating an unforgettable unboxing experience for your clients.</p>
                </div>
            </div>
        </section>

        <section class="process-section">
            <div class="section-header">
                <h2>Our <span class="highlight">Creative</span> Workflow</h2>
                <p>From the first sketch to the final print run.</p>
            </div>
            <div class="process-grid">
                <div class="process-step">
                    <div class="step-number">01</div>
                    <h4>Insight</h4>
                    <p>Understanding your industry, competitors, and core values.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">02</div>
                    <h4>Ideation</h4>
                    <p>Developing multiple creative directions for your visual identity.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">03</div>
                    <h4>Refinement</h4>
                    <p>Polishing the chosen direction until every detail is perfect.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">04</div>
                    <h4>Production</h4>
                    <p>High-quality printing and digital asset preparation.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">05</div>
                    <h4>Delivery</h4>
                    <p>Providing all assets and physical materials for launch.</p>
                </div>
            </div>
        </section>

        <section class="service-portfolio">
            <div class="section-header">
                <h2>Featured <span class="highlight">Case Studies</span></h2>
                <p>See how we've helped others succeed.</p>
            </div>
            <div class="portfolio-grid service-portfolio-grid" data-service-category="branding" style="margin-bottom: 4rem;">
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
            </div>
        </section>

        <section class="service-cta">
            <h2>Make your brand <span class="highlight">unforgettable.</span></h2>
            <p>Join the ranks of premium businesses that trust Udara for their visual excellence.</p>
            <a href="#contact" class="btn-primary" style="margin-top: 2rem;">Start Branding</a>
        </section>
    `,
    'media.html': `
        <section class="internal-hero">
            <h1>Creative <span class="highlight">Media</span></h1>
            <p>Capturing the soul of your story through world-class cinematography and high-fidelity photography.</p>
        </section>

        <section class="service-intro">
            <div class="section-header">
                <h2>Visual <span class="highlight">Artistry</span></h2>
                <p>We combine technical precision with creative vision.</p>
            </div>
            <div class="capabilities-grid">
                <div class="capability-card">
                    <i class="ph ph-video-camera"></i>
                    <h3>Cinematography</h3>
                    <p>High-end video production, from corporate documentaries and commercials to cinematic brand stories and music videos.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-camera"></i>
                    <h3>Photography</h3>
                    <p>Expert photography services including corporate portraits, product cataloging, events, and artistic editorial shoots.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-film-slate"></i>
                    <h3>Post-Production</h3>
                    <p>Advanced color grading, professional sound design, and meticulous editing that brings the final masterpiece to life.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-drone"></i>
                    <h3>Aerial Media</h3>
                    <p>Stunning 4K drone cinematography and photography providing a unique, high-altitude perspective for your projects.</p>
                </div>
            </div>
        </section>

        <section class="process-section">
            <div class="section-header">
                <h2>The <span class="highlight">Production</span> Workflow</h2>
                <p>Our systematic approach to creating cinematic excellence.</p>
            </div>
            <div class="process-grid">
                <div class="process-step">
                    <div class="step-number">01</div>
                    <h4>Pre-Prod</h4>
                    <p>Storyboarding, location scouting, and script development.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">02</div>
                    <h4>The Shoot</h4>
                    <p>Execution with top-tier equipment and creative direction.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">03</div>
                    <h4>Editing</h4>
                    <p>Assembling the narrative and refining the visual flow.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">04</div>
                    <h4>Mastering</h4>
                    <p>Final color grading, sound mixing, and visual effects.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">05</div>
                    <h4>Delivery</h4>
                    <p>Providing optimized files for all platforms and formats.</p>
                </div>
            </div>
        </section>

        <section class="service-portfolio">
            <div class="section-header">
                <h2>Featured <span class="highlight">Case Studies</span></h2>
                <p>See how we've helped others succeed.</p>
            </div>
            <div class="portfolio-grid service-portfolio-grid" data-service-category="media" style="margin-bottom: 4rem;">
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
            </div>
        </section>

        <section class="service-cta">
            <h2>Bring your vision to <span class="highlight">life.</span></h2>
            <p>Let's create something cinematic that your audience will never forget.</p>
            <a href="#contact" class="btn-primary" style="margin-top: 2rem;">Book a Session</a>
        </section>
    `,
    'marketing.html': `
        <section class="internal-hero">
            <h1>Strategic <span class="highlight">Marketing</span></h1>
            <p>Data-driven campaigns that capture attention, drive engagement, and accelerate business growth.</p>
        </section>

        <section class="service-intro">
            <div class="section-header">
                <h2>Our <span class="highlight">Growth</span> Engines</h2>
                <p>We blend creative storytelling with analytical precision.</p>
            </div>
            <div class="capabilities-grid">
                <div class="capability-card">
                    <i class="ph ph-chart-line-up"></i>
                    <h3>Digital Strategy</h3>
                    <p>Comprehensive roadmaps that define your target audience, identify growth opportunities, and set measurable KPIs for success.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-instagram-logo"></i>
                    <h3>Social Media</h3>
                    <p>Building high-engagement communities across Instagram, X, TikTok, and LinkedIn with thumb-stopping content and active management.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-trend-up"></i>
                    <h3>Paid Advertising</h3>
                    <p>Optimized Meta Ads, Google Ads, and LinkedIn campaigns designed to maximize ROI and lower your customer acquisition cost.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-envelope-simple-open"></i>
                    <h3>Email Marketing</h3>
                    <p>Automated lifecycle campaigns and curated newsletters that nurture leads and turn one-time buyers into loyal brand advocates.</p>
                </div>
            </div>
        </section>

        <section class="process-section">
            <div class="section-header">
                <h2>The <span class="highlight">Marketing</span> Framework</h2>
                <p>How we scale your brand systematically.</p>
            </div>
            <div class="process-grid">
                <div class="process-step">
                    <div class="step-number">01</div>
                    <h4>Analysis</h4>
                    <p>Auditing your current presence and competitor landscape.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">02</div>
                    <h4>Strategy</h4>
                    <p>Drafting a custom campaign blueprint based on data.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">03</div>
                    <h4>Execution</h4>
                    <p>Launching creative assets across optimized channels.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">04</div>
                    <h4>Optimization</h4>
                    <p>Real-time A/B testing and performance tuning.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">05</div>
                    <h4>Scaling</h4>
                    <p>Doubling down on winning tactics for maximum impact.</p>
                </div>
            </div>
        </section>

        <section class="service-portfolio">
            <div class="section-header">
                <h2>Featured <span class="highlight">Case Studies</span></h2>
                <p>See how we've helped others succeed.</p>
            </div>
            <div class="portfolio-grid service-portfolio-grid" data-service-category="marketing" style="margin-bottom: 4rem;">
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
                <div class="testimonial-card-skeleton" style="height: 300px; width: 100%; border-radius: 20px;"></div>
            </div>
        </section>

        <section class="service-cta">
            <h2>Ready to <span class="highlight">amplify</span> your brand?</h2>
            <p>Let's build a marketing engine that consistently brings you new opportunities.</p>
            <a href="#contact" class="btn-primary" style="margin-top: 2rem;">Start Growing</a>
        </section>
    `,
    'training.html': `
        <!-- Track Navigation (Desktop Only) -->
        <div class="track-nav">
            <a href="#tech" class="track-nav-item active" data-label="Tech Skills"></a>
            <a href="#languages" class="track-nav-item" data-label="Languages"></a>
            <a href="#music" class="track-nav-item" data-label="Musical Arts"></a>
            <a href="#handcrafts" class="track-nav-item" data-label="Handcrafts"></a>
            <a href="#business" class="track-nav-item" data-label="Business & Management"></a>
            <a href="#showcase" class="track-nav-item" data-label="Student Showcase"></a>
        </div>

        <!-- Mobile Track Navigation (Chips) -->
        <div class="mobile-track-nav">
            <a href="#tech" class="mobile-nav-chip active">Tech</a>
            <a href="#languages" class="mobile-nav-chip">Languages</a>
            <a href="#music" class="mobile-nav-chip">Music</a>
            <a href="#handcrafts" class="mobile-nav-chip">Handcrafts</a>
            <a href="#business" class="mobile-nav-chip">Business</a>
            <a href="#showcase" class="mobile-nav-chip">Showcase</a>
        </div>

        <section class="internal-hero">
            <h1>Skill <span class="highlight">Acquisition</span></h1>
            <p>Empowering the next generation of innovators with hands-on, industry-certified training programs.</p>
        </section>

        <!-- Tech Track -->
        <section id="tech" class="track-section tech-track">
            <div class="track-glow"></div>
            <div class="section-header">
                <span class="meta-tag">Code & Build</span>
                <h2>Tech <span class="highlight">Training</span></h2>
                <p>Master the tools that power the digital economy.</p>
            </div>
            <div class="track-grid" id="techGrid">
                <!-- Dynamic cards from Sanity -->
                <div class="course-card-skeleton"></div>
                <div class="course-card-skeleton"></div>
            </div>
        </section>

        <!-- Languages Track -->
        <section id="languages" class="track-section language-track">
            <div class="track-glow"></div>
            <div class="section-header">
                <span class="meta-tag">Speak & Connect</span>
                <h2>Language <span class="highlight">Mastery</span></h2>
                <p>Bridge cultural gaps with professional language training.</p>
            </div>
            <div class="track-grid" id="languagesGrid">
                <div class="course-card-skeleton"></div>
            </div>
        </section>

        <!-- Musical Track -->
        <section id="music" class="track-section musical-track">
            <div class="track-glow"></div>
            <div class="section-header">
                <span class="meta-tag">Rhythm & Harmony</span>
                <h2>Musical <span class="highlight">Arts</span></h2>
                <p>Find your voice and master your instrument with expert guidance.</p>
            </div>
            <div class="track-grid" id="musicGrid">
                <div class="course-card-skeleton"></div>
                <div class="course-card-skeleton"></div>
            </div>
        </section>

        <!-- Handcrafts Track -->
        <section id="handcrafts" class="track-section handcraft-track">
            <div class="track-glow"></div>
            <div class="section-header">
                <span class="meta-tag">Craft & Create</span>
                <h2>Handcraft <span class="highlight">Studio</span></h2>
                <p>Master traditional and modern artisanal crafts.</p>
            </div>
            <div class="track-grid" id="handcraftsGrid">
                <div class="course-card-skeleton"></div>
                <div class="course-card-skeleton"></div>
            </div>
        </section>

        <!-- Business Track -->
        <section id="business" class="track-section business-track">
            <div class="track-glow"></div>
            <div class="section-header">
                <span class="meta-tag">Lead & Scale</span>
                <h2>Business & <span class="highlight">Management</span></h2>
                <p>Master the operational and strategic skills to scale your career.</p>
            </div>
            <div class="track-grid" id="businessGrid">
                <div class="course-card-skeleton"></div>
                <div class="course-card-skeleton"></div>
            </div>
        </section>

        <!-- Student Showcase -->
        <section id="showcase" class="showcase-section">
            <div class="section-header">
                <h2>Student <span class="highlight">Showcase</span></h2>
                <p>Real stories from our talented graduates.</p>
            </div>
            <div id="academyTestimonialsGrid" class="testimonial-grid">
                <!-- Dynamic Testimonials from Sanity -->
                <div class="testimonial-card-skeleton" style="height: 200px; background: rgba(255,255,255,0.02); border-radius: 16px; animation: pulse 1.5s infinite;"></div>
                <div class="testimonial-card-skeleton" style="height: 200px; background: rgba(255,255,255,0.02); border-radius: 16px; animation: pulse 1.5s infinite;"></div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section id="faqs" class="faq-section" style="padding: 5rem 5%; max-width: 800px; margin: 0 auto;">
            <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
                <h2>Frequently Asked <span class="highlight">Questions</span></h2>
                <p>Everything you need to know about learning at Udara Creations.</p>
            </div>
            <div id="faqContainer" class="faq-accordion" style="display: flex; flex-direction: column; gap: 1rem;">
                <div class="course-card-skeleton" style="height: 60px; border-radius: 12px; background: rgba(255,255,255,0.03);"></div>
                <div class="course-card-skeleton" style="height: 60px; border-radius: 12px; background: rgba(255,255,255,0.03);"></div>
                <div class="course-card-skeleton" style="height: 60px; border-radius: 12px; background: rgba(255,255,255,0.03);"></div>
            </div>
        </section>
    `,
    'consultation.html': `
        <section class="internal-hero">
            <h1>Business <span class="highlight">Consultation</span></h1>
            <p>Expert guidance and strategic roadmaps designed to help your organization navigate complexity and scale effectively.</p>
        </section>

        <section class="service-intro">
            <div class="section-header">
                <h2>Our <span class="highlight">Expertise</span></h2>
                <p>Leveraging multidisciplinary insights for your competitive advantage.</p>
            </div>
            <div class="capabilities-grid">
                <div class="capability-card">
                    <i class="ph ph-strategy"></i>
                    <h3>Growth Strategy</h3>
                    <p>Identifying new market opportunities and developing data-backed plans to expand your business footprint and revenue streams.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-factory"></i>
                    <h3>Operational Efficiency</h3>
                    <p>Auditing your internal processes and implementing streamlined workflows that reduce overhead and maximize productivity.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-users-three"></i>
                    <h3>Digital Transformation</h3>
                    <p>Guiding your organization through the transition to modern digital tools and cloud-based infrastructures for better agility.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-shield-check"></i>
                    <h3>Risk Management</h3>
                    <p>Comprehensive audits to identify potential business risks and developing robust mitigation strategies to protect your assets.</p>
                </div>
            </div>
        </section>

        <section class="process-section">
            <div class="section-header">
                <h2>The <span class="highlight">Consultative</span> Approach</h2>
                <p>A systematic framework for solving your most complex challenges.</p>
            </div>
            <div class="process-grid">
                <div class="process-step">
                    <div class="step-number">01</div>
                    <h4>Discovery</h4>
                    <p>In-depth interviews and data gathering to understand your unique context.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">02</div>
                    <h4>Diagnostic</h4>
                    <p>Analyzing bottlenecks and identifying core areas for improvement.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">03</div>
                    <h4>Blueprint</h4>
                    <p>Presenting a tailored strategic roadmap with clear action items.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">04</div>
                    <h4>Execution</h4>
                    <p>Hands-on support during the implementation of new strategies.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">05</div>
                    <h4>Monitoring</h4>
                    <p>Ongoing review and refinement to ensure sustained growth.</p>
                </div>
            </div>
        </section>

        <section class="service-cta">
            <h2>Let's build your <span class="highlight">future.</span></h2>
            <p>Schedule a strategy session today and take the first step towards optimized business performance.</p>
            <a href="#contact" class="btn-primary" style="margin-top: 2rem;">Book a Consultation</a>
        </section>
    `,
    'about.html': `
        <section class="internal-hero">
            <h1>Who <span class="highlight">We Are</span></h1>
            <p>Udara Creations is more than an agency—we are a multidisciplinary hub where innovation meets execution.</p>
        </section>

        <section class="service-intro">
            <div class="section-header">
                <h2>Our <span class="highlight">Mission</span></h2>
                <p>Breaking dimensions and redefining excellence in the digital age.</p>
            </div>
            <div class="about-page-container" style="max-width: 800px; margin: 4rem auto 0; text-align: center; padding: 0 2rem;">
                <p style="font-size: 1.2rem; line-height: 1.8; color: var(--text-main); margin-bottom: 2rem;">Founded on the principle of integrated innovation, Udara Creations brings together the brightest minds in software engineering, brand strategy, creative media, and business consultation.</p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-muted);">We believe that the best solutions are born at the intersection of different disciplines. Our goal is to empower businesses and individuals by providing high-fidelity digital products, stunning visual identities, and practical skill acquisition programs that drive sustainable growth in a rapidly evolving global economy.</p>
            </div>
        </section>

        <section class="process-section">
            <div class="section-header">
                <h2>Our <span class="highlight">Core</span> Values</h2>
                <p>The principles that guide every project we undertake.</p>
            </div>
            <div class="capabilities-grid">
                <div class="capability-card">
                    <i class="ph ph-target"></i>
                    <h3>Precision</h3>
                    <p>We believe in meticulous attention to detail, from the first line of code to the final frame of a cinematic production.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-lightbulb"></i>
                    <h3>Innovation</h3>
                    <p>We don't just follow trends; we create them by constantly exploring new technologies and creative boundaries.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-shield-check"></i>
                    <h3>Integrity</h3>
                    <p>Transparency and honesty are at the heart of our relationships with clients, partners, and our community.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-globe"></i>
                    <h3>Global Vision</h3>
                    <p>Based in Abuja, we build solutions that compete on the global stage, bridging the gap between local talent and international standards.</p>
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <section class="team-section">
            <div class="section-header">
                <h2>Meet the <span class="highlight">Management</span></h2>
                <p>The visionaries and specialists driving Udara Creations forward.</p>
            </div>
            <div id="teamGrid" class="team-grid">
                <!-- Dynamic team members from Sanity -->
                <div class="team-card-skeleton"></div>
                <div class="team-card-skeleton"></div>
                <div class="team-card-skeleton"></div>
            </div>
        </section>

        <section class="service-cta">
            <h2>Partner with <span class="highlight">Excellence.</span></h2>
            <p>Ready to take your project to the next dimension? Let's talk.</p>
            <a href="#contact" class="btn-primary" style="margin-top: 2rem;">Get in Touch</a>
        </section>
    `,
    'skills-tech.html': `
        <section class="internal-hero tech-track">
            <div class="track-glow"></div>
            <h1>Tech <span class="highlight">Skills</span></h1>
            <p>From lines of code to global infrastructure. Build the future today.</p>
        </section>
        <section class="track-section tech-track">
            <div class="track-grid" id="techGrid">
                <div class="course-card-skeleton"></div>
                <div class="course-card-skeleton"></div>
            </div>
        </section>
    `,
    'skills-languages.html': `
        <section class="internal-hero language-track">
            <h1>Language <span class="highlight">Mastery</span></h1>
            <p>Connect with the world through professional language training.</p>
        </section>
        <section class="track-section language-track">
            <div class="track-grid" id="languagesGrid">
                <div class="course-card-skeleton"></div>
            </div>
        </section>
    `,
    'skills-musical.html': `
        <section class="internal-hero musical-track">
            <h1>Musical <span class="highlight">Arts</span></h1>
            <p>From theory to performance. Express your creativity through sound.</p>
        </section>
        <section class="track-section musical-track">
            <div class="track-grid" id="musicGrid">
                <div class="course-card-skeleton"></div>
            </div>
        </section>
    `,
    'skills-handcrafts.html': `
        <section class="internal-hero handcraft-track">
            <h1>Handcraft <span class="highlight">Studio</span></h1>
            <p>Master the art of creating with your hands.</p>
        </section>
        <section class="track-section handcraft-track">
            <div class="track-grid" id="handcraftsGrid">
                <div class="course-card-skeleton"></div>
            </div>
        </section>
    `,
    'skills-business.html': `
        <section class="internal-hero business-track">
            <h1>Business & <span class="highlight">Management</span></h1>
            <p>Strategic skills for the modern professional.</p>
        </section>
        <section class="track-section business-track">
            <div class="track-grid" id="businessGrid">
                <div class="course-card-skeleton"></div>
            </div>
        </section>
    `
};

for (const [filename, content] of Object.entries(pages)) {
    // Unique SEO titles for each page
    let pageHeader = header;
    if (filename === 'software.html') {
        pageHeader = pageHeader.replace('<title>Udara Creations | Premium Digital Solutions & Innovation</title>', '<title>Software Engineering & App Development | Udara Creations</title>');
        pageHeader = pageHeader.replace('Udara Creations is a multidisciplinary hub in Abuja offering high-end Branding, Software Development, Creative Media, and Strategic Consultation.', 'Bespoke web and mobile applications engineered for scale. Our Abuja-based team delivers robust, high-performing software solutions.');
    } else if (filename === 'branding.html') {
        pageHeader = pageHeader.replace('<title>Udara Creations | Premium Digital Solutions & Innovation</title>', '<title>Premium Branding & Commercial Printing | Udara Creations</title>');
        pageHeader = pageHeader.replace('Udara Creations is a multidisciplinary hub in Abuja offering high-end Branding, Software Development, Creative Media, and Strategic Consultation.', 'Elevate your brand with high-fidelity visual identity design and professional commercial printing services by Udara Creations.');
    } else if (filename === 'media.html') {
        pageHeader = pageHeader.replace('<title>Udara Creations | Premium Digital Solutions & Innovation</title>', '<title>Cinematic Media & Professional Photography | Udara Creations</title>');
        pageHeader = pageHeader.replace('Udara Creations is a multidisciplinary hub in Abuja offering high-end Branding, Software Development, Creative Media, and Strategic Consultation.', 'World-class videography and photography services in Abuja. We capture your brand\'s story with cinematic precision and artistic flair.');
    } else if (filename === 'marketing.html') {
        pageHeader = pageHeader.replace('<title>Udara Creations | Premium Digital Solutions & Innovation</title>', '<title>Strategic Marketing & Digital Growth | Udara Creations</title>');
        pageHeader = pageHeader.replace('Udara Creations is a multidisciplinary hub in Abuja offering high-end Branding, Software Development, Creative Media, and Strategic Consultation.', 'Data-driven marketing strategies and social media management to accelerate your brand\'s growth and engagement.');
    } else if (filename === 'training.html') {
        pageHeader = pageHeader.replace('<title>Udara Creations | Premium Digital Solutions & Innovation</title>', '<title>Skill Acquisition & Tech Training Academy | Udara Creations</title>');
        pageHeader = pageHeader.replace('Udara Creations is a multidisciplinary hub in Abuja offering high-end Branding, Software Development, Creative Media, and Strategic Consultation.', 'Empowering innovators with hands-on training in tech, design, and business. Join the Udara Academy to master modern industry skills.');
    } else if (filename === 'consultation.html') {
        pageHeader = pageHeader.replace('<title>Udara Creations | Premium Digital Solutions & Innovation</title>', '<title>Business Consultation & Strategy | Udara Creations</title>');
        pageHeader = pageHeader.replace('Udara Creations is a multidisciplinary hub in Abuja offering high-end Branding, Software Development, Creative Media, and Strategic Consultation.', 'Expert business guidance and strategic roadmaps to help your organization navigate complexity and achieve sustainable growth.');
    } else if (filename === 'portfolio.html') {
        pageHeader = pageHeader.replace('<title>Udara Creations | Premium Digital Solutions & Innovation</title>', '<title>Our Portfolio | Showcase of Creative Excellence | Udara Creations</title>');
        pageHeader = pageHeader.replace('Udara Creations is a multidisciplinary hub in Abuja offering high-end Branding, Software Development, Creative Media, and Strategic Consultation.', 'Explore our latest work in software development, cinematic media, premium branding, and strategic marketing campaigns.');
    } else if (filename === 'about.html') {
        pageHeader = pageHeader.replace('<title>Udara Creations | Premium Digital Solutions & Innovation</title>', '<title>About Us | The Vision Behind Udara Creations</title>');
        pageHeader = pageHeader.replace('Udara Creations is a multidisciplinary hub in Abuja offering high-end Branding, Software Development, Creative Media, and Strategic Consultation.', 'Discover the mission, values, and story of Udara Creations—Abuja\'s leading multidisciplinary agency.');
    } else if (filename.startsWith('skills-')) {
        pageHeader = pageHeader.replace('<title>Udara Creations | Premium Digital Solutions & Innovation</title>', `<title>${filename.split('-')[1].split('.')[0].toUpperCase()} Track | Udara Academy</title>`);
    }

    fs.writeFileSync(filename, pageHeader + content + footer);
}
console.log(`Generated ${Object.keys(pages).length} files successfully with unique SEO tags.`);
