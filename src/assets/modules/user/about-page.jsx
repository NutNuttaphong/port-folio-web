import slideImage1 from "../../images/image/ai1.png";
import slideImage2 from "../../images/image/ai2.png";
import slideImage3 from "../../images/image/ai3.png";
import slideImage4 from "../../images/image/ai4.png";
import slideImage5 from "../../images/image/ai5.png";
import slideImage6 from "../../images/image/ai6.png";
import slideImage7 from "../../images/image/react.png";

import angIcon from "../../images/icon/angular.svg";
import vueIcon from "../../images/icon/vue.svg";
import reactIcon from "../../images/icon/react.svg";
import nuxtIcon from "../../images/icon/nuxt.svg";
import tsIcon from "../../images/icon/ts.svg";
import javascriptIcon from "../../images/icon/javascript.svg";
import cssIcon from "../../images/icon/css.svg";
import tailwindIcon from "../../images/icon/tailwind.svg";

import githubIcon from "../../images/icon/github.svg";
import bitbucketIcon from "../../images/icon/bitbucket.svg";
import postmanIcon from "../../images/icon/postman.svg";
import sourcetreetIcon from "../../images/icon/sourcetree.svg";
import vscodeIcon from "../../images/icon/vscode.svg";
import AntigravityIcon from "../../images/icon/Antigravity.svg";
import GeminiIcon from "../../images/icon/Gemini.svg";
import gitlabIcon from "../../images/icon/gitlab.svg";

const timelineData = [
  {
    year: "2018 - 2023",
    title: "Mea FahLaung Univercity",
    description:
      "University education level Educatation Bachelor of Engineering Major in Computer Engineering Mea Fah Laung Univercity",
  },
  {
    year: "2023 - 2026",
    title: "Be1 Digital Company Limited.",
    description: "Position: Developer/Front End Developer",
  },
];

const baseSlides = [
  {
    _id: 1,
    tag: "LAUNCH",
    title:
      "BASIC TO INTERMEDIATE AI: PRACTICAL AI SKILLS FOR LEARNING, WORKING, AND EARNING",
    image: slideImage1, // 2. นำตัวแปรมาใส่ที่นี่
  },
  {
    _id: 2,
    tag: "LAUNCH",
    title: "ReactJS for Beginners",
    image: slideImage7, // 2. นำตัวแปรมาใส่ที่นี่
  },
  {
    _id: 3,
    tag: "LAUNCH",
    title: "Fundamental Principles of Artificial Intelligence",
    image: slideImage3, // 2. นำตัวแปรมาใส่ที่นี่
  },
  {
    _id: 4,
    tag: "LAUNCH",
    title: " Al for Lifelong Learning and Self-Development",
    image: slideImage4, // 2. นำตัวแปรมาใส่ที่นี่
  },
  {
    _id: 5,
    tag: "LAUNCH",
    title: "Data and Database Fundamentals for AlSystems",
    image: slideImage5, // 2. นำตัวแปรมาใส่ที่นี่
  },
  {
    _id: 6,
    tag: "LAUNCH",
    title: "Al-Driven Workflow and Process Optimization",
    image: slideImage6, // 2. นำตัวแปรมาใส่ที่นี่
  },
  {
    _id: 7,
    tag: "LAUNCH",
    title: "Ethics, Security, and the Future of Al",
    image: slideImage2, // 2. นำตัวแปรมาใส่ที่นี่
  },
];

function AboutPage() {
  return (
    <div className="root px-5">
      <div className="flex flex-col items-center gap-4 text-start">
        <div className="text-3xl sm:text-4xl font-serif font-bold  tracking-tight">
          About EventCo
        </div>
        <p className="pb-5">
          Frontend Developer with 3+ years of experience building and
          maintaining Web Applications using Angular, TypeScript, and
          JavaScript. Experienced in developing data-driven systems, reusable
          components, REST API integration, responsive interfaces, and
          performance optimization. Comfortable collaborating with UX/UI,
          Backend, QA, and Business teams throughout the development lifecycle.
          Strong focus on clean, maintainable, and scalable code, while
          continuously expanding expertise in React.js and modern frontend
          development.
        </p>
        <div className="grid grid-cols-2 gap-10 border p-4 rounded-2xl">
          <div>
            <p className="font-medium text-lg pb-4">Personalskills</p>
            <div className="grid grid-cols-2 gap-5">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={angIcon} alt="" />
                  <span>Angular</span>
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={vueIcon} alt="" />
                  <span>Vue.js</span>
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={reactIcon} alt="" />
                  <span>React / Vite</span>
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={nuxtIcon} alt="" />
                  <span>Nuxt</span>
                </li>
              </ul>

              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={tsIcon} alt="" />
                  <span>TypeScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={javascriptIcon} alt="" />
                  <span>JavaScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={cssIcon} alt="" />
                  <span>CSS</span>
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={tailwindIcon} alt="" />
                  <span>Tailwind</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p className="font-medium text-lg pb-4">Tools</p>
            <div className="grid grid-cols-2 gap-5">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={githubIcon} alt="" />
                  <span></span>
                  Github
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={gitlabIcon} alt="" />
                  <span>Gitlab</span>
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={postmanIcon} alt="" />
                  <span>PostMan</span>
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={sourcetreetIcon} alt="" />
                  <span>Sourcetree</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={bitbucketIcon} alt="" />
                  <span>Bitbucket</span>
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={vscodeIcon} alt="" />
                  <span>VSCode</span>
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={AntigravityIcon} alt="" />
                  <span>Antigravity</span>
                </li>
                <li className="flex items-center gap-2">
                  <img className="w-6 h-6" src={GeminiIcon} alt="" />
                  <span>Gemini</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full my-5">
        <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              Time line
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
            Certifigcate
          </div>
        </div>

        <div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 justify-items-center">
            {baseSlides.map((item) => (
              <div key={item._id} className="flex flex-col items-center gap-4">
                <div
                  key={item._id}
                  className="group relative h-[240px] w-[auto] overflow-hidden cursor-pointer shadow-lg transition-transform duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className=" w-full h-full"
                  />
                </div>
                <div className="text-center font-semibold">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
