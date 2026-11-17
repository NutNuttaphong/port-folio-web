import { Mail, Phone, MessageSquare } from "lucide-react";
import githubIcon from "../../../images/icon/github.svg";

export default function ContactSection() {
  const handleOpenChat = () => {
    window.dispatchEvent(
      new CustomEvent("open-chat-widget", { detail: { viewMode: "form" } }),
    );
  };

  return (
    <section id="contact" className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12">
      {/* Container Box */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c1326]/90 p-8 sm:p-10 backdrop-blur-md shadow-sm text-left">
        {/* Title & Subtitle */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Get in touch
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          Available for remote / hybrid roles. Email is the fastest way to reach me.
        </p>

        {/* 3 Contact Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 pt-2">
          {/* Email */}
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1.5 font-medium">
              Email
            </span>
            <a
              href="mailto:nuttphong.sp@gmail.com"
              className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline transition"
            >
              nuttphong.sp@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1.5 font-medium">
              Phone
            </span>
            <a
              href="tel:+66612679518"
              className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline transition"
            >
              +66 61-267-9518
            </a>
          </div>

          {/* Github */}
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1.5 font-medium">
              Github
            </span>
            <a
              href="https://github.com/NutNuttaphong"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline transition"
            >
              github.com/NutNuttaphong
            </a>
          </div>
        </div>

        {/* Dual Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <a
            href="/Nuttaphong-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-400 hover:bg-teal-300 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 transition shadow-sm shadow-teal-500/20 active:scale-95 cursor-pointer"
          >
            <span>Download CV (PDF)</span>
          </a>

          <button
            type="button"
            onClick={handleOpenChat}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/20 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-850 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-white transition active:scale-95 cursor-pointer"
          >
            <MessageSquare size={15} className="text-teal-400" />
            <span>LEAVE A MESSAGE (WITH LINE)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
