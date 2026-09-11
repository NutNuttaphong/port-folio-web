import { NavLink, useNavigate } from "react-router-dom";
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
            to="/inspiration"
            className={({ isActive }) =>
              `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-gray/80"}`
            }
          >
            INSPIRATION
          </NavLink>
          <NavLink
            to="/event/services"
            className={({ isActive }) =>
              `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-gray/80"}`
            }
          >
            SERVICES
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
          <DayNightToggle isDark={isDark} setIsDark={setIsDark} />
      </div>
    </nav>
  );
}

export default MenuBar;
