import { ExternalLink, ArrowUpRight } from "lucide-react";

export default function AboutFeaturedCaseStudies() {
  const caseStudies = [
    {
      title: "Portfolio & Headless CMS",
      tag: "FULL-STACK • CMS • ARCHITECTURE",
      badge: "PRODUCTION LIVE 🚀",
      badgeColor:
        "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
      description:
        "Full-stack web application with a role-based Headless CMS Admin Dashboard, hardened RESTful APIs with JWT Guards, image upload pipeline, and real-time LINE notification integration.",
      techStack: [
        "React 18",
        "NestJS",
        "MongoDB",
        "Tailwind CSS",
        "JWT Auth",
        "Multer",
      ],
      highlights: [
        "Architected role-based JWT Authentication Guards preventing unauthorized data tampering.",
        "Implemented aggressive MongoDB connection idle timeout middleware to optimize cloud server resources.",
        "Integrated automated LINE Messaging API notifications for real-time contact form dispatch.",
        "Deployed multi-tier architecture with React on Vercel and NestJS API on Railway.",
      ],
      liveUrl: "https://port-folio-web-phi.vercel.app",
      frontendUrl: "https://github.com/NutNuttaphong/port-folio-web",
      backendUrl: "https://github.com/NutNuttaphong/port-folio-api",
    },
    {
      title: "First Shop Online (E-Commerce Platform)",
      tag: "FULL-STACK • REAL-TIME CHAT",
      badge: "FEATURED WORK",
      badgeColor:
        "bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/30",
      description:
        "Modern e-commerce platform featuring an interactive product catalog, administrative dashboard, and a real-time WebSocket chat system connecting shoppers directly with store managers.",
      techStack: ["React", "Node.js", "Socket.IO", "Express", "Tailwind CSS"],
      highlights: [
        "Engineered bidirectional real-time messaging using Socket.IO for customer support.",
        "Built responsive shopping cart and interactive delivery status tracking interface.",
        "Integrated role-based permissions separating customer storefront from admin backplane.",
      ],
      liveUrl: "https://shop-ft.vercel.app/login",
      frontendUrl: "https://github.com/NutNuttaphong",
    },
    {
      title: "AutoTransSub (Local AI Media Generator)",
      tag: "AI & MEDIA AUTOMATION",
      badge: "AI EXPERIMENT",
      badgeColor:
        "bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30",
      description:
        "Automated multilingual video subtitle generation pipeline running local AI speech models, reducing transcription latency without cloud API expenses.",
      techStack: ["Python", "Whisper AI", "FastAPI", "Local LLM", "FFmpeg"],
      highlights: [
        "Orchestrated OpenAI Whisper models offline to transcribe audio with zero telemetry.",
        "Built asynchronous FastAPI processing jobs with progress polling and SRT export.",
        "Integrated automated video timestamp synchronization and subtitle burnt-in rendering.",
      ],
      liveUrl: null,
      frontendUrl: "https://github.com/NutNuttaphong",
    },
  ];

  return (
    <section
      id="featured-projects"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16"
    >
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-teal-100 text-teal-900 border border-teal-300 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/20 mb-3 shadow-sm">
          <span>🏆</span> BEST ENGINEERING WORKS
        </div>
        <div className="grid justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Featured Projects &amp; Case Studies
          </h2>
          <p className="mt-3 text-start text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            In-depth architectural overview of key production systems I have
            built, showcasing full-stack capabilities, security hardening, and
            real-time integrations.
          </p>
        </div>
      </div>

      {/* Case Study Cards */}
      <div className="space-y-8">
        {caseStudies.map((project) => (
          <div
            key={project.title}
            className="group rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-slate-900/80 shadow-md shadow-slate-200/60 dark:shadow-none p-6 sm:p-10 transition-all duration-300 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/5 text-left"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-full border shadow-sm ${project.badgeColor}`}
                  >
                    {project.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-400 uppercase tracking-wider font-bold">
                    {project.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 tracking-tight transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 text-xs font-bold transition hover:shadow-md hover:shadow-teal-400/25 active:scale-95 cursor-pointer shadow-sm"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.frontendUrl && (
                  <a
                    href={project.frontendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:bg-teal-100/70 dark:hover:bg-slate-700/80 px-3.5 py-2 text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer"
                  >
                    <span>
                      {project.backendUrl ? "Frontend Code" : "Source Code"}
                    </span>
                    <ExternalLink size={12} />
                  </a>
                )}
                {project.backendUrl && (
                  <a
                    href={project.backendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:bg-teal-100/70 dark:hover:bg-slate-700/80 px-3.5 py-2 text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer"
                  >
                    <span>Backend Code</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Project Description (High Contrast Text) */}
            <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal mb-6 text-left">
              {project.description}
            </p>

            {/* Architecture Highlights (Light Slate Box in Light Mode) */}
            <div className="rounded-2xl mt-2 border border-slate-200/90 dark:border-white/10 bg-slate-50 dark:bg-slate-950/70 p-5 sm:p-6 mb-6 shadow-sm dark:shadow-none text-left">
              <h4 className="text-xs font-mono font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>⚡</span>
                <span>Key Architecture &amp; Engineering Highlights:</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-normal text-left">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-teal-700 dark:text-teal-400 font-bold text-base leading-none mt-0.5">
                      ›
                    </span>
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200/80 dark:border-white/10">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-white/10 font-bold shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
