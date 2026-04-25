const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract head, nav, footer
const headEnd = indexHtml.indexOf('<main>');
const footerStart = indexHtml.indexOf('<footer id="contact">');

let header = indexHtml.substring(0, headEnd) + '<main>\n';
let footer = '\n    </main>\n' + indexHtml.substring(footerStart);

const pages = {
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

        <section class="service-cta">
            <h2>Ready to <span class="highlight">amplify</span> your brand?</h2>
            <p>Let's build a marketing engine that consistently brings you new opportunities.</p>
            <a href="#contact" class="btn-primary" style="margin-top: 2rem;">Start Growing</a>
        </section>
    `,
    'training.html': `
        <section class="internal-hero">
            <h1>Skill <span class="highlight">Acquisition</span></h1>
            <p>Empowering the next generation of innovators with hands-on, industry-certified training programs.</p>
        </section>

        <section class="service-intro">
            <div class="section-header">
                <h2>Our <span class="highlight">Academy</span></h2>
                <p>Bridging the gap between theory and real-world execution.</p>
            </div>
            <div class="capabilities-grid">
                <div class="capability-card">
                    <i class="ph ph-laptop"></i>
                    <h3>Tech Training</h3>
                    <p>Comprehensive bootcamps in web development, mobile app architecture, and data science designed for absolute beginners and pros.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-paint-brush-broad"></i>
                    <h3>Creative Arts</h3>
                    <p>Mastering graphic design, professional photography, and cinematic videography using industry-standard tools and techniques.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-handshake"></i>
                    <h3>Business Skills</h3>
                    <p>Specialized workshops in digital marketing, project management, and entrepreneurship to help you build and scale your own business.</p>
                </div>
                <div class="capability-card">
                    <i class="ph ph-certificate"></i>
                    <h3>Certification</h3>
                    <p>Receive recognized industry certifications upon completion of our rigorous programs, helping you stand out in the global job market.</p>
                </div>
            </div>
        </section>

        <section class="process-section">
            <div class="section-header">
                <h2>The <span class="highlight">Learning</span> Journey</h2>
                <p>A structured approach to mastering new skills.</p>
            </div>
            <div class="process-grid">
                <div class="process-step">
                    <div class="step-number">01</div>
                    <h4>Onboarding</h4>
                    <p>Initial assessment and track selection based on your goals.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">02</div>
                    <h4>Core Phase</h4>
                    <p>Intensive hands-on training with expert industry mentors.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">03</div>
                    <h4>Project Work</h4>
                    <p>Building real-world portfolio items to demonstrate mastery.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">04</div>
                    <h4>Review</h4>
                    <p>Final assessments and professional feedback sessions.</p>
                </div>
                <div class="process-step">
                    <div class="step-number">05</div>
                    <h4>Graduate</h4>
                    <p>Certification award and career placement assistance.</p>
                </div>
            </div>
        </section>

        <section class="service-cta">
            <h2>Ready to <span class="highlight">level up</span> your career?</h2>
            <p>Join our next cohort and gain the skills that the modern economy demands.</p>
            <a href="#contact" class="btn-primary" style="margin-top: 2rem;">Apply Now</a>
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
    }

    fs.writeFileSync(filename, pageHeader + content + footer);
}
console.log("Generated 7 files successfully with unique SEO tags.");
