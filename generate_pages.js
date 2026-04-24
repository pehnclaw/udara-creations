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
            <div class="portfolio-item" data-category="marketing">
                <img src="https://via.placeholder.com/600x400/14162D/FF5E00?text=Brand+Campaign" alt="Campaign">
                <div class="portfolio-overlay">
                    <h3>Q3 Brand Awareness</h3>
                    <p>Marketing</p>
                </div>
            </div>
            <div class="portfolio-item" data-category="software">
                <img src="https://via.placeholder.com/600x400/14162D/00F0FF?text=E-Commerce+App" alt="E-Commerce">
                <div class="portfolio-overlay">
                    <h3>Retail Mobile App</h3>
                    <p>Software Development</p>
                </div>
            </div>
            <div class="portfolio-item" data-category="branding">
                <img src="https://via.placeholder.com/600x400/14162D/FF0055?text=Bespoke+Forms" alt="Forms">
                <div class="portfolio-overlay">
                    <h3>Custom Enterprise Forms</h3>
                    <p>Branding</p>
                </div>
            </div>
        </section>
    `,
    'software.html': `
        <section class="internal-hero">
            <h1><span class="highlight">Software</span> Development</h1>
            <p>Bespoke web, mobile, and enterprise applications meticulously engineered for scale, speed, and performance.</p>
        </section>
        <section class="about" style="min-height: 50vh;">
            <div class="about-container">
                <div class="about-content">
                    <h2>Digital <span class="highlight">Transformation</span></h2>
                    <p>We build robust, scalable software solutions that solve real business problems. From complex enterprise dashboards to sleek consumer mobile applications, our engineering team ensures highest code quality.</p>
                </div>
                <div class="about-visual">
                    <div class="visual-element" style="color: var(--accent-cyan); border-color: var(--accent-cyan);">
                        <i class="ph ph-code"></i>
                    </div>
                </div>
            </div>
        </section>
    `,
    'branding.html': `
        <section class="internal-hero">
            <h1><span class="highlight">Branding</span></h1>
            <p>End-to-end branding solutions — graphic design, visual identity, and high-fidelity commercial print production.</p>
        </section>
        <section class="about" style="min-height: 50vh;">
            <div class="about-container">
                <div class="about-content">
                    <h2>Visual <span class="highlight">Identity</span></h2>
                    <p>We don't just print; we conceptualize. Our design team crafts stunning visual identities, marketing collateral, and bespoke forms. Once the digital design is perfected, our state-of-the-art printing facilities bring your brand to life physically with unmatched color accuracy and premium materials.</p>
                </div>
                <div class="about-visual">
                    <div class="visual-element" style="color: var(--accent-magenta); border-color: var(--accent-magenta);">
                        <i class="ph ph-bezier-curve"></i>
                    </div>
                </div>
            </div>
        </section>
    `,
    'media.html': `
        <section class="internal-hero">
            <h1>Creative <span class="highlight">Media</span></h1>
            <p>High-end photography and cinematic videography that captures the essence of your story with artistic precision.</p>
        </section>
        <section class="about" style="min-height: 50vh;">
            <div class="about-container">
                <div class="about-content">
                    <h2>Visual <span class="highlight">Storytelling</span></h2>
                    <p>We bring your vision to life through the lens. Our media team specializes in corporate photography, product shoots, and cinematic video production. We blend technical mastery with creative flair to produce stunning visuals that resonate with your audience.</p>
                </div>
                <div class="about-visual">
                    <div class="visual-element" style="color: var(--accent-purple); border-color: var(--accent-purple);">
                        <i class="ph ph-aperture"></i>
                    </div>
                </div>
            </div>
        </section>
    `,
    'marketing.html': `
        <section class="internal-hero">
            <h1><span class="highlight">Marketing</span> Division</h1>
            <p>Data-driven strategies, brand development, and creative campaigns that capture attention and drive sustainable growth.</p>
        </section>
        <section class="about" style="min-height: 50vh;">
            <div class="about-container">
                <div class="about-content">
                    <h2>Amplify Your <span class="highlight">Voice</span></h2>
                    <p>We craft compelling narratives and deploy them across the right channels. Our marketing team blends creative storytelling with hard analytics to ensure your brand reaches its maximum potential.</p>
                </div>
                <div class="about-visual">
                    <div class="visual-element" style="color: var(--accent-orange); border-color: var(--accent-orange);">
                        <i class="ph ph-megaphone"></i>
                    </div>
                </div>
            </div>
        </section>
    `,
    'training.html': `
        <section class="internal-hero">
            <h1>Skill <span class="highlight">Acquisition</span></h1>
            <p>Empowering the next generation with practical, industry-leading skills and specialized training programs.</p>
        </section>
        <section class="about" style="min-height: 50vh;">
            <div class="about-container">
                <div class="about-content">
                    <h2>Learn from <span class="highlight">Experts</span></h2>
                    <p>Our training unit offers intensive, hands-on courses in tech, design, and business management. We don't just teach theory; we equip individuals with the practical skills needed to thrive in today's economy.</p>
                </div>
                <div class="about-visual">
                    <div class="visual-element" style="color: var(--accent-green); border-color: var(--accent-green);">
                        <i class="ph ph-graduation-cap"></i>
                    </div>
                </div>
            </div>
        </section>
    `,
    'consultation.html': `
        <section class="internal-hero">
            <h1>Business <span class="highlight">Consultation</span></h1>
            <p>Expert guidance and strategic business planning to help your organization navigate complex challenges and scale effectively.</p>
        </section>
        <section class="about" style="min-height: 50vh;">
            <div class="about-container">
                <div class="about-content">
                    <h2>Strategic <span class="highlight">Advantage</span></h2>
                    <p>Leverage our multidisciplinary expertise. Our consultants analyze your business structure, identify bottlenecks, and develop comprehensive roadmaps for sustainable growth and operational efficiency.</p>
                </div>
                <div class="about-visual">
                    <div class="visual-element" style="color: var(--accent-gold); border-color: var(--accent-gold);">
                        <i class="ph ph-briefcase"></i>
                    </div>
                </div>
            </div>
        </section>
    `
};

for (const [filename, content] of Object.entries(pages)) {
    fs.writeFileSync(filename, header + content + footer);
}
console.log("Generated 6 files successfully.");
