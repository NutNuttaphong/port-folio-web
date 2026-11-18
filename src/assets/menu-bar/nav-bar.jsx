import { NavLink, useNavigate } from 'react-router-dom';
import { Lock, FileText } from 'lucide-react';
import DayNightToggle from './day-night-toggle';

function NavBar({ isDark, setIsDark }) {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className={`sticky top-0 z-50 flex items-center justify-between border-b px-6 py-4 backdrop-blur-md transition-colors duration-500 ${
      isDark
        ? "border-white/10 bg-[#080d1a]/85 text-white"
        : "border-slate-200/80 bg-white/85 text-slate-900 shadow-sm"
    }`}>
      {/* โลโก้ Nuttaphong Samiphak */}
      <div 
        onClick={() => scrollToSection('overview')} 
        className={`cursor-pointer text-lg sm:text-xl font-bold tracking-tight transition select-none ${
          isDark ? "text-white hover:text-teal-400" : "text-slate-900 hover:text-teal-600"
        }`}
      >
        Nuttaphong Samiphak
      </div>

      {/* เมนูนำทาง: overview, projects, contact */}
      <div className="hidden items-center gap-7 text-xs sm:text-sm font-medium tracking-wide md:flex">
        <button
          type="button"
          onClick={() => scrollToSection('overview')}
          className={`transition cursor-pointer ${
            isDark ? "text-slate-300 hover:text-teal-400" : "text-slate-600 hover:text-teal-600"
          }`}
        >
          overview
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('projects')}
          className={`transition cursor-pointer ${
            isDark ? "text-slate-300 hover:text-teal-400" : "text-slate-600 hover:text-teal-600"
          }`}
        >
          projects
        </button>
        <button
          type="button"
          onClick={() => scrollToSection('contact')}
          className={`transition cursor-pointer ${
            isDark ? "text-slate-300 hover:text-teal-400" : "text-slate-600 hover:text-teal-600"
          }`}
        >
          contact
        </button>
      </div>

      {/* Action Buttons: Download CV, Login, DayNightToggle */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <NavLink
          to="/cv-preview"
          className="inline-flex items-center gap-1.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold px-3 sm:px-4 py-2 text-xs sm:text-sm transition shadow-sm shadow-teal-500/20 active:scale-95 cursor-pointer"
        >
          <FileText size={14} />
          <span>Download CV (PDF)</span>
        </NavLink>

        <button
          onClick={() => navigate('/login')}
          title="Admin Login"
          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs font-semibold backdrop-blur-md transition active:scale-95 cursor-pointer ${
            isDark
              ? "border-white/15 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-teal-400/50"
              : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          <Lock size={14} className="text-teal-500" />
          <span className="hidden sm:inline">Login</span>
        </button>

        {/* ปุ่มสลับโหมด Dark / Light ยังอยู่ครบถ้วน */}
        <DayNightToggle isDark={isDark} setIsDark={setIsDark} />
      </div>
    </nav>
  );
}

export default NavBar;
