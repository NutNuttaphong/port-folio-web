import { NavLink } from "react-router-dom";
import { Home, Briefcase, Info, Lightbulb, Wrench } from "lucide-react";
import { LogOut } from "lucide-react"; // ใ
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "HOME", path: "/table-home", icon: Home },
  { name: "PORTFOLIO", path: "/table-port", icon: Briefcase },
  { name: "ABOUT US", path: "/table-about", icon: Info },
  { name: "INSPIRATION", path: "/table-inspiration", icon: Lightbulb },
  { name: "User", path: "/table-User", icon: Wrench },
  { name: "SERVICES", path: "/table-service", icon: Wrench },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/booking");
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col shrink-0">
      {/* โลโก้แบรนด์ */}
      <div className="h-18 flex items-center px-8 border-b border-slate-100">
        <span className="text-2xl font-bold font-serif tracking-tight text-slate-800">
          PortDev
        </span>
      </div>

      {/* เมนูนำทางด้านซ้าย */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-[#00bda6] text-white shadow-sm shadow-teal-500/30"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div>
        <div
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-red-500 transition-colors duration-200 py-2 px-4 rounded-xl hover:bg-red-50 select-none"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">ออกจากระบบ</span>
        </div>
      </div>
    </aside>
  );
}
