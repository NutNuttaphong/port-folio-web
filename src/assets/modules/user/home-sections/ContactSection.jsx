import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import githubIcon from "../../../images/icon/github.svg";

export default function ContactSection() {
  const handleOpenChat = () => {
    window.dispatchEvent(
      new CustomEvent("open-chat-widget", { detail: { viewMode: "form" } }),
    );
  };

  const contactChannels = [
    {
      title: "Email",
      value: "nuttphong.sp@gmail.com",
      link: "mailto:nuttphong.sp@gmail.com",
      icon: Mail,
      accent: "text-sky-400",
      border: "border-sky-500/20",
      action: "Send Email ↗",
    },
    {
      title: "Phone & Mobile",
      value: "+66 (0) 61 267 9518",
      link: "tel:+66612679518",
      icon: Phone,
      accent: "text-emerald-400",
      border: "border-emerald-500/20",
      action: "Call Directly ↗",
    },
    {
      title: "GitHub Profile",
      value: "github.com/NutNuttaphong",
      link: "https://github.com/NutNuttaphong",
      imgIcon: githubIcon,
      accent: "text-teal-400",
      border: "border-teal-500/20",
      action: "View Repositories ↗",
    },
    {
      title: "Location",
      value: "Bangkok, Thailand 🇹🇭",
      link: null,
      icon: MapPin,
      accent: "text-indigo-400",
      border: "border-indigo-500/20",
      action: "Available for Remote / Hybrid",
    },
  ];

  return (
    <section
      id="contact"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20"
    >
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-teal-50 dark:bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-500/20 font-semibold mb-3">
          <span>📬</span> LET'S CONNECT
        </div>
        <div className="grid justify-center ">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Get in Touch
          </h2>
          <p className="mt-3 text-start text-sm sm:text-base text-slate-700 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Interested in discussing software architecture, exploring project
            collaborations, or discussing engineering opportunities? Reach out
            directly anytime.
          </p>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {contactChannels.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className={`rounded-3xl border ${c.border} bg-white dark:bg-slate-900/80 shadow-md shadow-slate-200/60 dark:shadow-none p-6 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-500/5 text-left`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 ${c.accent}`}
                  >
                    {c.imgIcon ? (
                      <img src={c.imgIcon} alt="" className="w-5 h-5 dark:invert" />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400 tracking-wider">
                      {c.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-900 dark:text-white break-words mb-4">
                  {c.value}
                </p>
              </div>

              {c.link ? (
                <a
                  href={c.link}
                  target={c.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 transition flex items-center gap-1 pt-2 border-t border-slate-200 dark:border-white/5"
                >
                  <span>{c.action}</span>
                </a>
              ) : (
                <span className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-white/5 font-mono">
                  {c.action}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Interactive Callout Banner (Connects to real-time ChatWidget) */}
      <div className="rounded-3xl border border-teal-200 dark:border-teal-500/30 bg-gradient-to-r from-teal-50/90 via-white to-sky-50/90 dark:from-teal-950/60 dark:via-slate-900/80 dark:to-blue-950/60 p-8 sm:p-10 backdrop-blur-2xl text-center flex flex-col items-center justify-between shadow-2xl shadow-teal-500/10">
        <div className="max-w-2xl mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-800 dark:text-teal-300 font-bold mb-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>REAL-TIME LINE NOTIFICATION PIPELINE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Leave Contact Details (Dispatched Directly to LINE)
          </h3>
          <p className="text-start text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Fill in your preferred contact method and message. It will be
            dispatched directly to Nuttaphong's mobile via automated LINE
            Messaging API.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenChat}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 shadow-xl shadow-teal-500/25 transition-all hover:scale-105 hover:shadow-teal-400/40 active:scale-95 cursor-pointer"
        >
          <MessageSquare size={16} />
          <span>Open Contact Request Form (Direct to LINE)</span>
        </button>
      </div>
    </section>
  );
}
