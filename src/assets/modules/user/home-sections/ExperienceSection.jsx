// import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      period: "2023 - 2026",
      duration: "3 years",
      role: "Front-End Developer",
      company: "Be1 Digital Company Limited • Bangkok, Thailand",
      skills: ["Angular", "TypeScript", "Tailwind CSS", "REST API"],
      highlights: [
        {
          text: "Developed web applications for government organizations and private sector clients using Angular and TypeScript.",
        },
        {
          text: "Integrated REST APIs into front-end applications, with an understanding of the system's business analysis (BA) and business logic.",
        },
        {
          text: "Built responsive interfaces with Tailwind CSS in web applications used across mobile devices.",
        },
        {
          text: "Improved web performance with lazy loading and shared reusable components, reducing duplication code and the amount loaded up front.",
          badges: ["[ADD result if known]"],
        },
        {
          text: "Edited back-end code when needed to support front-end requirements. ",
          badges: ["[SPECIFY what, e.g. API response fields]"],
        },
        {
          text: "Collaborated with UI/UX designers, QA engineers and Back-end developers.",
        },
      ],
      type: "work",
    },
    {
      period: "2018 - 2023",
      duration: "Education",
      role: "Bachelor of Engineering (B.Eng.) in Computer Engineering",
      company: "Mae Fah Luang University • Chiang Rai, Thailand",
      skills: [],
      highlights: [
        {
          text: "School of Information Technology — Computer Engineering Curriculum.",
        },
        {
          text: "Core Foundations: Computer Architecture, Algorithms, Distributed Networks, Database Systems, and Object-Oriented Software Design.",
        },
        {
          text: "Senior Capstone: Applied Machine Learning and IoT integrated projects.",
        },
      ],
      type: "education",
    },
  ];

  return (
    <section id="experience" className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12">
      {/* Section Header */}
      <div className="text-left mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Experience &amp; Education
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Industry software engineering experience combined with formal computer engineering education and continuous technical certifications.
        </p>
      </div>

      {/* Timeline with vertical line on left */}
      <div className="relative pl-6 sm:pl-8 space-y-8 sm:space-y-10">
        {experiences.map((item, idx) => {
          const isWork = item.type === "work";
          const isLast = idx === experiences.length - 1;
          return (
            <div key={item.period} className="relative text-left">
              {/* Connecting vertical line to next item (seamlessly joins Node 1 to Node 2) */}
              {!isLast && (
                <div className="absolute -left-[15px] sm:-left-[17px] top-[35px] sm:top-[39px] -bottom-[67px] sm:-bottom-[79px] w-[2px] bg-gradient-to-b from-teal-400 via-teal-400/80 to-teal-500/50 pointer-events-none" />
              )}

              {/* Timeline Node (Centered precisely on the timeline axis) */}
              <div className="absolute -left-[21px] sm:-left-[23px] top-[28px] sm:top-[32px] flex items-center justify-center pointer-events-none z-10">
                {isWork ? (
                  <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-400 border-2 border-[#080d1a] shadow-[0_0_10px_rgba(45,212,191,0.95)]"></span>
                  </span>
                ) : (
                  <div className="h-3.5 w-3.5 rounded-full border-2 border-teal-400 bg-[#080d1a] shadow-[0_0_6px_rgba(45,212,191,0.4)]" />
                )}
              </div>

              {/* Card Container */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c1326]/90 p-6 sm:p-7 backdrop-blur-md shadow-sm transition-all hover:border-teal-500/30">
                {/* Period & Duration Tag */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center text-xs font-mono font-bold text-teal-800 dark:text-teal-300 px-2.5 py-0.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-300 dark:border-teal-500/30">
                    {item.period}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    • {item.duration}
                  </span>
                </div>

                {/* Role Title & Company */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                  {item.role}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-4 pb-4">
                  {item.company}
                </p>

                {/* Tech Pills (if any) */}
                {item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-500/30 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bullet Points */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-teal-400 mt-0.5 font-bold shrink-0 text-xs">✓</span>
                      <div>
                        <span>{h.text}</span>
                        {h.badges && h.badges.map((b, bIdx) => (
                          <span
                            key={bIdx}
                            className="inline-block ml-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
