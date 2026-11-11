import { GitBranch, ExternalLink, Cpu } from "lucide-react";

export default function CommunitySection() {
  const openSourceProjects = [
    {
      name: "port-folio-web",
      description:
        "Modern React 18 client architecture featuring Swiper 3D coverflow, Tailwind CSS, and real-time LINE messaging integration.",
      tech: ["React 18", "Tailwind CSS", "Vite", "Swiper"],
      url: "https://github.com/NutNuttaphong/port-folio-web",
    },
    {
      name: "port-folio-api",
      description:
        "Production-grade NestJS backend API with MongoDB, JWT authentication guards, and aggressive connection idle timeout management.",
      tech: ["NestJS", "TypeScript", "MongoDB", "JWT"],
      url: "https://github.com/NutNuttaphong/port-folio-api",
    },
  ];

  const loopPillars = [
    {
      icon: "⚡",
      title: "Agentic Execution Loops",
      desc: "Architects Plan ➔ Execute ➔ Validate ➔ Self-Correct execution cycles to reliably ship production features.",
    },
    {
      icon: "🛡️",
      title: "Harness & Safety Guardrails",
      desc: "Enforces strict token budgets, bounded scopes, and sandboxed file system safety barriers.",
    },
    {
      icon: "🧪",
      title: "Automated Quality Gates",
      desc: "Integrates production builds, static linting, and unit test suites directly into agent validation steps.",
    },
    {
      icon: "🤝",
      title: "Human-in-the-Loop",
      desc: "Surfaces architectural decision points where the system halts to request human guidance.",
    },
  ];

  return (
    <section
      id="community"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-50 dark:bg-sky-500/10 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-500/20 font-semibold mb-3">
          <span>🌐</span> OPEN SOURCE &amp; WRITING
        </div>
        <div className="grid justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Community, Writing &amp; Open Source
          </h2>
          <p className="mt-3 text-start text-sm sm:text-base text-slate-700 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Sharing verified architectures, publishing production-grade open
            source repositories, and advancing Loop Engineering methodologies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Card: Open Source Repositories */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 shadow-md shadow-slate-200/60 dark:shadow-none p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between transition hover:border-teal-500/30 text-left">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 text-teal-700 dark:text-teal-400">
                  <GitBranch size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Open Source Repositories
                  </h3>
                  <p className="text-xs text-start text-slate-600 dark:text-slate-400">
                    Public codebase on GitHub
                  </p>
                </div>
              </div>
              <a
                href="https://github.com/NutNuttaphong"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 flex items-center gap-1 font-mono transition font-semibold"
              >
                <span>View Profile</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Dedicated to open engineering practices. All core systems and demo
              architectures are published openly for technical review and
              community collaboration.
            </p>

            <div className="space-y-4 mt-2">
              {openSourceProjects.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/60 p-4 transition-all hover:border-teal-500/40 hover:bg-teal-50/50 dark:hover:bg-slate-800/80 group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-300 transition font-mono">
                      {p.name}
                    </span>
                    <ExternalLink
                      size={13}
                      className="text-slate-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition"
                    />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Loop Engineering Principles */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 shadow-md shadow-slate-200/60 dark:shadow-none p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between transition hover:border-teal-500/30 text-left">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20 text-teal-700 dark:text-teal-400">
                <Cpu size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Loop Engineering Framework
                </h3>
                <p className="text-xs text-teal-700 dark:text-teal-300 font-mono font-medium">
                  Autonomous Coding Loops &amp; Quality Gates
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Moving beyond one-off prompting into{" "}
              <strong className="text-teal-800 dark:text-teal-300 font-semibold">
                Closed-Loop AI Engineering
              </strong>{" "}
              — empowering autonomous agents (Google Antigravity &amp; Gemini)
              to plan, write, verify, and self-correct with sandboxed safety.
            </p>

            <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 gap-3">
              {loopPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/60 p-3.5 shadow-sm dark:shadow-none flex flex-col justify-between transition-all hover:border-teal-500/40 hover:bg-teal-50/50 dark:hover:bg-slate-800/80"
                >
                  <div className="text-sm font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                    <span>{pillar.icon}</span>
                    <span className="text-xs sm:text-sm">{pillar.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">
            <span>Engineering Standard: Loop 2.0</span>
            <span className="text-teal-700 dark:text-teal-400 font-semibold">Verified System</span>
          </div>
        </div>
      </div>
    </section>
  );
}
