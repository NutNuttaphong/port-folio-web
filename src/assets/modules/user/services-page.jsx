import slideImage1 from "../../images/ahmetyuksek-autumn-bend-10069119_1920.jpg";

import servService from "../../services/serv.service";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getImageUrl } from "../../../utils/imageUrl";

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
    async function fetchServices() {
      try {
        const response = await servService.getServ();
        if (response.length > 0) {
          setDataList(response);
        } else {
          setDataList(baseSlides);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setDataList(baseSlides);
      } finally {
        setIsLoading(false);
      }
    }

    fetchServices();
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

      <div className="px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {dataList.map((item) => (
            <div
              className="flex flex-col gap-6 rounded-2xl border-1 border-gray-200"
              key={item._id}
            >
              <div
                key={item._id}
                className="group relative bg-white h-[250px] sm:h-[280px] w-full rounded-t-2xl overflow-hidden cursor-pointer shadow-lg transition-transform duration-300"
              >
                <img
                  src={getImageUrl(item.imageUrl)}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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

