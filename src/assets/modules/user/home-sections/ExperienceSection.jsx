import { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  X,
} from "lucide-react";

import slideImage1 from "../../../images/image/ai1.png";
import slideImage2 from "../../../images/image/ai2.png";
import slideImage3 from "../../../images/image/ai3.png";
import slideImage4 from "../../../images/image/ai4.png";
import slideImage5 from "../../../images/image/ai5.png";
import slideImage6 from "../../../images/image/ai6.png";
import slideImage7 from "../../../images/image/react.png";

export default function ExperienceSection() {
  const [selectedCert, setSelectedCert] = useState(null);

  const timelineData = [
    {
      period: "2023 - 2026",
      role: "Front-End Developer",
      company: "Be1 Digital Company Limited",
      location: "Bangkok, Thailand",
      type: "work",
      highlights: [
        "Architected and maintained high-impact enterprise web applications for government organizations and private enterprise sectors.",
        "Built responsive, data-driven interfaces using Angular, TypeScript and modern CSS/Tailwind.",
        "Engineered RESTful API integrations, reusable UI components, and state management pipelines.",
        "Collaborated across cross-functional teams including UX/UI designers, QA engineers, and Backend developers.",
      ],
    },
    {
      period: "2018 - 2023",
      role: "Bachelor of Engineering (B.Eng.) in Computer Engineering",
      company: "Mae Fah Luang University",
      location: "Chiang Rai, Thailand",
      type: "education",
      highlights: [
        "School of Information Technology — Computer Engineering Curriculum.",
        "Core Foundations: Computer Architecture, Algorithms, Distributed Networks, Database Systems, and Object-Oriented Software Design.",
        "Senior Capstone: Applied Machine Learning and IoT integration projects.",
      ],
    },
  ];

  const certificates = [
    {
      id: 1,
      title:
        "Basic to Intermediate AI: Practical AI Skills for Learning, Working & Earning",
      image: slideImage1,
      issuer: "AI Certification",
    },
    {
      id: 2,
      title: "ReactJS for Beginners — Modern Web Architecture",
      image: slideImage7,
      issuer: "Frontend Development",
    },
    {
      id: 3,
      title: "Fundamental Principles of Artificial Intelligence",
      image: slideImage3,
      issuer: "AI Core Foundations",
    },
    {
      id: 4,
      title: "AI for Lifelong Learning and Self-Development",
      image: slideImage4,
      issuer: "AI Applied Practices",
    },
    {
      id: 5,
      title: "Data and Database Fundamentals for AI Systems",
      image: slideImage5,
      issuer: "Data & Systems",
    },
    {
      id: 6,
      title: "AI-Driven Workflow and Process Optimization",
      image: slideImage6,
      issuer: "Workflow Automation",
    },
    {
      id: 7,
      title: "Ethics, Security, and the Future of AI",
      image: slideImage2,
      issuer: "AI Governance & Safety",
    },
  ];

  return (
    <section
      id="experience"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/20 font-semibold mb-3">
          <span>📜</span> BACKGROUND &amp; CREDENTIALS
        </div>
        <div className="grid justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Experience &amp; Education
          </h2>
          <p className="mt-3 text-start text-sm sm:text-base text-slate-700 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Industry software engineering experience combined with formal
            computer engineering education and continuous technical
            certifications.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative mb-20">
        {/* Vertical Center Line */}
        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-teal-400 via-sky-400 to-indigo-500/40" />

        <div className="flex flex-col gap-10 md:gap-14">
          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const Icon = item.type === "work" ? Briefcase : GraduationCap;

            return (
              <div
                key={item.period}
                className="relative flex items-center md:justify-between"
              >
                {/* Timeline Center Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-white dark:bg-slate-950 border-2 border-teal-500 dark:border-teal-400 flex items-center justify-center shadow-md dark:shadow-teal-500/30">
                    <div className="h-2 w-2 rounded-full bg-teal-400 animate-ping" />
                  </div>
                </div>

                {/* Content Box */}
                <div
                  className={`ml-12 md:ml-0 md:w-[46%] ${
                    isLeft ? "md:mr-auto text-left" : "md:ml-auto text-left"
                  }`}
                >
                  <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl transition-all hover:border-teal-400/40 hover:shadow-teal-500/10">
                    {/* Period & Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal-900 dark:text-teal-300 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-500/10 border border-teal-300 dark:border-teal-500/20 font-bold">
                        <Calendar size={12} />
                        {item.period}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin size={12} />
                        {item.location}
                      </span>
                    </div>

                    {/* Role & Company */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                      <Icon size={18} className="text-teal-400 shrink-0" />
                      <span>{item.role}</span>
                    </h3>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                      {item.company}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-teal-400 mt-1 font-bold">
                            ›
                          </span>
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certifications Sub-Section */}
      <div className="pt-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-teal-800 dark:text-teal-300 uppercase tracking-widest mb-1">
            <Award size={15} />
            <span>CERTIFIED KNOWLEDGE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Certificates &amp; Credentials
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 shadow-md shadow-slate-200/60 dark:shadow-none p-3.5 backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-teal-400/50 hover:bg-teal-50/40 dark:hover:bg-slate-800/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 mb-3 border border-slate-200 dark:border-white/5">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/5 dark:bg-slate-950/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-teal-700 dark:text-teal-400 font-bold block mb-1">
                  {cert.issuer}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                  {cert.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full rounded-3xl border border-white/20 bg-slate-900 p-6 text-white shadow-2xl"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-white transition cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="w-full max-h-[70vh] object-contain rounded-2xl mb-4"
            />
            <h3 className="text-base sm:text-lg font-bold text-center">
              {selectedCert.title}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
}
