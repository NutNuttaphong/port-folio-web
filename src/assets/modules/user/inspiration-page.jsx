import slideImage1 from "../../images/ahmetyuksek-autumn-bend-10069119_1920.jpg";

import inspirationService from "../../services/inspiration.service";
import { useState, useEffect } from "react";

import { Loader2 } from "lucide-react";

const baseSlides = [
  {
    id: 1,
    tag: "LAUNCH",
    title: "PRODUCT LAUNCHES",
    image: slideImage1, // 2. นำตัวแปรมาใส่ที่นี่
  },
  {
    id: 2,
    tag: "LAUNCH",
    title: "PRODUCT LAUNCHES",
    image: slideImage1, // 2. นำตัวแปรมาใส่ที่นี่
  },
  {
    id: 3,
    tag: "LAUNCH",
    title: "PRODUCT LAUNCHES",
    image: slideImage1, // 2. นำตัวแปรมาใส่ที่นี่
  },
  {
    id: 4,
    tag: "LAUNCH",
    title: "PRODUCT LAUNCHES",
    image: slideImage1, // 2. นำตัวแปรมาใส่ที่นี่
  },
  {
    id: 5,
    tag: "LAUNCH",
    title: "PRODUCT LAUNCHES",
    image: slideImage1, // 2. นำตัวแปรมาใส่ที่นี่
  },
];

export default function EventCarousel() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInspiration() {
      try {
        const response = await inspirationService.getInspiration();
        if (response && response.length > 0) {
          setDataList(response);
        } else {
          setDataList(baseSlides);
        } 
      } catch (error) {
        console.error("Error fetching inspiration:", error);
        setDataList(baseSlides);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInspiration();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="root">
      <div className="mb-8 flex flex-col items-cemter gap-2">
        <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
          Event Planning Blog
        </div>
        <div>
          Insights, tips, and inspiration from our event planning experts
        </div>
      </div>

      <div className="w-full px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {dataList.map((item) => (
            <div className="rounded-2xl border-1 border-gray-200" key={item._id}>
              <div
                key={item._id}
                className="group relative h-[280px] sm:h-[350px] w-full rounded-t-2xl overflow-hidden cursor-pointer shadow-lg transition-transform duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="py-4">
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>
                  Full-service corporate event management including conferences,
                  seminars, and company celebrations.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

