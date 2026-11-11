import { useState, useEffect, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Search,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
  FolderGit2,
  X,
  Loader2,
  Calendar,
} from "lucide-react";

import StarField from "./start-field";
import PortService from "../../services/port.service";
import { getImageUrl } from "../../../utils/imageUrl";

// Fallback high quality project assets
import thumb1 from "../../images/image/ai1.png";
import thumb2 from "../../images/image/ai2.png";
import thumb3 from "../../images/image/ai3.png";
import thumb4 from "../../images/image/ai4.png";
import thumb5 from "../../images/image/ai5.png";
import thumb6 from "../../images/image/ai6.png";

const baseProjects = [
  {
    id: "p1",
    title: "Portfolio & Headless CMS",
    tag: "full-stack",
    badge: "PRODUCTION LIVE 🚀",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    description:
      "Enterprise personal portfolio with integrated Headless CMS admin panel, hardened NestJS RESTful APIs, JWT role guards, and automated LINE notify alerts.",
    techStack: ["React 18", "NestJS", "MongoDB", "Tailwind CSS", "JWT Auth"],
    image: thumb1,
    year: "2025",
    url: "https://port-folio-web-phi.vercel.app",
    githubUrl: "https://github.com/NutNuttaphong/port-folio-web",
  },
  {
    id: "p2",
    title: "First Shop Online",
    tag: "full-stack",
    badge: "E-COMMERCE",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    description:
      "Modern e-commerce platform featuring interactive product catalog, live administrative chat communication, cart state management, and real-time order tracking.",
    techStack: ["React", "Node.js", "Socket.IO", "Tailwind CSS", "Express"],
    image: thumb2,
    year: "2024",
    url: "https://shop-ft.vercel.app/login",
    githubUrl: "https://github.com/NutNuttaphong",
  },
  {
    id: "p3",
    title: "AutoTransSub (AI Video Subtitle)",
    tag: "ai",
    badge: "LOCAL AI TOOL",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    description:
      "Automated multilingual subtitle generation pipeline utilizing Whisper AI models running locally with FastAPI microservice backplane.",
    techStack: ["Python", "Whisper AI", "FastAPI", "Local LLM", "FFmpeg"],
    image: thumb3,
    year: "2024",
    url: "https://github.com/NutNuttaphong",
    githubUrl: "https://github.com/NutNuttaphong",
  },
  {
    id: "p4",
    title: "FMS Enterprise Warehouse",
    tag: "enterprise",
    badge: "ERP SYSTEM",
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    description:
      "Industrial factory inventory management system handling multi-warehouse stock replenishment, purchase order approval workflows, and audit logging.",
    techStack: ["Angular", "TypeScript", "REST API", "SQL", "Tailwind"],
    image: thumb4,
    year: "2023",
    url: "https://github.com/NutNuttaphong",
    githubUrl: "https://github.com/NutNuttaphong",
  },
  {
    id: "p5",
    title: "FinTech Trade & Portfolio Analytics",
    tag: "fintech",
    badge: "ANALYTICS",
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    description:
      "Financial securities dashboard with real-time portfolio valuation, candlestick chart visualizations, risk exposure analysis, and asset tracking.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Chart.js",
      "Tailwind CSS",
      "REST API",
    ],
    image: thumb5,
    year: "2024",
    url: "https://github.com/NutNuttaphong",
    githubUrl: "https://github.com/NutNuttaphong",
  },
  {
    id: "p6",
    title: "Smart Clinic Booking Platform",
    tag: "frontend",
    badge: "HEALTHCARE",
    badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/30",
    description:
      "Doctor appointment scheduling portal with interactive calendar slots, queue notifications, medical specialty filtering, and customer support integration.",
    techStack: ["React", "Vite", "Tailwind CSS", "REST API", "Formik"],
    image: thumb6,
    year: "2024",
    url: "https://github.com/NutNuttaphong",
    githubUrl: "https://github.com/NutNuttaphong",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "full-stack", label: "Full-Stack & Web" },
  { id: "ai", label: "AI & Automation" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "enterprise", label: "Enterprise & ERP" },
  { id: "fintech", label: "FinTech & Analytics" },
];

export default function PortfolioPage() {
  const outletCtx = useOutletContext();
  const isDark = outletCtx?.isDark ?? true;
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPorts() {
      try {
        const response = await PortService.getPorts();

        if (Array.isArray(response) && response.length > 0) {
          const formattedData = response.map((item, index) => {
            const fallbackThumb = [
              thumb1,
              thumb2,
              thumb3,
              thumb4,
              thumb5,
              thumb6,
            ][index % 6];
            return {
              ...item,
              id: item._id || item.id || `api-${index}`,
              tag: item.tag ? item.tag.toLowerCase() : "full-stack",
              year: item.year || (item.date ? item.date.slice(0, 4) : "2025"),
              image: getImageUrl(item.imageUrl) || item.image || fallbackThumb,
              badge: item.badge || "FEATURED",
              badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/30",
              techStack: item.techStack || ["React", "Node.js", "Tailwind CSS"],
              url: item.url || "https://github.com/NutNuttaphong",
              githubUrl: item.githubUrl || "https://github.com/NutNuttaphong",
              uniqueKey: item._id
                ? `${item._id}-${index}`
                : `fallback-${index}`,
            };
          });
          setDataList(formattedData);
        } else {
          setDataList(baseProjects);
        }
      } catch (error) {
        console.error("Error fetching ports:", error);
        setDataList(baseProjects);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPorts();
  }, []);

  const filteredProjects = useMemo(() => {
    return dataList.filter((item) => {
      const itemTag = (item.tag || "").toLowerCase();
      const matchCategory =
        activeTab === "all" ||
        itemTag === activeTab.toLowerCase() ||
        itemTag.includes(activeTab.toLowerCase()) ||
        (activeTab === "full-stack" &&
          (itemTag.includes("web") ||
            itemTag.includes("cms") ||
            itemTag.includes("full")));

      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.tag && item.tag.toLowerCase().includes(q)) ||
        (Array.isArray(item.techStack) &&
          item.techStack.some((t) => t.toLowerCase().includes(q)));

      return matchCategory && matchSearch;
    });
  }, [dataList, activeTab, searchQuery]);

  const handleCardClick = (item) => {
    const targetUrl =
      item.url || item.githubUrl || "https://github.com/NutNuttaphong";
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  if (isLoading) {
    return (
      <div className="relative flex min-h-[calc(100vh-73px)] w-full items-center justify-center bg-gradient-to-b from-[#0e1a42] via-[#09112d] to-[#040714] text-white">
        <Loader2 className="animate-spin text-teal-400" size={48} />
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-[calc(100vh-73px)] w-full flex flex-col items-center overflow-x-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-b from-[#0e1a42] via-[#09112d] to-[#040714] text-white"
          : "bg-gradient-to-b from-[#f8fafc] via-[#eef4ff] to-[#f1f5f9] text-slate-900"
      }`}
    >
      {/* Background StarField & Ambient Glows */}
      {isDark ? (
        <>
          <StarField count={220} />
          <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[140px]" />
          <div className="pointer-events-none fixed top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[150px]" />
          <div className="pointer-events-none fixed bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
        </>
      ) : (
        <>
          <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal-300/20 blur-[140px]" />
          <div className="pointer-events-none fixed top-1/3 left-1/4 h-[450px] w-[450px] rounded-full bg-sky-300/25 blur-[150px]" />
          <div className="pointer-events-none fixed bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-300/20 blur-[160px]" />
        </>
      )}

      <main className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300 dark:border-teal-500/30 bg-teal-50 dark:bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-800 dark:text-teal-300 backdrop-blur-md mb-4 shadow-sm">
            <Sparkles size={14} className="text-teal-400" />
            <span>PORTFOLIO &amp; PRODUCTION ARCHIVE</span>
          </div>

          <h1 className="text-3xl max-w-7xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Crafted with Precision,Built for Scale
          </h1>

          <p className="text-slate-600 text-start dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Explore curated web applications, headless CMS platforms, AI-powered
            utilities, and scalable enterprise architectures engineered with
            modern tech stacks.
          </p>

          {/* Quick Metrics */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-slate-900/60 p-3.5 backdrop-blur-md shadow-sm dark:shadow-none">
              <div className="text-2xl font-black text-teal-400">
                {dataList.length}+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Projects Built
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-slate-900/60 p-3.5 backdrop-blur-md shadow-sm dark:shadow-none">
              <div className="text-2xl font-black text-sky-400">100%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Quality Verified
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-slate-900/60 p-3.5 backdrop-blur-md shadow-sm dark:shadow-none">
              <div className="text-2xl font-black text-emerald-400">
                REST &amp; AI
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Full-Stack Core
              </div>
            </div>
          </div>
        </div>

        {/* Controls: Search & Category Filter */}
        <div className="w-full max-w-5xl mb-10 flex flex-col gap-6 items-center">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, tech (React, NestJS, AI)..."
              className="w-full rounded-full border border-slate-200 dark:border-white/15 bg-white/90 dark:bg-slate-900/80 pl-11 pr-10 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none backdrop-blur-md shadow-sm transition-all focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/25 scale-105"
                      : "border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-teal-400/50 hover:text-teal-700 dark:hover:text-white backdrop-blur-md shadow-sm"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-12 text-center backdrop-blur-md shadow-sm dark:shadow-none">
            <Layers
              className="mx-auto mb-3 text-slate-400 dark:text-slate-500"
              size={40}
            />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No projects found
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Try adjusting your search query or switching to another category.
            </p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="mt-4 rounded-xl bg-teal-400 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-teal-300 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            {filteredProjects.map((item) => (
              <div
                key={item.uniqueKey || item.id}
                className="group relative flex flex-col rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 shadow-md shadow-slate-200/60 dark:shadow-none overflow-hidden backdrop-blur-xl shadow-xl dark:shadow-2xl transition-all duration-300 hover:border-teal-400/50 hover:-translate-y-1.5"
              >
                {/* Thumbnail Image */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider backdrop-blur-md ${
                        item.badgeColor ||
                        "bg-teal-500/10 text-teal-300 border-teal-500/30"
                      }`}
                    >
                      {item.badge || item.tag}
                    </span>

                    {item.year && (
                      <span className="flex items-center gap-1 rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-1 text-[11px] font-mono text-slate-300 backdrop-blur-md">
                        <Calendar size={12} className="text-teal-400" />
                        {item.year}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors line-clamp-1 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300/90 leading-relaxed line-clamp-3 mb-5 flex-1">
                    {item.description}
                  </p>

                  {/* Tech Stack Pills */}
                  {Array.isArray(item.techStack) &&
                    item.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-800 dark:text-teal-300/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-white/10">
                    <button
                      onClick={() => handleCardClick(item)}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-50 dark:bg-teal-400/10 border border-teal-300 dark:border-teal-400/30 py-2.5 text-xs font-bold text-teal-800 dark:text-teal-300 transition hover:bg-teal-500 hover:text-white dark:hover:bg-teal-400 dark:hover:text-slate-950 shadow-sm active:scale-95 cursor-pointer"
                    >
                      <span>Explore Project</span>
                      <ExternalLink size={13} />
                    </button>

                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View Source on GitHub"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-slate-800/80 p-2.5 text-slate-700 dark:text-slate-300 transition hover:border-teal-400/50 hover:text-slate-950 dark:hover:text-white active:scale-95 cursor-pointer"
                      >
                        <FolderGit2 size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA / Collaboration Banner */}
        <section className="mt-20 w-full max-w-5xl rounded-3xl border border-teal-200 dark:border-teal-500/20 bg-gradient-to-r from-teal-50/90 via-white to-sky-50/90 dark:from-teal-950/40 dark:via-slate-900/60 dark:to-blue-950/40 shadow-lg dark:shadow-none p-8 sm:p-12 text-center backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-300 dark:border-teal-500/30 bg-teal-100/80 dark:bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-900 dark:text-teal-300 mb-4">
            <Sparkles size={14} /> Ready for Collaboration
          </div>
          <div className="grid justify-center">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              Have a Project in Mind or Need Full-Stack Engineering?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-start mx-auto text-xs sm:text-sm sm:leading-relaxed mb-6">
              Whether you need an AI-driven web application, an enterprise CMS,
              or a modern high-performance frontend, I am ready to help turn
              your ideas into production software.
            </p>
          </div>
          <div className="flex flex-wrap mt-4 items-center justify-center gap-4">
            <button
              onClick={() => navigate("/event/contacts")}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:bg-teal-300 active:scale-95 cursor-pointer"
            >
              Send a Message <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/booking")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-white backdrop-blur-md transition hover:bg-slate-50 dark:hover:bg-white/10 hover:border-teal-400/40 active:scale-95 cursor-pointer shadow-sm"
            >
              Schedule a Call
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
