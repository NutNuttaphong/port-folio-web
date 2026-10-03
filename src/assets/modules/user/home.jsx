import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import StarField from "./start-field";
import HomeService from "../../services/project.service";
import slideImage1 from "../../images/ahmetyuksek-autumn-bend-10069119_1920.jpg";
import { getImageUrl } from "../../../utils/imageUrl";
import AboutPage from "./about-page";
import ContactPage from "./contacts-page";

const baseSlides = [
  {
    id: 1,
    tag: "FULL-STACK • CMS",
    status: "LIVE 🚀",
    title: "PORTFOLIO & HEADLESS CMS",
    subtitle: "REACT • NESTJS • MONGODB • TAILWIND",
    description:
      "Full-stack web application with role-based CMS Admin Dashboard, image uploads, security hardened APIs, deployed on Vercel and Railway.",
    codeSnippet: true,
    codeFileName: "app.service.ts",
    codeMeta: "NestJS + Mongo",
    controller: "project",
    className: "ProjectController",
    techPills: [
      { name: "React 18" },
      { name: "NestJS API" },
      { name: "MongoDB" },
      { name: "Security CORS", highlight: true },
    ],
    urlProject: "https://port-folio-web-phi.vercel.app",
    githubFrontend: "https://github.com/NutNuttaphong/port-folio-web",
    githubBackend: "https://github.com/NutNuttaphong/port-folio-api",
  },
  {
    id: 2,
    tag: "E-COMMERCE",
    status: "IN PROGRESS",
    title: "FIRST SHOP ONLINE",
    subtitle: "ONLINE SHOPPING & CHAT SYSTEM",
    description:
      "Online shopping with a chat system to talk to an administrator and a system to track the delivery status.",
    image: slideImage1,
    techPills: [
      { name: "React" },
      { name: "Node.js" },
      { name: "Socket.IO" },
      { name: "Tailwind" },
    ],
    urlProject: "https://shop-ft.vercel.app/login",
    githubFrontend: "https://github.com/NutNuttaphong",
  },
  {
    id: 3,
    tag: "AI & MEDIA",
    status: "IN PROGRESS",
    title: "AUTOTRANSSUB",
    subtitle: "LOCAL AI SUBTITLE GENERATOR",
    description: "Auto-generated subtitles using a local AI system.",
    codeSnippet: true,
    codeFileName: "subtitle_generator.py",
    codeMeta: "Python + Whisper AI",
    controller: "ai-transcribe",
    className: "SubtitleService",
    techPills: [
      { name: "Python" },
      { name: "Whisper AI" },
      { name: "FastAPI" },
      { name: "Local LLM", highlight: true },
    ],
    urlProject: "",
    githubFrontend: "https://github.com/NutNuttaphong",
  },
  {
    id: 4,
    tag: "ENTERPRISE ERP",
    status: "IN PROGRESS",
    title: "FMS SYSTEM",
    subtitle: "FACTORY INVENTORY & PURCHASING",
    description:
      "FMS is a system for managing factory inventory, handling purchasing and sales, and managing stock withdrawals from the warehouse.",
    image: slideImage1,
    techPills: [
      { name: "Angular" },
      { name: "TypeScript" },
      { name: "REST API" },
      { name: "SQL" },
    ],
    urlProject: "",
    githubFrontend: "https://github.com/NutNuttaphong",
  },
  {
    id: 5,
    tag: "FINTECH",
    status: "IN PROGRESS",
    title: "TRADE SYSTEM",
    subtitle: "STOCK TRADING & MANAGEMENT",
    description:
      '"Trade" is a system for managing the buying and selling of various stocks.',
    image: slideImage1,
    techPills: [
      { name: "Trading API" },
      { name: "React" },
      { name: "Chart.js" },
      { name: "Real-time" },
    ],
    urlProject: "",
    githubFrontend: "https://github.com/NutNuttaphong",
  },
  {
    id: 6,
    tag: "DEVELOPER REPO",
    status: "ACTIVE",
    title: "GITHUB PROFILE",
    subtitle: "OPEN-SOURCE & REPOSITORIES",
    description:
      "Explore all repositories, open-source projects, and code contributions by Nuttaphong.",
    codeSnippet: true,
    codeFileName: "nuttaphong.config.ts",
    codeMeta: "Git + CI/CD",
    controller: "developer",
    className: "NuttaphongProfile",
    techPills: [
      { name: "GitHub" },
      { name: "CI/CD Actions" },
      { name: "Vercel" },
      { name: "Railway" },
    ],
    urlProject: "https://github.com/NutNuttaphong",
    githubFrontend: "https://github.com/NutNuttaphong",
  },
];

export default function EventCarousel() {
  const navigate = useNavigate();

  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await HomeService.getProjects();

        if (Array.isArray(response) && response.length > 0) {
          // 💡 ถ้าข้อมูลมีน้อยกว่า 5 ชิ้น ให้คูณเพิ่มเข้าไป เพื่อให้ Swiper ทำงาน Loop 3D Coverflow ได้เนียนๆ
          const slidesToDisplay =
            response.length <= 5
              ? [...response, ...response, ...response, ...response]
              : [...response, ...response]; // เพิ่มข้อมูลซ้ำเพื่อให้ Swiper ทำงานได้ดีขึ้น

          setSlides(slidesToDisplay);
        } else {
          setSlides(baseSlides);
        }
      } catch (error) {
        console.error("Failed to fetch slides, using fallback data:", error);
        setSlides(baseSlides);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (isLoading) {
    return (
      <div className="relative flex min-h-[calc(100vh-73px)] items-center justify-center bg-gradient-to-b from-[#0e1a42] via-[#09112d] to-[#040714] text-white">
        <Loader2 className="animate-spin text-teal-400" size={48} />
      </div>
    );
  }

  const handleCardClick = (item) => {
    const itemId = item._id || item.id;
    // กำหนดลิงก์ YouTube ที่ต้องการเปิดในแท็บใหม่ตามที่ระบุ
    const targetUrl =
      item.urlProject || "https://www.youtube.com/watch?v=vxmDu5HlXZo";

    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/event/${itemId}`);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-73px)] w-full flex flex-col items-center bg-gradient-to-b from-[#0e1a42] via-[#09112d] to-[#040714] text-white overflow-x-hidden">
      {/* Background StarField & Ambient Glows */}
      <StarField count={120} />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[140px]" />
      <div className="pointer-events-none fixed top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-10 right-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[160px]" />

      {/* ======================================================== */}
      {/* 1. HERO FIRST IMPRESSION (HIGH-IMPACT SHOWCASE)          */}
      {/* ======================================================== */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-12 sm:pt-16 pb-6 text-center flex flex-col items-center">
        {/* Top Status Badge with glowing ping */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-teal-500/30 bg-slate-900/90 px-4 py-1.5 text-xs font-medium text-teal-300 backdrop-blur-md shadow-lg shadow-teal-500/10 mb-6">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
          </span>
          <span className="tracking-wider uppercase font-semibold">FULL-STACK DEVELOPER &amp; ARCHITECT</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-mono text-[11px]">Bangkok, TH 🇹🇭</span>
        </div>

        {/* Main High-Impact Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-4xl">
          Building <span className="bg-gradient-to-r from-teal-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">Scalable Systems</span> &amp; Modern Web Experiences
        </h1>

        {/* Subtitle & Self-Introduction */}
        <p className="mt-5 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          สวัสดีครับ ผม <strong className="text-white font-semibold">นัฐพงษ์ (Nuttaphong)</strong> — เว็บนี้พัฒนาเว็บแอปพลิเคชันด้วย{" "}
          <span className="text-teal-300 font-mono text-xs px-2 py-0.5 rounded-md bg-slate-800/90 border border-teal-500/30">React 18</span>,{" "}
          <span className="text-blue-300 font-mono text-xs px-2 py-0.5 rounded-md bg-slate-800/90 border border-blue-500/30">NestJS</span> และ{" "}
          <span className="text-emerald-300 font-mono text-xs px-2 py-0.5 rounded-md bg-slate-800/90 border border-emerald-500/30">MongoDB</span>{" "}
          เน้นสถาปัตยกรรมที่แข็งแกร่ง ประสิทธิภาพสูง และ UI ที่น่าประทับใจ
        </p>

        {/* Quick Metrics & Skills Chips */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-1.5 backdrop-blur-md">
            <span className="text-teal-400 font-bold">3+</span>
            <span className="text-slate-400">Years Exp</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-1.5 backdrop-blur-md">
            <span className="text-emerald-400 font-bold">100%</span>
            <span className="text-slate-400">Full-Stack Coverage</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-1.5 backdrop-blur-md">
            <span className="text-blue-400 font-bold">REST &amp; AI</span>
            <span className="text-slate-400">Architecture</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-1.5 backdrop-blur-md">
            <span className="text-amber-400 font-bold">Clean Code</span>
            <span className="text-slate-400">TypeScript Standard</span>
          </div>
        </div>

        {/* Dual Action CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("featured-showcase");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 transition hover:bg-teal-300 hover:shadow-lg hover:shadow-teal-400/25 active:scale-95 cursor-pointer"
          >
            <span>สำรวจผลงานคัดสรร (Featured Works)</span>
            <span>↓</span>
          </button>
          <a
            href="https://github.com/NutNuttaphong"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/80 px-5 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition hover:bg-slate-800 hover:border-teal-400/50 active:scale-95 cursor-pointer"
          >
            <span>GitHub Repositories ↗</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 flex flex-col items-center gap-1.5 text-slate-400 text-[11px] font-mono opacity-80">
          <span>SCROLL TO EXPLORE 3D SHOWCASE</span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-500/50 flex justify-center p-1">
            <div className="w-1 h-2 bg-teal-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. 3D CAROUSEL SECTION                                  */}
      {/* ======================================================== */}
      <section id="featured-showcase" className="relative z-10 w-full py-8 flex flex-col items-center">
        <div className="text-center mb-4">
          <p className="text-2xl sm:text-3xl font-bold text-white mt-1">Featured Production Systems</p>
        </div>

        <div className="relative w-full">
          {/* ปุ่ม Navigation ซ้าย-ขวา */}
          <button className="swiper-prev absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-white/90 shadow-xl transition-all duration-300 hover:bg-teal-500 hover:scale-110 active:scale-95">
            <ChevronLeft size={24} />
          </button>
          <button className="swiper-next absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-white/90 shadow-xl transition-all duration-300 hover:bg-teal-500 hover:scale-110 active:scale-95">
            <ChevronRight size={24} />
          </button>

          {/* Swiper Carousel */}
          <div className="relative z-10 w-full mx-auto">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              slideToClickedSlide={true}
              loop={true}
              speed={600}
              observer={true}
              observeParents={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: ".swiper-prev",
                nextEl: ".swiper-next",
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: -60,
                depth: 180,
                modifier: 1.2,
                scale: 1,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Navigation, Autoplay]}
              className="w-full py-10 gap-6 sm:gap-8 md:gap-20 lg:gap-12"
            >
              {slides.map((item) => (
                <SwiperSlide
                  onClick={() => handleCardClick(item)}
                  key={item.uniqueId}
                  style={{ width: "min(92vw, 520px)", height: "600px" }}
                  className="group relative rounded-3xl my-10 overflow-hidden select-none transition-all duration-500 [&.swiper-slide-active]:ring-2 [&.swiper-slide-active]:ring-teal-400 [&.swiper-slide-active]:shadow-[0_0_40px_rgba(45,212,191,0.25)]"
                >
                {/* ภาพพื้นหลังการ์ด หรือ Code Editor Graphic */}
                {item.codeSnippet ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a1428] to-[#040817] flex items-center justify-center p-6 select-none pointer-events-none">
                    <div className="w-full h-full rounded-2xl border border-teal-500/20 bg-slate-950/70 p-4 font-mono text-[11px] text-teal-300/80 overflow-hidden flex flex-col justify-between opacity-80 group-hover:opacity-100 transition">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
                          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>{" "}
                          {item.codeFileName || "app.service.ts"}
                        </span>
                        <span className="text-teal-400">
                          {item.codeMeta || "NestJS + Mongo"}
                        </span>
                      </div>
                      <div className="space-y-1 text-slate-300 text-xs">
                        <p>
                          <span className="text-teal-400">@Controller</span>('
                          {item.controller || "project"}')
                        </p>
                        <p>
                          <span className="text-blue-400">export class</span>{" "}
                          {item.className || "ProjectController"} &#123;
                        </p>
                        <p className="pl-4 text-slate-400">
                          // Modular Full-Stack Architecture
                        </p>
                        <p className="pl-4">
                          <span className="text-teal-400">
                            @UseInterceptors
                          </span>
                          (FileInterceptor(...))
                        </p>
                        <p className="pl-4 text-emerald-400">
                          async create(@Body() dto, @UploadedFile() file)
                        </p>
                        <p>&#125;</p>
                      </div>
                      <div className="text-[10px] text-slate-500 border-t border-white/5 pt-2 flex justify-between">
                        <span>Deployed on Vercel &amp; Railway</span>
                        <span className="text-teal-400 font-bold">200 OK</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={
                      item.imageUrl
                        ? getImageUrl(item.imageUrl)
                        : item.image || slideImage1
                    }
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = item.image || slideImage1;
                    }}
                    draggable="false"
                    className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                {/* เลเยอร์ Gradient สีดำทับรูปเพื่อให้อ่านตัวหนังสือชัด */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050917]/95 via-[#050917]/60 to-transparent pointer-events-none" />

                {/* Tag ด้านบนซ้าย (Top Badge) */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <span className="rounded-full bg-slate-900/80 px-3.5 py-1 text-xs font-semibold tracking-wider text-teal-300 backdrop-blur-md border border-teal-400/30 uppercase">
                    {item.tag || "FULL-STACK • CMS"}
                  </span>
                  {item.status && (
                    <span className="rounded-full bg-emerald-950/80 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-300 backdrop-blur-md border border-emerald-400/30 uppercase">
                      {item.status}
                    </span>
                  )}
                </div>

                {/* เนื้อหาด้านล่าง */}
                <div className="absolute bottom-6 inset-x-0 px-6 text-left z-10 flex flex-col items-start gap-1.5">
                  <h3 className="text-2xl  font-bold uppercase tracking-wider text-white">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="text-xs font-semibold tracking-wider text-teal-400 uppercase">
                      {item.subtitle}
                    </p>
                  )}

                  {item.description && (
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mt-0.5">
                      {item.description}
                    </p>
                  )}

                  {/* Interactive Tech Pills */}
                  {((item.tags && item.tags.length > 0) ||
                    (item.techPills && item.techPills.length > 0)) && (
                    <div className="flex flex-wrap gap-1.5 my-2">
                      {(item.tags && item.tags.length > 0
                        ? item.tags
                        : item.techPills
                      ).map((pill, idx) => {
                        const name =
                          typeof pill === "string" ? pill : pill.name || pill;
                        const isHighlight =
                          typeof pill === "object" ? pill.highlight : false;
                        return (
                          <span
                            key={idx}
                            className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono ${
                              isHighlight
                                ? "bg-slate-800/90 border-teal-500/40 text-teal-300"
                                : "bg-slate-800/90 border-white/10 text-slate-300"
                            }`}
                          >
                            {name}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Developer Action Buttons */}
                  <div className="flex items-center gap-2 pt-1 w-full flex-wrap">
                    {(item.urlProject || item.liveUrl) && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            item.urlProject || item.liveUrl,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        className="rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold px-4 py-1.5 text-xs transition shadow-md shadow-teal-500/20 flex items-center gap-1 cursor-pointer"
                      >
                        Live Demo ↗
                      </button>
                    )}

                    {(item.urlGithubProject ||
                      item.githubFrontend ||
                      item.githubUrl) && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            item.urlGithubProject ||
                              item.githubFrontend ||
                              item.githubUrl,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        className="rounded-full bg-slate-800/90 hover:bg-slate-700 text-white font-medium px-3.5 py-1.5 text-xs backdrop-blur-md border border-white/15 transition flex items-center gap-1 cursor-pointer"
                      >
                        {item.githubBackend ? "Frontend Code" : "GitHub Code"}
                      </button>
                    )}

                    {item.githubBackend && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            item.githubBackend,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        className="rounded-full bg-slate-800/90 hover:bg-slate-700 text-white font-medium px-3.5 py-1.5 text-xs backdrop-blur-md border border-white/15 transition flex items-center gap-1 cursor-pointer"
                      >
                        Backend Code
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/event/${item._id || item.id}`);
                      }}
                      className="rounded-full bg-slate-800/70 hover:bg-slate-700 text-slate-300 font-medium px-3 py-1.5 text-xs backdrop-blur-md border border-white/10 transition flex items-center gap-1 cursor-pointer"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>

    {/* ======================================================== */}
    {/* 3. ABOUT & CONTACT SECTIONS                              */}
    {/* ======================================================== */}
    <section className="relative z-10 w-full">
      <AboutPage />
      <ContactPage />
    </section>
  </div>
);
}
