import { NavLink, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import DayNightToggle from './day-night-toggle';

function NavBar({ isDark, setIsDark }) {
  const navigate = useNavigate();

  return (
    <nav className={`sticky top-0 z-50 flex items-center justify-between border-b px-6 py-4 backdrop-blur-md transition-colors duration-500 ${
      isDark
        ? "border-white/10 bg-gray-900/80 text-white"
        : "border-slate-200/80 bg-white/80 text-slate-900 shadow-sm"
    }`}>
      {/* โลโก้ PortDev */}
      <div 
        onClick={() => navigate('/')} 
        className={`cursor-pointer text-2xl font-bold tracking-wider transition select-none ${
          isDark ? "text-white hover:text-emerald-400" : "text-slate-900 hover:text-teal-600"
        }`}
      >
        PortDev
      </div>

      {/* เมนูนำทาง พร้อมระบบ Active Link */}
      <div className="hidden items-center gap-8 text-sm font-medium tracking-wider md:flex">
        <NavLink
          to="/portfolio"
          className={({ isActive }) =>
            `transition ${
              isActive
                ? (isDark ? "text-emerald-400 font-bold" : "text-teal-600 font-bold")
                : (isDark ? "text-white/80 hover:text-emerald-400" : "text-slate-600 hover:text-teal-600")
            }`
          }
        >
          PORTFOLIO
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `transition ${
              isActive
                ? (isDark ? "text-emerald-400 font-bold" : "text-teal-600 font-bold")
                : (isDark ? "text-white/80 hover:text-emerald-400" : "text-slate-600 hover:text-teal-600")
            }`
          }
        >ABOUT ME</NavLink>
        <NavLink
          to="/event/contacts"
          className={({ isActive }) =>
            `transition ${
              isActive
                ? (isDark ? "text-emerald-400 font-bold" : "text-teal-600 font-bold")
                : (isDark ? "text-white/80 hover:text-emerald-400" : "text-slate-600 hover:text-teal-600")
            }`
          }
        >
          CONTACTS
        </NavLink>
      </div>

      {/* สถานะพร้อมรับงาน & ปุ่มกด Action & ปุ่ม Login & DayNightToggle */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* <button 
          onClick={() => navigate('/event/contacts')} 
          className="rounded-lg bg-teal-400 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-teal-300 active:scale-95 cursor-pointer shadow-teal-500/20"
        >
          LET'S TALK ↗
        </button> */}
        <button
          onClick={() => navigate('/login')}
          title="Admin Login"
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold backdrop-blur-md transition active:scale-95 cursor-pointer ${
            isDark
              ? "border-white/15 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-teal-400/50"
              : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          <Lock size={14} className="text-teal-500" />
          <span className="hidden sm:inline">Login</span>
        </button>
        <DayNightToggle isDark={isDark} setIsDark={setIsDark} />
      </div>
    </nav>
  );
}

export default NavBar;
