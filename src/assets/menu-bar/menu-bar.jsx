import { NavLink, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import DayNightToggle from "./day-night-toggle";

function MenuBar({ isDark, setIsDark }) {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white/10 px-6 py-4 text-gray backdrop-blur-md">
      <div className="root-bar flex items-center justify-between">
        {/* โลโก้ EventCo (กดกลับหน้าแรก) */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-bold tracking-wider transition hover:text-emerald-400 select-none"
        >
          PortDev
        </div>

        {/* เมนูนำทาง พร้อมระบบ Active Link */}
        <div className="hidden items-center gap-8 text-sm font-medium tracking-wider md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-gray/80"}`
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-gray/80"}`
            }
          >
            PORTFOLIO
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-gray/80"}`
            }
          >
            ABOUT US
          </NavLink>
          <NavLink
            to="/event/contacts"
            className={({ isActive }) =>
              `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-gray/80"}`
            }
          >
            CONTACTS
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            title="Admin Login"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-white/15 bg-gray-100 dark:bg-slate-800/80 px-2.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 transition hover:bg-teal-500 hover:text-white cursor-pointer"
          >
            <Lock size={14} className="text-teal-500" />
            <span className="hidden sm:inline">Login</span>
          </button>
          <DayNightToggle isDark={isDark} setIsDark={setIsDark} />
        </div>
      </div>
    </nav>
  );
}

export default MenuBar;
