import slideImage1 from "../../images/ahmetyuksek-autumn-bend-10069119_1920.jpg";

const timelineData = [
  {
    year: "2018",
    title: "Company Founded",
    description:
      "EventCo was established with a vision to create extraordinary experiences.",
  },
  {
    year: "2019",
    title: "First Major Contract",
    description:
      "Secured our first corporate client and organized a 500-person conference.",
  },
  {
    year: "2020",
    title: "Digital Innovation",
    description:
      "Adapted to virtual events during the pandemic, pioneering hybrid event solutions.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description:
      "Expanded our operations internationally, delivering flagship hybrid experiences worldwide.",
  },
];

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
];

function AboutPage() {
  return (
    <div className="root">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-3xl sm:text-4xl font-serif font-bold  tracking-tight">
          About EventCo
        </div>
        <p>
          We are passionate event creators dedicated to transforming your vision
          into unforgettable experiences. With years of expertise and a
          commitment to excellence, we make every moment extraordinary.
        </p>
      </div>

      <div className="w-full my-5">
        <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              Our Journey
            </div>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Center Vertical Line (จอมือถืออยู่ซ้าย จอใหญ่ตรงกลาง) */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 -translate-x-1/2 bg-teal-200" />

            <div className="flex flex-col gap-12 md:gap-16">
              {timelineData.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={item.year}
                    className="relative flex items-center md:justify-between"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                      <div className="h-3.5 w-3.5 rounded-full bg-teal-500 ring-4 ring-white" />
                    </div>

                    {/* Content Box */}
                    <div
                      className={`ml-10 md:ml-0 md:w-[45%] ${
                        isLeft
                          ? "md:mr-auto text-left md:text-right"
                          : "md:ml-auto text-left"
                      }`}
                    >
                      <div className="group relative rounded-2xl border border-teal-100 bg-white/90 p-6 sm:p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-teal-300">
                        {/* Year */}
                        <span className="text-2xl font-bold tracking-wide text-teal-600 block mb-1">
                          {item.year}
                        </span>

                        {/* Title */}
                        <h3 className="text-lg font-serif font-bold text-slate-800 mb-3">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <div className="w-full my-16">
        <div className="flex gap-2 justify-center mb-6 w-full">
          <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Meet Our Teamas
          </div>
        </div>

        <div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 justify-items-center">
            {baseSlides.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-4">
                <div
                  key={item.id}
                  className="group relative h-[240px] w-[240px] rounded-full overflow-hidden cursor-pointer shadow-lg transition-transform duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-full"
                  />
                </div>
                <div className="text-center">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full my-5">
        <div className="flex gap-2 justify-center mb-6 w-full">
          <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Our Partners
          </div>
        </div>

        <div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-10 justify-items-center gap-4">
            {baseSlides.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-4">
                <div
                  key={item.id}
                  className="group relative h-[240px] w-[240px] rounded-full overflow-hidden cursor-pointer shadow-lg transition-transform duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-full"
                  />
                </div>
                <div className="text-center">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
