import angIcon from "../../../images/icon/angular.svg";
import vueIcon from "../../../images/icon/vue.svg";
import reactIcon from "../../../images/icon/react.svg";
import nuxtIcon from "../../../images/icon/nuxt.svg";
import tsIcon from "../../../images/icon/ts.svg";
import javascriptIcon from "../../../images/icon/javascript.svg";
import cssIcon from "../../../images/icon/css.svg";
import tailwindIcon from "../../../images/icon/tailwind.svg";

import githubIcon from "../../../images/icon/github.svg";
import bitbucketIcon from "../../../images/icon/bitbucket.svg";
import postmanIcon from "../../../images/icon/postman.svg";
import sourcetreetIcon from "../../../images/icon/sourcetree.svg";
import vscodeIcon from "../../../images/icon/vscode.svg";
import AntigravityIcon from "../../../images/icon/Antigravity.svg";
import GeminiIcon from "../../../images/icon/Gemini.svg";
import gitlabIcon from "../../../images/icon/gitlab.svg";
import { Code2, Server, Database, Wrench } from "lucide-react";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Engineering",
      icon: Code2,
      accent: "text-teal-700 dark:text-teal-400",
      border: "border-slate-200/90 dark:border-teal-500/20",
      skills: [
        { name: "React 18 / Vite", icon: reactIcon, highlight: true },
        { name: "TypeScript", icon: tsIcon, highlight: true },
        { name: "JavaScript (ES6+)", icon: javascriptIcon },
        { name: "Tailwind CSS", icon: tailwindIcon, highlight: true },
        { name: "Angular", icon: angIcon },
        { name: "Vue.js", icon: vueIcon },
        { name: "Nuxt", icon: nuxtIcon },
        { name: "HTML5 & CSS3", icon: cssIcon },
      ],
      description:
        "Building responsive, high-performance web applications with reusable component architecture, clean state management, and modern interactive UI.",
    },
    {
      title: "Backend & System APIs",
      icon: Server,
      accent: "text-sky-700 dark:text-sky-400",
      border: "border-slate-200/90 dark:border-sky-500/20",
      skills: [
        { name: "NestJS", highlight: true },
        { name: "Node.js" },
        { name: "Express" },
        { name: "RESTful APIs", highlight: true },
        { name: "JWT Auth & Guards", highlight: true },
        { name: "CORS Hardening" },
        { name: "Idle Timeout Mgmt", highlight: true },
        { name: "Socket.IO" },
      ],
      description:
        "Architecting resilient backend microservices with NestJS, role-based JWT authentication, hardened CORS, and aggressive idle connection resource management.",
    },
    {
      title: "Databases & Storage",
      icon: Database,
      accent: "text-emerald-700 dark:text-emerald-400",
      border: "border-slate-200/90 dark:border-emerald-500/20",
      skills: [
        { name: "MongoDB", highlight: true },
        { name: "Mongoose ORM", highlight: true },
        { name: "NoSQL Schema Design" },
        { name: "Aggregation Pipelines" },
        { name: "Database Indexing" },
        { name: "Multer Uploads" },
      ],
      description:
        "Designing scalable NoSQL schemas, database indexes, and efficient aggregation queries with high data integrity and connection pool safety.",
    },
    {
      title: "Engineering Tools & DevOps",
      icon: Wrench,
      accent: "text-indigo-700 dark:text-indigo-400",
      border: "border-slate-200/90 dark:border-indigo-500/20",
      skills: [
        { name: "GitHub / Actions", icon: githubIcon, highlight: true },
        { name: "GitLab", icon: gitlabIcon },
        { name: "Bitbucket", icon: bitbucketIcon },
        { name: "Postman", icon: postmanIcon },
        { name: "VS Code", icon: vscodeIcon },
        { name: "Sourcetree", icon: sourcetreetIcon },
        { name: "Vercel & Railway", highlight: true },
        { name: "Antigravity", icon: AntigravityIcon, highlight: true },
        { name: "Gemini AI", icon: GeminiIcon, highlight: true },
      ],
      description:
        "End-to-end version control, CI/CD automated deployments, API testing suites, and Closed-Loop AI Agent engineering with Google Antigravity & Gemini.",
    },
  ];

  return (
    <section
      id="skills"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-teal-50 dark:bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-500/20 font-semibold mb-3">
          <span>⚡</span> TECH ARSENAL
        </div>
        <div className="grid justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Skills &amp; Technologies
          </h2>
          <p className="mt-3 text-start text-sm sm:text-base text-slate-700 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A full-stack capability spectrum spanning responsive frontends,
            hardened API microservices, distributed databases, and automated AI
            loop workflows.
          </p>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {skillCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className={`rounded-3xl border ${cat.border} bg-white dark:bg-slate-900/80 shadow-md shadow-slate-200/60 dark:shadow-none p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-500/5 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 ${cat.accent}`}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-start sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap mt-2 gap-2">
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-xl border transition-all ${
                        s.highlight
                          ? "bg-teal-50 text-teal-800 border-teal-300 font-semibold shadow-sm dark:bg-slate-800/90 dark:text-teal-300 dark:border-teal-500/30"
                          : "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/80 dark:text-slate-200 dark:border-white/10"
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
