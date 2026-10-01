import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Loader2, ExternalLink } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import StarField from "./start-field";
import HomeService from "../../services/project.service";
import slideImage1 from "../../images/ahmetyuksek-autumn-bend-10069119_1920.jpg";
import githubIcon from "../../images/icon/github.svg";
import { getImageUrl } from "../../../utils/imageUrl";

const baseSlides = [
  {
    id: 1,
    tag: "FULL-STACK • CMS",
    status: "LIVE 🚀",
    title: "PORTFOLIO & HEADLESS CMS",
    subtitle: "REACT • NESTJS • MONGODB • TAILWIND",
    description:
      "Modern full-stack web application with role-based CMS Admin Dashboard, image uploads, security hardened APIs, and multi-cloud deployment.",
    image: slideImage1,
    urlProject: "https://port-folio-web-phi.vercel.app",
    githubUrl: "https://github.com/NutNuttaphong/port-folio-web",
  },
  {
    id: 2,
    tag: "FRONTEND ARCHITECTURE",
    status: "EXPERIENCE",
    title: "ENTERPRISE WEB PLATFORM",
    subtitle: "ANGULAR • TYPESCRIPT • REST API",
    description:
      "Scalable data-driven dashboard with reusable component libraries, responsive UI/UX, and high-performance RESTful API integration.",
    image: slideImage1,
    urlProject: "https://github.com/NutNuttaphong",
    githubUrl: "https://github.com/NutNuttaphong",
  },
  {
    id: 3,
    tag: "AI & WORKFLOW",
    status: "CERTIFIED",
    title: "AI-POWERED WORKFLOW SYSTEM",
    subtitle: "AI INTEGRATION • AUTOMATION • REACT",
    description:
      "Data-driven automation and intelligent workflows optimizing user experience, business processes, and modern engineering practices.",
    image: slideImage1,
    urlProject: "https://github.com/NutNuttaphong",
    githubUrl: "https://github.com/NutNuttaphong",
  },
  {
    id: 4,
    tag: "MODERN WEB DEV",
    status: "FEATURED",
    title: "RESPONSIVE WEB APPLICATIONS",
    subtitle: "VUE • REACT • TAILWIND CSS",
    description:
      "High-speed, cross-device interfaces focused on accessibility, micro-interactions, clean architecture, and modern web standards.",
    image: slideImage1,
    urlProject: "https://github.com/NutNuttaphong",
    githubUrl: "https://github.com/NutNuttaphong",
  },
  {
    id: 5,
    tag: "CLOUD & SECURITY",
    status: "PRODUCTION",
    title: "SECURE BACKEND ARCHITECTURE",
    subtitle: "NESTJS • MONGODB • VERCEL & RAILWAY",
    description:
      "Backend microservices featuring CORS restrictions, file-upload MIME validation, encrypted authentication, and automated CI/CD pipelines.",
    image: slideImage1,
    urlProject: "https://github.com/NutNuttaphong/port-folio-api",
    githubUrl: "https://github.com/NutNuttaphong/port-folio-api",
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
    const targetUrl = item.urlProject || "https://www.youtube.com/watch?v=vxmDu5HlXZo";

    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/event/${itemId}`);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-73px)] items-center justify-center bg-gradient-to-b from-[#0e1a42] via-[#09112d] to-[#040714] px-4 py-8 overflow-hidden text-white">
      {/* 1. วงแสง Glow สีน้ำเงิน/ม่วงด้านหลัง */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />

      {/* 2. ละอองดาวระยิบระยับ */}
      <StarField count={120} />

      {/* 3. ปุ่ม Navigation ซ้าย-ขวา */}
      <button className="swiper-prev absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-white/90 shadow-xl transition-all duration-300 hover:bg-teal-500 hover:scale-110 active:scale-95">
        <ChevronLeft size={24} />
      </button>
      <button className="swiper-next absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-white/90 shadow-xl transition-all duration-300 hover:bg-teal-500 hover:scale-110 active:scale-95">
        <ChevronRight size={24} />
      </button>

      {/* 4. กล่อง Swiper Carousel */}
      <div className="relative z-10 w-full mx-auto">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          slideToClickedSlide={true}
          // loopedSlides={2}
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
            stretch: -60, // 👈 ค่าติดลบยิ่งมาก การ์ดจะยิ่งถอยห่างออกจากกัน (ลองปรับระหว่าง -40 ถึง -100)
            depth: 180, // ความลึกมิติ 3D ของการ์ดด้านข้าง
            modifier: 1.2,
            scale: 1, // 👈 ล็อคไม่ให้การ์ดหด/ย่อขนาด
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Navigation, Autoplay]}
          className="w-full py-10 gap-6 sm:gap-8 md:gap-20 lg:gap-12"
        >
          {slides.map((item) => (
            <SwiperSlide
              onClick={() => handleCardClick(item)}
              key={item.uniqueId}
              style={{ width: "520px", height: "600px" }}
              className="group relative rounded-3xl my-10 overflow-hidden select-none transition-all duration-500 [&.swiper-slide-active]:ring-2 [&.swiper-slide-active]:ring-teal-400 [&.swiper-slide-active]:shadow-[0_0_40px_rgba(45,212,191,0.25)]"
            >
              {/* ภาพพื้นหลังการ์ด */}
              <img
                src={getImageUrl(item.imageUrl || item.image)}
                alt={item.title}
                draggable="false"
                className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
              />

              {/* เลเยอร์ Gradient สีดำทับรูปเพื่อให้อ่านตัวหนังสือชัด */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050917]/95 via-[#050917]/45 to-transparent" />

              {/* Tag ด้านบนซ้าย */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <span className="rounded-full bg-slate-900/80 px-3.5 py-1 text-xs font-semibold tracking-wider text-teal-300 backdrop-blur-md border border-teal-500/30 uppercase">
                  {item.tag || "DEVELOPER"}
                </span>
                {item.status && (
                  <span className="rounded-full bg-emerald-950/80 px-3 py-1 text-[11px] font-semibold tracking-wider text-emerald-300 backdrop-blur-md border border-emerald-500/30 uppercase">
                    {item.status}
                  </span>
                )}
              </div>

              {/* เนื้อหาด้านล่าง */}
              <div className="absolute bottom-6 inset-x-0 px-6 text-left z-10 flex flex-col items-start gap-1.5">
                <h3 className="text-2xl font-serif font-bold uppercase tracking-wider text-white">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="text-xs font-semibold tracking-wider text-teal-400 uppercase">
                    {item.subtitle}
                  </p>
                )}

                {item.description && (
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                )}

                {/* ปุ่มกด Developer Action Buttons */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const targetUrl = item.urlProject || item.liveUrl;
                      if (targetUrl) {
                        window.open(targetUrl, "_blank", "noopener,noreferrer");
                      } else {
                        navigate(`/event/${item._id || item.id}`);
                      }
                    }}
                    className="flex items-center gap-1.5 rounded-full bg-teal-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-md shadow-teal-500/25 transition-all hover:bg-teal-400 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </button>

                  {(item.githubUrl || item.githubFrontend) && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          item.githubUrl || item.githubFrontend,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3.5 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-md border border-white/15 transition-all hover:bg-slate-800 hover:border-teal-400/50 hover:text-white cursor-pointer"
                    >
                      <img src={githubIcon} alt="GitHub" className="w-3.5 h-3.5 invert opacity-90" />
                      Code
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/event/${item._id || item.id}`);
                    }}
                    className="rounded-full bg-slate-800/70 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md border border-white/10 transition-colors hover:bg-slate-700/80 hover:text-white cursor-pointer"
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
  );
}
