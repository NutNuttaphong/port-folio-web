import slideImage1 from "../../images/ahmetyuksek-autumn-bend-10069119_1920.jpg";
import search from "../../images/icon/search.svg";
import { useState, useEffect } from "react";

import PortService from "../../services/port.service";
import { Loader2 } from "lucide-react";

const baseSlides = [
  {
    id: 1,
    tag: "corporate",
    title: "PRODUCT LAUNCHES",
    image: slideImage1,
    year: 2023,
  },
  {
    id: 2,
    tag: "weddings",
    title: "PRODUCT LAUNCHES",
    image: slideImage1,
    year: 2023,
  },
  {
    id: 3,
    tag: "corporate",
    title: "PRODUCT LAUNCHES",
    image: slideImage1,
    year: 2023,
  },
  {
    id: 4,
    tag: "corporate",
    title: "PRODUCT LAUNCHES",
    image: slideImage1,
    year: 2025,
  },
  {
    id: 5,
    tag: "weddings",
    title: "PRODUCT LAUNCHES",
    image: slideImage1,
    year: 2025,
  },
  {
    id: 6,
    tag: "social",
    title: "PRODUCT LAUNCHES",
    image: slideImage1,
    year: 2024,
  },
];

const categories = [
  { id: "all", label: "All Types" },
  { id: "corporate", label: "Corporate" },
  { id: "weddings", label: "Weddings" },
  { id: "social", label: "Social Events" },
];
export default function EventCarousel() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("corporate");

  useEffect(() => {
    async function fetchPorts() {
      try {
        const response = await PortService.getPorts();

        if(response.length > 0) {
          setDataList(response);
        } else {
          setDataList(baseSlides);
        }
      } catch (error) {
        console.error("Error fetching ports:", error);
        setDataList(baseSlides);
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

  const filteredItems =
    activeTab === "all"
      ? dataList
      : dataList.filter((item) => item.tag === activeTab);
  return (
    <div className="root">
      <div className="mb-8 flex flex-col items-cemter gap-2">
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
            key={item.id}
            className="group relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-lg bg-slate-900"
          >

            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

            <div className="absolute top-5 right-5 z-20 opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Open preview for: ${item.title}`);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-[#00bda6] hover:border-[#00bda6] hover:scale-110 shadow-lg cursor-pointer"
              >
                <img src={search} alt="Search" className="h-5 w-5 invert" />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
              <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-wide leading-snug drop-shadow-md">
                {item.title}
              </h3>
              <p className="text-sm font-sans text-slate-300 mt-1">
                {item.tag} • {item.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default PortfolioPage;
