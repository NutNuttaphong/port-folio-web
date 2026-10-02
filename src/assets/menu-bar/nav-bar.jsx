import { NavLink, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-gray-900/80 px-6 py-4 text-white backdrop-blur-md">
      {/* โลโก้ EventCo (กดกลับหน้าแรก) */}
      <div 
        onClick={() => navigate('/')} 
        className="cursor-pointer text-2xl font-bold tracking-wider transition hover:text-emerald-400 select-none"
      >
        PortDev
      </div>

      {/* เมนูนำทาง พร้อมระบบ Active Link */}
      <div className="hidden items-center gap-8 text-sm font-medium tracking-wider md:flex">
        <NavLink
          to="/portfolio"
          className={({ isActive }) =>
            `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-white/80"}`
          }
        >
          PORTFOLIO
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-white/80"}`
          }
        >
          ABOUT US
        </NavLink>
        {/* <NavLink
          to="/inspiration"
          className={({ isActive }) =>
            `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-white/80"}`
          }
        >
          INSPIRATION
        </NavLink>
        <NavLink
          to="/event/services"
          className={({ isActive }) =>
            `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-white/80"}`
          }
        >
          SERVICES
        </NavLink> */}
        <NavLink
          to="/event/contacts"
          className={({ isActive }) =>
            `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-white/80"}`
          }
        >
          CONTACTS
        </NavLink>
      </div>

      {/* สถานะพร้อมรับงาน & ปุ่มกด Action & ปุ่ม Login */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-300 select-none">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Available for Hire
        </div> */}
        <button 
          onClick={() => navigate('/event/contacts')} 
          className="rounded-lg bg-teal-400 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-teal-300 active:scale-95 cursor-pointer shadow-teal-500/20"
        >
          LET'S TALK ↗
        </button>
        <button
          onClick={() => navigate('/login')}
          title="Admin Login"
          className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 backdrop-blur-md transition hover:bg-slate-700 hover:text-white hover:border-teal-400/50 active:scale-95 cursor-pointer"
        >
          <Lock size={14} className="text-teal-400" />
          <span className="hidden sm:inline">Login</span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;