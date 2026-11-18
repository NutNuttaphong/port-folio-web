import angIcon from "../../../images/icon/angular.svg";
import reactIcon from "../../../images/icon/react.svg";
import tsIcon from "../../../images/icon/ts.svg";
import tailwindIcon from "../../../images/icon/tailwind.svg";
import githubIcon from "../../../images/icon/github.svg";
import bitbucketIcon from "../../../images/icon/bitbucket.svg";
import postmanIcon from "../../../images/icon/postman.svg";
import sourcetreetIcon from "../../../images/icon/sourcetree.svg";
import vscodeIcon from "../../../images/icon/vscode.svg";
import gitlabIcon from "../../../images/icon/gitlab.svg";
import { Code2, Server, Database, Wrench } from "lucide-react";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Engineering",
      icon: Code2,
      accent: "text-teal-400 bg-teal-500/10 border-teal-500/30",
      description:
        "Building responsive web applications with reusable components, clean state management and lazy loading.",
      skills: [
        { name: "Angular", icon: angIcon, highlight: true },
        { name: "React", icon: reactIcon, highlight: true  },
        { name: "TypeScript", icon: tsIcon, highlight: true  },
        { name: "Tailwind CSS", icon: tailwindIcon, highlight: true  },
        { name: "JavaScript (ES6+)" },
        { name: "HTML5 & CSS3" },
        { name: "Responsive Design" },
      ],
    },
    {
      title: "Backend & System APIs",
      icon: Server,
      accent: "text-sky-400 bg-sky-500/10 border-sky-500/30",
      description:
        "Basic back-end work with Nest.JS: REST APIs, JWT authentication and CORS settings, and adjusting back-end code to support front-end needs.",
      skills: [
        { name: "NestJS", highlight: true },
        { name: "RESTful APIs", highlight: true },
        { name: "NodeJS" },
        { name: "Express.js" },
        { name: "JWT Auth & Guards" },
        { name: "CORS Hardening" },
        { name: "Socket.IO" },
      ],
    },
    {
      title: "Databases & Storage",
      icon: Database,
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      description:
        "MongoDB schemas and indexes for the portfolio API, and SQL for the FMS system.",
      skills: [
        { name: "MongoDB", highlight: true },
        { name: "SQL" },
        { name: "Mongoose ORM" },
        { name: "NoSQL Schema Design" },
        { name: "Database Indexing" },
      ],
    },
    {
      title: "Engineering Tools & DevOps",
      icon: Wrench,
      accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
      description:
        "Version control, API testing and deployment on Vercel and Railway.",
      skills: [
        { name: "GitHub & Actions", icon: githubIcon, highlight: true },
        { name: "Vercel & Railway", highlight: true },
        { name: "GitLab", icon: gitlabIcon },
        { name: "Bitbucket", icon: bitbucketIcon },
        { name: "Postman", icon: postmanIcon },
        { name: "VS Code", icon: vscodeIcon },
        { name: "SourceTree", icon: sourcetreetIcon },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12"
    >
      {/* Left-Aligned Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 text-left">
        Skills
      </h2>

      {/* 2x2 Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {skillCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c1326]/90 shadow-sm p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-teal-500/30 flex flex-col justify-between"
            >
              <div>
                {/* Title & Icon */}
                <div className="flex items-center gap-3 mb-3.5">
                  <div className={`p-2 rounded-xl border ${cat.accent}`}>
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                    {cat.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300/90 leading-relaxed mb-5 text-left">
                  {cat.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-xl border transition-all ${
                        s.highlight
                          ? "bg-teal-50 text-teal-800 border-teal-400 font-semibold dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-400/50"
                          : "bg-slate-100/90 text-slate-700 border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-white/10"
                      }`}
                    >
                      {s.icon && (
                        <img src={s.icon} alt="" className="w-3.5 h-3.5" />
                      )}
                      <span>{s.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
