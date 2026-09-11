import { NavLink, useNavigate } from 'react-router-dom';

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
        <NavLink
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
        </NavLink>
        <NavLink
          to="/event/contacts"
          className={({ isActive }) =>
            `transition hover:text-emerald-400 ${isActive ? "text-emerald-400 font-bold" : "text-white/80"}`
          }
        >
          CONTACTS
        </NavLink>
      </div>

      {/* ปุ่มกด Action */}
      <button 
        onClick={() => navigate('/booking')} 
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-500 active:scale-95"
      >
        BOOK NOW
      </button>
    </nav>
  );
}

export default NavBar;