import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, Loader2, ExternalLink } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import StarField from "./start-field";
import HomeService from "../../services/project.service";
import { getUser } from "../../services/user.service";
import avatarImg from "../../images/profile-avatar.png";
import slideImage1 from "../../images/ahmetyuksek-autumn-bend-10069119_1920.jpg";
import { getImageUrl } from "../../../utils/imageUrl";

import SkillsSection from "./home-sections/SkillsSection";
import ExperienceSection from "./home-sections/ExperienceSection";
import CertificatesSection from "./home-sections/CertificatesSection";
import ContactSection from "./home-sections/ContactSection";
import AddDialog from "../../share/dialog";

const baseSlides = [
  {
    id: 1,
    tag: "Web App",
    title: "FMS System",
    description:
      "Factory inventory system covering purchasing, sales and warehouse stock withdrawal.",
    techText: "Angular • TypeScript • REST API • SQL",
    screenshotPlaceholder: "[ADD SCREENSHOT of fms-and-glwb]",
    urlProject: "",
    githubFrontend: "https://github.com/NutNuttaphong",
  },
  {
    id: 2,
    tag: "Full-stack",
    title: "Portfolio and CMS",
    description:
      "Portfolio website with an admin dashboard for managing content and uploading images. Deployed on Vercel and Railway.",
    techText: "React • NodeJS • MongoDB • Tailwind CSS",
    screenshotPlaceholder: "[ADD SCREENSHOT of the portfolio]",
    urlProject: "https://port-folio-web-phi.vercel.app",
    githubFrontend: "https://github.com/NutNuttaphong/port-folio-web",
    githubBackend: "https://github.com/NutNuttaphong/port-folio-api",
  },
  {
    id: 3,
    tag: "Web App",
    title: "First Shop Online",
    description:
      "Online shop with live chat to an administrator and delivery status tracking.",
    techText: "React • NodeJS • Socket.IO • Tailwind CSS",
    screenshotPlaceholder: "[ADD SCREENSHOT of first shop]",
    urlProject: "https://shop-ft.vercel.app/login",
    githubFrontend: "https://github.com/NutNuttaphong",
  },
  {
    id: 4,
    tag: "FinTech",
    title: "Trade System",
    description:
      "Stock trading and investment management system with real-time price monitoring and charting.",
    techText: "React • Chart.js • Trading API • WebSocket",
    screenshotPlaceholder: "[ADD SCREENSHOT of trade system]",
    urlProject: "",
    githubFrontend: "https://github.com/NutNuttaphong",
  },
  {
    id: 5,
    tag: "AI & Media",
    title: "AutoTransSub",
    description:
      "Auto-generated video subtitles using a local AI speech recognition model with offline privacy.",
    techText: "Python • Whisper AI • FastAPI • Local LLM",
    screenshotPlaceholder: "[ADD SCREENSHOT of autotranssub]",
    urlProject: "",
    githubFrontend: "https://github.com/NutNuttaphong",
  },
];

export default function Home() {
  const outletCtx = useOutletContext();
  const isDark = outletCtx?.isDark ?? true;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [slides, setSlides] = useState(baseSlides);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [adminAvatar, setAdminAvatar] = useState(avatarImg);

  useEffect(() => {
    const fetchAdminAvatar = async () => {
      try {
        const users = await getUser();
        if (Array.isArray(users) && users.length > 0) {
          const adminUser =
            users.find(
              (u) =>
                u.imageUrl &&
                (u.role?.toLowerCase().includes("admin") ||
                  u.username?.toLowerCase().includes("admin")),
            ) ||
            users.find((u) => u.imageUrl) ||
            users[0];

          if (adminUser?.imageUrl) {
            setAdminAvatar(getImageUrl(adminUser.imageUrl));
          }
        }
      } catch (err) {
        console.warn("Could not load user admin avatar, using fallback:", err);
      }
    };

    fetchAdminAvatar();
  }, []);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await HomeService.getProjects();
        if (Array.isArray(response) && response.length > 0) {
          // Normalize server projects to match our card presentation
          const mapped = response.map((item, idx) => ({
            ...item,
            id: item._id || item.id || idx + 1,
            tag: item.tag || (item.category === "Full-stack" ? "Full-stack" : "Web App"),
            title: item.title || "Project",
            description: item.description || "",
            techText:
              item.subtitle ||
              (item.techPills
                ? item.techPills.map((p) => (typeof p === "string" ? p : p.name)).join(" • ")
                : "React • TypeScript"),
            screenshotPlaceholder: item.screenshotPlaceholder || `[ADD SCREENSHOT of ${item.title}]`,
          }));
          setSlides(mapped);
        } else {
          setSlides(baseSlides);
        }
      } catch (error) {
        console.error("Failed to fetch slides, using base data:", error);
        setSlides(baseSlides);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const handleCardClick = (item) => {
    if (item.urlProject) {
      window.open(item.urlProject, "_blank", "noopener,noreferrer");
    } else {
      setIsDialogOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="relative flex min-h-[calc(100vh-73px)] items-center justify-center bg-[#080d1a] text-white">
        <Loader2 className="animate-spin text-teal-400" size={48} />
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-[calc(100vh-73px)] w-full flex flex-col items-center overflow-x-hidden transition-colors duration-500 ${
        isDark
          ? "bg-[#080d1a] text-white"
          : "bg-gradient-to-b from-[#f8fafc] via-[#eef4ff] to-[#f1f5f9] text-slate-900"
      }`}
    >
      {/* Background StarField & Subtle Ambient Glows */}
      {isDark ? (
        <>
          <StarField count={260} />
          <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-[160px]" />
          <div className="pointer-events-none fixed top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-blue-600/5 blur-[170px]" />
        </>
      ) : (
        <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-300/20 blur-[140px]" />
      )}

      {/* ======================================================== */}
      {/* 1. HERO SECTION (MATCHING MOCKUP LAYOUT & CONTENT)       */}
      {/* ======================================================== */}
      <header
        id="overview"
        className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-10 sm:pt-14 pb-8 text-left"
      >
        {/* Top Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-950/40 px-3.5 py-1 text-xs font-medium text-teal-300 backdrop-blur-md mb-6">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
          </span>
          <span className="font-mono text-[11px] sm:text-xs">
            Open to Full-time &amp; Remote / Bangkok, Thailand
          </span>
        </div>

        {/* Profile Image & Name Heading */}
        <div className="flex items-center gap-5 sm:gap-6 mb-5">
          <div className="relative shrink-0 h-24 w-24 sm:h-44 sm:w-44 rounded-full border-2 border-teal-400 overflow-hidden shadow-lg shadow-teal-500/20">
            <img
              src={adminAvatar}
              alt="Nuttaphong Samipak"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = avatarImg;
              }}
              className="h-full w-full object-cover scale-[1.8] origin-[58%_49%]"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Nuttaphong Samipak
            </h1>
            <p className="text-teal-600 dark:text-teal-400 font-semibold text-base sm:text-lg tracking-wide mt-0.5">
              Front-End Developer
            </p>
          </div>
        </div>

        {/* Bio Paragraph */}
        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300/90 leading-relaxed max-w-2xl text-left">
          3+ years building responsive web applications with Angular and
          TypeScript for government and enterprise clients.
        </p>

        {/* 4-Column Meta / Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-5 pb-2 text-left border-t border-slate-200 dark:border-white/10 mt-6">
          <div>
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              Experience
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              3+ years
            </span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              Main Stack
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Angular • React • TypeScript
            </span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              Work style
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Remote / Hybrid
            </span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              Location
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Bangkok, Thailand
            </span>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. SKILLS SECTION                                        */}
      {/* ======================================================== */}
      <SkillsSection />

      {/* ======================================================== */}
      {/* 3. EXPERIENCE & EDUCATION SECTION                        */}
      {/* ======================================================== */}
      <ExperienceSection />

      {/* ======================================================== */}
      {/* 4. PROJECTS SECTION (MULTI-CARD HORIZONTAL CAROUSEL)     */}
      {/* ======================================================== */}
      <section
        id="projects"
        className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 text-left"
      >
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-1.5">
              Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              Front-end work first. Each card shows what the project is and the stack used. Swipe or use the arrow to browse.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button className="proj-prev flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0c1326] text-slate-700 dark:text-slate-300 hover:border-teal-400 hover:text-teal-400 transition cursor-pointer">
              <ChevronLeft size={18} />
            </button>
            <button className="proj-next flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0c1326] text-slate-700 dark:text-slate-300 hover:border-teal-400 hover:text-teal-400 transition cursor-pointer">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".proj-prev",
              nextEl: ".proj-next",
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
            onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
            className="w-full pb-8 projects-swiper"
          >
            {slides.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto !flex flex-col">
                <div
                  onClick={() => handleCardClick(item)}
                  className="group flex-1 w-full rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c1326]/90 p-5 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-teal-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/5 cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex-1 flex flex-col">
                    {/* Top Screenshot Area / Graphic */}
                    <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-900/90 border border-slate-200/80 dark:border-white/5 flex items-center justify-center p-4 text-center shrink-0">
                      {item.imageUrl ? (
                        <img
                          src={getImageUrl(item.imageUrl)}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-xs font-mono text-amber-500 dark:text-amber-400/90 font-medium">
                            {item.screenshotPlaceholder || `[ADD SCREENSHOT of ${item.title}]`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Dashed Separator Line */}
                    <div className="border-t border-dashed border-slate-200 dark:border-white/10 my-4 shrink-0" />

                    {/* Category Tag */}
                    <span className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400 block mb-1 shrink-0">
                      {item.tag || "Web App"}
                    </span>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-wide mb-2 line-clamp-1 shrink-0">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Tech Text */}
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 leading-normal mb-4 shrink-0 line-clamp-1">
                      {item.techText}
                    </p>
                  </div>

                  {/* Action Link at Bottom */}
                  <div className="pt-3 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between shrink-0 mt-auto">
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:underline">
                      <span>{item.urlProject ? "Live Demo ↗" : "1 Auto Builder's"}</span>
                    </span>
                    {item.githubFrontend && (
                      <a
                        href={item.githubFrontend}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Under-Carousel Cyan Progress Line & Dots */}
          <div className="mt-2 flex flex-col items-center gap-3">
            <div className="w-full h-0.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-400 transition-all duration-300"
                style={{
                  width: `${Math.min(100, ((activeSlideIndex + 1) / Math.max(1, slides.length)) * 100)}%`,
                }}
              />
            </div>

            {/* Pagination indicator: active elongated pill + dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    i === activeSlideIndex
                      ? "w-6 bg-teal-400"
                      : "w-1.5 bg-slate-400 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CERTIFICATES & CREDENTIALS SECTION                    */}
      {/* ======================================================== */}
      <CertificatesSection />

      {/* ======================================================== */}
      {/* 6. GET IN TOUCH SECTION                                  */}
      {/* ======================================================== */}
      <ContactSection />

      <AddDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}
