import { NavLink, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import DayNightToggle from "./day-night-toggle";

function MenuBar({ isDark, setIsDark }) {
  const navigate = useNavigate();

  return (
    <nav className={`sticky top-0 z-50 flex items-center justify-between border-b px-6 py-4 backdrop-blur-md transition-colors duration-500 ${
      isDark
        ? "border-white/10 bg-gray-900/80 text-white"
        : "border-slate-200/80 bg-white/80 text-slate-900 shadow-sm"
    }`}>
      <div className="root-bar flex items-center justify-between">
        {/* โลโก้ PortDev */}
        <div
          onClick={() => navigate("/")}
          className={`cursor-pointer text-2xl font-bold tracking-wider transition select-none ${
            isDark ? "text-white hover:text-emerald-400" : "text-slate-900 hover:text-teal-600"
          }`}
        >
          PortDev
        </div>

        {/* เมนูนำทาง พร้อมระบบ Active Link */}
        <div className="hidden items-center gap-8 text-sm font-medium tracking-wider md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? (isDark ? "text-emerald-400 font-bold" : "text-teal-600 font-bold")
                  : (isDark ? "text-white/80 hover:text-emerald-400" : "text-slate-600 hover:text-teal-600")
              }`
            }
          >
            HOME
          </NavLink>
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

        <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            title="Admin Login"
            className={({ isActive }) =>
              `transition cursor-pointer ${
                isActive
                  ? (isDark ? "text-emerald-400 font-bold flex items-center gap-1.5 px-2.5 py-1.5 text-xs" : "text-teal-600 font-bold flex items-center gap-1.5 px-2.5 py-1.5 text-xs")
                  : (isDark ? "flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white" : "flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900")
              }`
            }
          >
            <span className="flex gap-1.5 items-center cursor-pointer">
              <Lock size={14} className="text-teal-500" />
              <span className="hidden sm:inline">Login</span>
            </span>
          </NavLink>
          <DayNightToggle isDark={isDark} setIsDark={setIsDark} />
        </div>
      </div>
    </nav>
  );
}

export default MenuBar;
