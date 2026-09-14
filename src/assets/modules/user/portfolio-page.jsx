import slideImage1 from "../../images/ahmetyuksek-autumn-bend-10069119_1920.jpg";
import search from "../../images/icon/search.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PortService from "../../services/port.service";
import { Loader2 } from "lucide-react";

const baseSlides = [
  {
    id: 1,
    tag: "webmargeting",
    title: "PRODUCT LAUNCHES",
    imageUrl: slideImage1,
    year: 2023,
  },
  {
    id: 2,
    tag: "wedai",
    title: "PRODUCT LAUNCHES",
    imageUrl: slideImage1,
    year: 2023,
  },
  {
    id: 3,
    tag: "webmargeting",
    title: "PRODUCT LAUNCHES",
    imageUrl: slideImage1,
    year: 2023,
  },
  {
    id: 4,
    tag: "webmargeting",
    title: "PRODUCT LAUNCHES",
    imageUrl: slideImage1,
    year: 2025,
  },
  {
    id: 5,
    tag: "wedai",
    title: "PRODUCT LAUNCHES",
    imageUrl: slideImage1,
    year: 2025,
  },
  {
    id: 6,
    tag: "social",
    title: "PRODUCT LAUNCHES",
    imageUrl: slideImage1,
    year: 2024,
  },
];

const categories = [
  { id: "all", label: "All Types" },
  { id: "webmargeting", label: "WebMargeting" },
  { id: "wedai", label: "WedAI" },
  { id: "social", label: "Social Events" },
];

export default function EventCarousel() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function fetchPorts() {
      try {
        const response = await PortService.getPorts();

        if (Array.isArray(response) && response.length > 0) {
          // 💡 แปลง tag จาก MongoDB ให้เป็นตัวพิมพ์เล็กทั้งหมด เพื่อให้เปรียบเทียบกับปุ่มได้ง่าย
          const formattedData = response.map((item, index) => ({
            ...item,
            tag: item.tag ? item.tag.toLowerCase() : "",
            uniqueKey: item._id ? `${item._id}-${index}` : `fallback-${index}`
          }));
          setDataList(formattedData);
        } else {
          const formattedBase = baseSlides.map((item, index) => ({
            ...item,
            uniqueKey: `base-${item.id}-${index}`
          }));
          setDataList(formattedBase);
        }
      } catch (error) {
        console.error("Error fetching ports:", error);
        const formattedBase = baseSlides.map((item, index) => ({
          ...item,
          uniqueKey: `base-${item.id}-${index}`
        }));
          setDataList(formattedBase);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPorts();
  }, []);

  if (isLoading) {
    return (
      <div className="relative flex min-h-[calc(100vh-73px)] items-center justify-center bg-gradient-to-b from-[#0e1a42] via-[#09112d] to-[#040714] text-white">
        <Loader2 className="animate-spin text-teal-400" size={48} />
      </div>
    );
  }

  // 💡 แก้ไขเงื่อนไข Filter ให้เทียบกับ activeTab โดยแปลงเป็นตัวพิมพ์เล็กทั้งคู่
  const filteredItems =
    activeTab === "all"
      ? dataList
      : dataList.filter((item) => item.tag === activeTab.toLowerCase());

  const handleCardClick = (item) => {
    const itemId = item._id || item.id;
    const targetUrl = item.url || `https://www.youtube.com/watch?v=vxmDu5HlXZo`;

    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/event/${itemId}`);
    }
  };

  return (
    <div className="root">
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
          Our Portfolio
        </div>
        <p>Discover the extraordinary events we've brought to life</p>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-6 pb-10 flex-wrap">
        {categories.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[#00bda6] text-white font-semibold shadow-md shadow-teal-500/20"
                  : "text-slate-600 hover:text-slate-900 bg-transparent"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            onClick={() => handleCardClick(item)}
            key={item.uniqueKey} // 💡 ป้องกัน Warning เรื่อง Key ซ้ำ
            className="group relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-lg bg-slate-900"
          >
            <img
              src={item.imageUrl || item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

            <div className="absolute top-5 right-5 z-20 opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-[#00bda6] hover:border-[#00bda6] hover:scale-110 shadow-lg cursor-pointer">
                <img src={search} alt="Search" className="h-5 w-5 invert" />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
              <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-wide leading-snug drop-shadow-md">
                {item.title}
              </h3>
              <p className="text-sm font-sans text-slate-300 mt-1 uppercase">
                {item.tag} {item.year ? `• ${item.year}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}