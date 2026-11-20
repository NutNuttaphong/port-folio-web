import base64
import os
import subprocess
import re
import shutil
from PIL import Image, ImageChops

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
PUBLIC_DIR = os.path.join(PROJECT_DIR, "public")

# 1. Load avatar from project assets
avatar_path = os.path.join(PROJECT_DIR, "src", "assets", "images", "profile-avatar.png")
with open(avatar_path, "rb") as f:
    avatar_b64 = base64.b64encode(f.read()).decode("utf-8")

# 2. Strict 1-Page A4 English HTML Template
# =========================================================================
# >> คุณสามารถแก้ไข Wording / ข้อความใน CV ได้โดยตรงที่ส่วน HTML ด้านล่างนี้ <<
# =========================================================================
html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Nuttaphong Samiphak - Front-End Developer Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Prompt:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  @page {{
    size: A4 portrait;
    margin: 0;
  }}
  * {{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }}
  html, body {{
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 0;
    background: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #1e293b;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    overflow: hidden;
  }}
  .cv-page {{
    width: 210mm;
    height: 297mm;
    max-height: 297mm;
    padding: 10mm 14mm;
    box-sizing: border-box;
    overflow: hidden;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }}
  /* Header */
  .cv-header {{
    display: flex;
    align-items: center;
    gap: 18px;
    padding-bottom: 12px;
    border-bottom: 2px solid #0d9488;
    margin-bottom: 13px;
    flex-shrink: 0;
  }}
  .avatar-wrap {{
    position: relative;
    width: 84px;
    height: 84px;
    border-radius: 50%;
    overflow: hidden;
    border: 2.5px solid #0d9488;
    box-shadow: 0 3px 10px rgba(13, 148, 136, 0.2);
    flex-shrink: 0;
  }}
  .avatar-wrap img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }}
  .header-info {{
    flex: 1;
  }}
  .header-name {{
    font-size: 23px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.15;
    letter-spacing: -0.4px;
  }}
  .name-th {{
    font-size: 16px;
    font-weight: 500;
    color: #64748b;
    font-family: 'Prompt', sans-serif;
    margin-left: 4px;
  }}
  .header-title {{
    font-size: 13.5px;
    font-weight: 600;
    color: #0d9488;
    margin-top: 2px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }}
  .contact-bar {{
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
    margin-top: 6px;
    font-size: 10.5px;
    color: #475569;
  }}
  .contact-item {{
    display: flex;
    align-items: center;
    gap: 5px;
  }}
  .contact-item svg {{
    width: 12px;
    height: 12px;
    color: #0d9488;
    flex-shrink: 0;
  }}

  /* Layout Columns */
  .cv-body {{
    display: grid;
    grid-template-columns: 1fr 220px;
    gap: 22px;
    flex: 1;
  }}

  /* Section Styling */
  .section {{
    margin-bottom: 11px;
  }}
  .section-title {{
    font-size: 11.5px;
    font-weight: 700;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding-bottom: 3px;
    border-bottom: 1.5px solid #e2e8f0;
    margin-bottom: 7px;
    position: relative;
  }}
  .section-title::after {{
    content: '';
    position: absolute;
    left: 0;
    bottom: -1.5px;
    width: 24px;
    height: 2px;
    background: #0d9488;
  }}

  /* Typography */
  p, li {{
    font-size: 10px;
    line-height: 1.45;
    color: #334155;
  }}
  .summary-text {{
    font-size: 10px;
    line-height: 1.48;
    color: #334155;
  }}

  /* Experience / Education */
  .exp-item {{
    margin-bottom: 9px;
  }}
  .exp-head {{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1px;
  }}
  .exp-role {{
    font-size: 11.5px;
    font-weight: 700;
    color: #0f172a;
  }}
  .exp-period {{
    font-size: 9.5px;
    font-weight: 600;
    color: #64748b;
  }}
  .exp-company {{
    font-size: 10px;
    font-weight: 600;
    color: #0d9488;
    margin-bottom: 4px;
  }}
  .bullet-list {{
    list-style: none;
    padding-left: 0;
  }}
  .bullet-list li {{
    position: relative;
    padding-left: 12px;
    margin-bottom: 2.5px;
  }}
  .bullet-list li::before {{
    content: '•';
    color: #0d9488;
    font-weight: bold;
    position: absolute;
    left: 1px;
    top: -1px;
  }}

  /* Projects */
  .proj-item {{
    margin-bottom: 7px;
  }}
  .proj-head {{
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 1px;
  }}
  .proj-name {{
    font-size: 11px;
    font-weight: 700;
    color: #0f172a;
  }}
  .proj-badge {{
    font-size: 8.5px;
    color: #0d9488;
    background: #f0fdfa;
    border: 1px solid #ccfbf1;
    padding: 0.5px 5px;
    border-radius: 3px;
    font-weight: 600;
  }}
  .proj-tech {{
    font-size: 9px;
    color: #0d9488;
    font-weight: 600;
    margin-bottom: 1.5px;
  }}
  .proj-desc {{
    font-size: 9.5px;
    color: #475569;
    line-height: 1.35;
  }}

  /* Sidebar Right */
  .skill-group {{
    margin-bottom: 8.5px;
  }}
  .skill-category {{
    font-size: 9.5px;
    font-weight: 700;
    color: #0f172a;
    text-transform: uppercase;
    margin-bottom: 2px;
    letter-spacing: 0.2px;
  }}
  .skill-list {{
    font-size: 9px;
    color: #475569;
    line-height: 1.38;
  }}
  .cert-item {{
    margin-bottom: 6px;
  }}
  .cert-title {{
    font-size: 9px;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.3;
  }}
  .cert-sub {{
    font-size: 8.5px;
    color: #0d9488;
  }}
</style>
</head>
<body>

<div class="cv-page">
  <!-- Header with Avatar, Name, Title & Contact -->
  <header class="cv-header">
    <div class="avatar-wrap">
      <img src="data:image/png;base64,{avatar_b64}" alt="Nuttaphong Samiphak">
    </div>
    <div class="header-info">
      <!-- 1. ชื่อนามสกุล และตำแหน่ง -->
      <h1 class="header-name">Nuttaphong Samiphak <span class="name-th">(นัฐพงษ์ สามิภักดิ์)</span></h1>
      <p class="header-title">Front-End Developer</p>
      
      <!-- 2. ข้อมูลการติดต่อ -->
      <div class="contact-bar">
        <span class="contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          nuttphong.sp@gmail.com
        </span>
        <span class="contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          061-267-9518
        </span>
        <span class="contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          Bangkok, Thailand
        </span>
        <span class="contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          github.com/NutNuttaphong
        </span>
        <span class="contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          port-folio-web-phi.vercel.app
        </span>
      </div>
    </div>
  </header>

  <!-- Body 2 Columns -->
  <div class="cv-body">
    <!-- Left Column: Summary, Experience, Education, Projects -->
    <div class="main-col">
      <!-- 3. Professional Summary -->
      <section class="section">
        <h2 class="section-title">Professional Summary</h2>
        <p class="summary-text">
          Results-oriented Front-End Developer with 3+ years of experience engineering responsive, high-performance web applications using <strong>Angular</strong> and <strong>TypeScript</strong> for public sector agencies and enterprise clients. Proven expertise in RESTful API integration, scalable component architecture, and systematic state management. Collaborative professional adept in Agile/Scrum environments working closely with UI/UX designers, QA, and backend engineers.
        </p>
      </section>

      <!-- 4. Work Experience -->
      <section class="section">
        <h2 class="section-title">Work Experience</h2>
        <div class="exp-item">
          <div class="exp-head">
            <span class="exp-role">Front-End Developer</span>
            <span class="exp-period">2023 - 2026</span>
          </div>
          <p class="exp-company">Be1 Digital Company Limited • Bangkok, Thailand</p>
          <ul class="bullet-list">
            <li>Developed enterprise-grade web applications for government agencies and private-sector clients using Angular and TypeScript, supporting a large number of concurrent users.</li>
            <li>Designed and built responsive, mobile-first pages with Tailwind CSS, combined with lazy loading to improve performance and load speed.</li>
            <li>Integrated RESTful APIs, structured reusable modular UI components, and managed application state systematically.</li>
            <li>Worked with Business Analysts (BA) and the Back-end team to turn complex business logic into easy-to-use screens and workflows.</li>
            <li>Collaborated with UX/UI designers and QA in an Agile/Scrum process, delivering work on time every sprint.</li>
          </ul>
        </div>
      </section>

      <!-- 5. Education -->
      <section class="section">
        <h2 class="section-title">Education</h2>
        <div class="exp-item">
          <div class="exp-head">
            <span class="exp-role">Bachelor of Engineering (B.Eng.) in Computer Engineering</span>
            <span class="exp-period">2018 - 2023</span>
          </div>
          <p class="exp-company">Mae Fah Luang University • Chiang Rai, Thailand</p>
          <ul class="bullet-list">
            <li>School of Information Technology — Computer Engineering Curriculum</li>
            <li>Core Foundations: Computer Architecture, Algorithms, Distributed Networks, Database Systems, OOP</li>
            <li>Senior Capstone: Applied Machine Learning and IoT Integrated Projects</li>
          </ul>
        </div>
      </section>

      <!-- 6. Key Projects -->
      <section class="section" style="margin-bottom: 0;">
        <h2 class="section-title">Key Projects</h2>

        <div class="proj-item">
          <div class="proj-head">
            <span class="proj-name">FMS System</span>
            <span class="proj-badge">Web App</span>
          </div>
          <p class="proj-tech">Angular • TypeScript • REST API • SQL</p>
          <p class="proj-desc">Factory inventory management system encompassing procurement, sales workflows, and warehouse stock requisition.</p>
        </div>

        <div class="proj-item">
          <div class="proj-head">
            <span class="proj-name">Portfolio and CMS</span>
            <span class="proj-badge">Full-stack</span>
          </div>
          <p class="proj-tech">React • NestJS • MongoDB • Tailwind CSS</p>
          <p class="proj-desc">Personal portfolio with an administrative CMS dashboard for dynamic content and media asset management; deployed on Vercel and Railway.</p>
        </div>

        <div class="proj-item">
          <div class="proj-head">
            <span class="proj-name">First Shop Online</span>
            <span class="proj-badge">Web App</span>
          </div>
          <p class="proj-tech">React • Node.js • Socket.IO • Tailwind CSS</p>
          <p class="proj-desc">E-commerce storefront featuring real-time admin live chat powered by Socket.IO and end-to-end order delivery tracking.</p>
        </div>

        <div class="proj-item">
          <div class="proj-head">
            <span class="proj-name">Trade System</span>
            <span class="proj-badge">Web App</span>
          </div>
          <p class="proj-tech">React • Chart.js • Trading API</p>
          <p class="proj-desc">Stock trading dashboard featuring dynamic financial charts, portfolio analytics, and real-time market data streaming.</p>
        </div>

        <div class="proj-item" style="margin-bottom: 0;">
          <div class="proj-head">
            <span class="proj-name">AutoTransSub</span>
            <span class="proj-badge">AI Tool</span>
          </div>
          <p class="proj-tech">Python • Whisper AI • FastAPI</p>
          <p class="proj-desc">Automated subtitle generation tool powered by local OpenAI Whisper AI models, ensuring fast and private offline speech transcription.</p>
        </div>
      </section>
    </div>

    <!-- Right Column: Skills & Certifications -->
    <div class="side-col">
      <!-- 7. Technical Skills -->
      <section class="section">
        <h2 class="section-title">Technical Skills</h2>

        <div class="skill-group">
          <h3 class="skill-category">Front-End</h3>
          <p class="skill-list">Angular, React, TypeScript, JavaScript (ES6+), HTML5, CSS3</p>
        </div>

        <div class="skill-group">
          <h3 class="skill-category">UI &amp; Styling</h3>
          <p class="skill-list">Tailwind CSS, Responsive Design, Mobile-First UI</p>
        </div>

        <div class="skill-group">
          <h3 class="skill-category">Data &amp; APIs</h3>
          <p class="skill-list">RESTful APIs Integration, State Management, Data Binding</p>
        </div>

        <div class="skill-group">
          <h3 class="skill-category">Tools &amp; Workflow</h3>
          <p class="skill-list">Git, GitHub, GitLab, Bitbucket, Postman, VS Code</p>
        </div>

        <div class="skill-group">
          <h3 class="skill-category">Backend &amp; DB</h3>
          <p class="skill-list">NestJS, Node.js, Express, MongoDB, SQL</p>
        </div>
      </section>

      <!-- 8. Certifications -->
      <section class="section">
        <h2 class="section-title">Certifications</h2>

        <div class="cert-item">
          <p class="cert-title">ReactJS for Beginners: Modern Web Architecture</p>
          <span class="cert-sub">Frontend Development</span>
        </div>

        <div class="cert-item">
          <p class="cert-title">Basic to Intermediate AI: Practical AI Skills for Learning, Working and Earning</p>
          <span class="cert-sub">AI Certification</span>
        </div>

        <div class="cert-item">
          <p class="cert-title">Fundamental Principles of Artificial Intelligence</p>
          <span class="cert-sub">AI Core Foundations</span>
        </div>

        <div class="cert-item">
          <p class="cert-title">Data and Database Fundamentals for AI Systems</p>
          <span class="cert-sub">Data &amp; Systems</span>
        </div>
      </section>
    </div>
  </div>
</div>

</body>
</html>
"""

# Save temporary HTML for rendering
temp_html = os.path.join(SCRIPT_DIR, "cv_template.html")
with open(temp_html, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"[1/4] Saved HTML template to: {temp_html}")

# Path to Chrome
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome_path):
    chrome_path = "chrome"

# Render PDF
pdf_dest_1 = os.path.join(PUBLIC_DIR, "Nuttaphong_Samiphak_CV.pdf")
pdf_dest_2 = os.path.join(PUBLIC_DIR, "Nuttaphong_Samipak_CV.pdf")

cmd_pdf = [chrome_path, "--headless=new", f"--print-to-pdf={pdf_dest_1}", "--no-pdf-header-footer", temp_html]
subprocess.run(cmd_pdf, check=True)
print(f"[2/4] Generated PDF in public/: {pdf_dest_1} ({os.path.getsize(pdf_dest_1)} bytes)")

try:
    if os.path.abspath(pdf_dest_1) != os.path.abspath(pdf_dest_2):
        shutil.copy2(pdf_dest_1, pdf_dest_2)
except Exception as e:
    print(f"Notice: secondary copy skipped ({e})")

# Check Page Count
with open(pdf_dest_1, "rb") as f:
    data = f.read()
pages = len(re.findall(rb'/Type\s*/Page[^s]', data))
print(f"[3/4] Verified PDF Page Count: {pages} page(s)")

# Screenshot for visual preview card
shot_tmp = os.path.join(SCRIPT_DIR, "temp_shot.png")
cmd_shot = [chrome_path, "--headless=new", f"--screenshot={shot_tmp}", "--window-size=1200,1700", temp_html]
subprocess.run(cmd_shot, check=True)

im = Image.open(shot_tmp)
bg = Image.new(im.mode, im.size, (255, 255, 255))
diff = ImageChops.difference(im, bg)
bbox = diff.getbbox()
if bbox:
    pad = 30
    w, h = im.size
    crop_box = (max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(h, bbox[3] + pad))
    cropped = im.crop(crop_box)
    card_dest = os.path.join(PUBLIC_DIR, "cv-preview.png")
    cropped.save(card_dest, "PNG", optimize=True)
    print(f"[4/4] Updated public/cv-preview.png: size {cropped.size}")

if os.path.exists(shot_tmp):
    os.remove(shot_tmp)

print("\n=== Generation Complete! Both PDF and preview image are updated in public/ ===")
