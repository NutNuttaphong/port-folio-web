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

const baseSlides = [
  {
    id: 1,
    tag: "PARTY",
    title: "EXCLUSIVE PARTIES",
    subtitle: "UNFORGETTABLE CELEBRATIONS",
    description: "Create memories that will be talked about for years",
    image: slideImage1,
  },
  {
    id: 2,
    tag: "LAUNCH",
    title: "PRODUCT LAUNCHES",
    subtitle: "INNOVATION SHOWCASE",
    description: "Launch your products with impact and style",
    image: slideImage1,
  },
  {
    id: 3,
    tag: "CORPORATE",
    title: "CORPORATE EVENTS",
    subtitle: "PROFESSIONAL EXCELLENCE",
    description:
      "Transform your corporate vision into unforgettable experiences",
    image: slideImage1,
  },
  {
    id: 4,
    tag: "WEDDING",
    title: "WEDDING CELEBRATION",
    subtitle: "ROMANTIC MOMENTS",
    description: "Create magical memories on your special day",
    image: slideImage1,
  },
  {
    id: 5,
    tag: "FESTIVAL",
    title: "MUSIC & LIGHTS",
    subtitle: "EXTRAVAGANZA",
    description: "High energy audio-visual experiences for all audiences",
    image: slideImage1,
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
              {/* <div className="absolute top-5 left-5 z-10">
                <span className="rounded-full bg-slate-900/60 px-3.5 py-1 text-xs font-semibold tracking-wider text-slate-200 backdrop-blur-md border border-white/10 uppercase">
                  {item.tag}
                </span>
              </div> */}

              {/* ไอคอน Smile ตรงกลาง */}
              {/* <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900/50 backdrop-blur-md border border-white/20 text-white transition-all duration-300 group-[.swiper-slide-active]:scale-110 hover:scale-125 hover:border-teal-400 hover:text-teal-300 cursor-pointer shadow-lg active:scale-95">
                  <Smile size={26} />
                </div>
              </div> */}

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

                {/* ปุ่ม Explore More */}
                <button
                  onClick={() => navigate(`/event/${item.id}`)}
                  className="mt-2 rounded-full bg-slate-800/80 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md border border-white/10 transition-colors hover:bg-teal-500 hover:border-teal-400"
                >
                  Explore More
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
