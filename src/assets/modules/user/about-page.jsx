import { useOutletContext } from "react-router-dom";
import StarField from "./start-field";
import AboutFeaturedCaseStudies from "./home-sections/AboutFeaturedCaseStudies";
import SkillsSection from "./home-sections/SkillsSection";
import CommunitySection from "./home-sections/CommunitySection";
import ExperienceSection from "./home-sections/ExperienceSection";
import ContactSection from "./home-sections/ContactSection";
import { Sparkles, MapPin, Briefcase, GraduationCap, Code2, ArrowDown } from "lucide-react";

export default function AboutPage() {
  const outletCtx = useOutletContext();
  const isDark = outletCtx?.isDark ?? true;
  return (
    <div className={`relative min-h-[calc(100vh-73px)] w-full flex flex-col items-center overflow-x-hidden transition-colors duration-500 ${
      isDark
        ? "bg-gradient-to-b from-[#0e1a42] via-[#09112d] to-[#040714] text-white"
        : "bg-gradient-to-b from-[#f8fafc] via-[#eef4ff] to-[#f1f5f9] text-slate-900"
    }`}>
      {/* Background StarField & Ambient Glows */}
      {isDark ? (
        <>
          <StarField count={220} />
          <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[140px]" />
          <div className="pointer-events-none fixed top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[150px]" />
          <div className="pointer-events-none fixed bottom-10 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[160px]" />
        </>
      ) : (
        <>
          <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-300/20 blur-[140px]" />
          <div className="pointer-events-none fixed top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-sky-300/25 blur-[150px]" />
          <div className="pointer-events-none fixed bottom-10 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-200/25 blur-[160px]" />
        </>
      )}

      {/* ======================================================== */}
      {/* 1. HERO SECTION (IN-DEPTH BIOGRAPHICAL INTRO)            */}
      {/* ======================================================== */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-12 sm:pt-16 pb-8">
        {/* Top Header Badge */}
        <div className="text-start mb-8">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-teal-300 dark:border-teal-500/30 bg-teal-50 dark:bg-slate-900/90 px-4 py-1.5 text-xs font-semibold text-teal-900 dark:text-teal-300 backdrop-blur-md shadow-sm mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
            </span>
            <span className="tracking-wider uppercase font-semibold">
              ABOUT ME • PROFESSIONAL PROFILE
            </span>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span className="text-teal-800 dark:text-slate-300 font-mono text-[11px]">Nuttaphong S.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] max-w-6xl mx-auto text-slate-900 dark:text-white">
            Crafting{" "}
            <span className="bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-700 dark:from-teal-300 dark:via-sky-300 dark:to-indigo-300 bg-clip-text text-transparent">
              Scalable Software
            </span>{" "}
            with Precision &amp; Purpose
          </h1>
        </div>

        {/* 2-Column Biographical Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Authentic Story Narrative */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 shadow-md shadow-slate-200/60 dark:shadow-none p-6 sm:p-10 backdrop-blur-xl flex flex-col justify-between text-left">
            <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-left">
              <div className="flex items-center gap-2 text-teal-800 dark:text-teal-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={16} />
                <span>My Journey &amp; Engineering Philosophy</span>
              </div>
              <p className="text-left">
                Hi, I'm <strong className="text-slate-900 dark:text-white font-semibold">Nuttaphong</strong> — Frontend Software Engineer dedicated to architecting resilient, high-performance web systems that scale seamlessly.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-left">
                My software journey began with a Bachelor's degree in Computer Engineering at <strong>Mae Fah Luang University</strong>, where I developed a rigorous grounding in distributed algorithms, database systems, and low-level computer architecture.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-left">
                Over the past 3+ years at <strong>Be1 Digital Co., Ltd.</strong>, I have engineered enterprise-grade web applications for both public sector institutions and private enterprises. I specialize in building robust clients with <strong>Angular</strong>, backed by hardened microservices and <strong>MongoDB</strong> NoSQL schemas.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-left">
                I strongly advocate for <strong>Loop Engineering</strong> — shifting from manual, one-off AI prompting to closed-loop autonomous coding agent systems governed by strict automated quality gates, linting, and testing harnesses.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-3">
              <a
                href="#featured-projects"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-teal-300 active:scale-95 cursor-pointer shadow-md shadow-teal-500/20"
              >
                <span>View Case Studies</span>
                <ArrowDown size={14} />
              </a>
              <a
                href="https://github.com/NutNuttaphong"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 transition hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:bg-teal-100/70 dark:hover:bg-slate-700/80 shadow-sm active:scale-95 cursor-pointer"
              >
                <span>GitHub Repositories ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Quick Profile & Core Metrics */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 dark:border-teal-500/30 bg-white dark:bg-slate-900/80 shadow-md shadow-slate-200/60 dark:shadow-none p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-teal-400 to-blue-500 p-0.5 shadow-md">
                  <div className="h-full w-full rounded-2xl bg-white dark:bg-slate-950 flex items-center justify-center font-bold text-teal-800 dark:text-teal-300 text-lg shadow-inner dark:shadow-none">
                    N
                  </div>
                </div>
                <div>
                  <h3 className="text-start text-base font-bold text-slate-900 dark:text-white">Nuttaphong S.</h3>
                  <p className="text-xs text-teal-700 dark:text-teal-300 font-mono font-medium">Full-Stack &amp; Loop Engineer</p>
                </div>
              </div>

              {/* Attributes List */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 text-start dark:text-slate-400 block text-[11px]">Location</span>
                    <span className="text-slate-800 dark:text-white font-medium">Bangkok, Thailand 🇹🇭 (Remote / Hybrid)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Briefcase size={16} className="text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 text-start dark:text-slate-400 block text-[11px]">Industry Experience</span>
                    <span className="text-slate-800 dark:text-white font-medium">3+ Years Enterprise Development (Be1 Digital)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <GraduationCap size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 text-start dark:text-slate-400 block text-[11px]">Education</span>
                    <span className="text-slate-800 dark:text-white font-medium">B.Eng. Computer Engineering (MFU)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Code2 size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 text-start dark:text-slate-400 block text-[11px]">Core Tech Stack</span>
                    <span className="text-slate-800 dark:text-white font-medium">React 18, NestJS, MongoDB, TypeScript</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Chips */}
            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 gap-2 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                <span className="text-teal-700 dark:text-teal-400 font-bold text-base block">3+</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Years Experience</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-teal-200 dark:border-teal-500/30 shadow-sm dark:shadow-none">
                <span className="text-teal-800 dark:text-teal-300 font-bold text-base block">100%</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Full-Stack Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. FEATURED PROJECTS (ARCHITECTURAL CASE STUDIES)        */}
      {/* ======================================================== */}
      <AboutFeaturedCaseStudies />

      {/* ======================================================== */}
      {/* 3. SKILLS & TECHNOLOGIES SECTION                         */}
      {/* ======================================================== */}
      <SkillsSection />

      {/* ======================================================== */}
      {/* 4. OPEN SOURCE / COMMUNITY / WRITING SECTION             */}
      {/* ======================================================== */}
      <CommunitySection />

      {/* ======================================================== */}
      {/* 5. EXPERIENCE & EDUCATION SECTION                        */}
      {/* ======================================================== */}
      <ExperienceSection />

      {/* ======================================================== */}
      {/* 6. CONTACT SECTION (FOLLOWED BY FOOTER IN ROOT LAYOUT)   */}
      {/* ======================================================== */}
      <ContactSection />
    </div>
  );
}
